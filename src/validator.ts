/**
 * Skill validation functions following Anthropic Agent Skills spec
 */
import matter from 'gray-matter';
import {
  SkillFrontmatter,
  SkillValidationResult,
  ValidationIssue,
  ValidationSeverity,
} from './types';

// Validation patterns
const NAME_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const CONSECUTIVE_HYPHENS = /--/;

// Field constraints
const NAME_MIN_LENGTH = 1;
const NAME_MAX_LENGTH = 64;
const DESCRIPTION_MIN_LENGTH = 1;
const DESCRIPTION_MAX_LENGTH = 1024;
const COMPATIBILITY_MAX_LENGTH = 500;
const SKILL_MD_MAX_LINES = 500;

/**
 * Parse YAML frontmatter from SKILL.md content
 */
export function parseSkillFrontmatter(skillMd: string): {
  frontmatter?: SkillFrontmatter;
  body?: string;
  bodyLineCount?: number;
  issues: ValidationIssue[];
} {
  const issues: ValidationIssue[] = [];

  try {
    const { data, content: body } = matter(skillMd);

    if (!data || typeof data !== 'object' || Object.keys(data).length === 0) {
      issues.push({
        code: 'FRONTMATTER_EMPTY',
        message: 'Frontmatter block is empty or invalid',
        severity: 'error',
        field: 'frontmatter',
      });
      return { issues };
    }

    const bodyLineCount = body.split('\n').length;

    return {
      frontmatter: data as SkillFrontmatter,
      body,
      bodyLineCount,
      issues: [],
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Invalid YAML syntax';
    issues.push({
      code: 'FRONTMATTER_PARSE_ERROR',
      message: `Failed to parse frontmatter: ${message}`,
      severity: 'error',
      field: 'frontmatter',
    });
    return { issues };
  }
}

/**
 * Validate skill name
 */
function validateName(name: string | undefined, bundleName?: string): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  if (!name) {
    issues.push({
      code: 'NAME_REQUIRED',
      message: 'Frontmatter "name" field is required',
      severity: 'error',
      field: 'name',
    });
    return issues;
  }

  if (name.length < NAME_MIN_LENGTH) {
    issues.push({
      code: 'NAME_TOO_SHORT',
      message: `Skill name must be at least ${NAME_MIN_LENGTH} character`,
      severity: 'error',
      field: 'name',
      expected: `>= ${NAME_MIN_LENGTH} chars`,
      actual: `${name.length} chars`,
    });
  }

  if (name.length > NAME_MAX_LENGTH) {
    issues.push({
      code: 'NAME_TOO_LONG',
      message: `Skill name must be ${NAME_MAX_LENGTH} characters or fewer`,
      severity: 'error',
      field: 'name',
      expected: `<= ${NAME_MAX_LENGTH} chars`,
      actual: `${name.length} chars`,
    });
  }

  if (!NAME_PATTERN.test(name)) {
    issues.push({
      code: 'NAME_INVALID_FORMAT',
      message: 'Skill name must contain only lowercase letters, numbers, and single hyphens',
      severity: 'error',
      field: 'name',
      expected: 'lowercase letters, numbers, single hyphens',
      actual: name,
    });
  }

  if (CONSECUTIVE_HYPHENS.test(name)) {
    issues.push({
      code: 'NAME_CONSECUTIVE_HYPHENS',
      message: 'Skill name must not contain consecutive hyphens',
      severity: 'error',
      field: 'name',
      actual: name,
    });
  }

  if (name.startsWith('-') || name.endsWith('-')) {
    issues.push({
      code: 'NAME_HYPHEN_BOUNDARY',
      message: 'Skill name must not start or end with a hyphen',
      severity: 'error',
      field: 'name',
      actual: name,
    });
  }

  if (bundleName && name !== bundleName) {
    issues.push({
      code: 'NAME_MISMATCH',
      message: 'Frontmatter name must match the bundle/directory name',
      severity: 'error',
      field: 'name',
      expected: bundleName,
      actual: name,
    });
  }

  return issues;
}

/**
 * Validate skill description
 */
function validateDescription(description: string | undefined): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  if (!description) {
    issues.push({
      code: 'DESCRIPTION_REQUIRED',
      message: 'Frontmatter "description" field is required',
      severity: 'error',
      field: 'description',
    });
    return issues;
  }

  if (description.length < DESCRIPTION_MIN_LENGTH) {
    issues.push({
      code: 'DESCRIPTION_TOO_SHORT',
      message: `Description must be at least ${DESCRIPTION_MIN_LENGTH} character`,
      severity: 'error',
      field: 'description',
      expected: `>= ${DESCRIPTION_MIN_LENGTH} chars`,
      actual: `${description.length} chars`,
    });
  }

  if (description.length > DESCRIPTION_MAX_LENGTH) {
    issues.push({
      code: 'DESCRIPTION_TOO_LONG',
      message: `Description must be ${DESCRIPTION_MAX_LENGTH} characters or fewer`,
      severity: 'error',
      field: 'description',
      expected: `<= ${DESCRIPTION_MAX_LENGTH} chars`,
      actual: `${description.length} chars`,
    });
  }

  if (description.length < 50) {
    issues.push({
      code: 'DESCRIPTION_TOO_BRIEF',
      message: 'Description should describe what the skill does AND when to use it',
      severity: 'warning',
      field: 'description',
      actual: `${description.length} chars`,
    });
  }

  return issues;
}

/**
 * Validate compatibility field
 */
function validateCompatibility(compatibility: string | undefined): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  if (compatibility && compatibility.length > COMPATIBILITY_MAX_LENGTH) {
    issues.push({
      code: 'COMPATIBILITY_TOO_LONG',
      message: `Compatibility field must be ${COMPATIBILITY_MAX_LENGTH} characters or fewer`,
      severity: 'error',
      field: 'compatibility',
      expected: `<= ${COMPATIBILITY_MAX_LENGTH} chars`,
      actual: `${compatibility.length} chars`,
    });
  }

  return issues;
}

/**
 * Validate metadata structure
 */
function validateMetadata(metadata: Record<string, unknown> | undefined): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  if (!metadata) return issues;

  if (typeof metadata !== 'object' || Array.isArray(metadata)) {
    issues.push({
      code: 'METADATA_INVALID_TYPE',
      message: 'Metadata must be a key-value object',
      severity: 'error',
      field: 'metadata',
    });
    return issues;
  }

  for (const [key, value] of Object.entries(metadata)) {
    if (typeof value !== 'string' && typeof value !== 'number' && typeof value !== 'boolean') {
      issues.push({
        code: 'METADATA_VALUE_INVALID',
        message: `Metadata value for "${key}" must be a string, number, or boolean`,
        severity: 'warning',
        field: `metadata.${key}`,
        actual: typeof value,
      });
    }
  }

  return issues;
}

/**
 * Validate SKILL.md body content
 */
function validateBody(skillMd: string, bodyLineCount?: number): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  if (bodyLineCount && bodyLineCount > SKILL_MD_MAX_LINES) {
    issues.push({
      code: 'BODY_TOO_LONG',
      message: `SKILL.md should be under ${SKILL_MD_MAX_LINES} lines`,
      severity: 'warning',
      expected: `<= ${SKILL_MD_MAX_LINES} lines`,
      actual: `${bodyLineCount} lines`,
    });
  }

  const hasInputs = /##\s*(inputs|input required)/i.test(skillMd);
  const hasOutputs = /##\s*(outputs|output)/i.test(skillMd);
  const hasSummary = /##\s*(summary|overview)/i.test(skillMd);

  if (!hasSummary) {
    issues.push({
      code: 'BODY_MISSING_SUMMARY',
      message: 'Consider adding a ## Summary section',
      severity: 'info',
    });
  }

  if (!hasInputs) {
    issues.push({
      code: 'BODY_MISSING_INPUTS',
      message: 'Consider adding a ## Inputs section',
      severity: 'info',
    });
  }

  if (!hasOutputs) {
    issues.push({
      code: 'BODY_MISSING_OUTPUTS',
      message: 'Consider adding a ## Outputs section',
      severity: 'info',
    });
  }

  return issues;
}

/**
 * Create validation result from issues
 */
function createResult(
  issues: ValidationIssue[],
  frontmatter?: SkillFrontmatter
): SkillValidationResult {
  const errorCount = issues.filter((i) => i.severity === 'error').length;
  const warningCount = issues.filter((i) => i.severity === 'warning').length;
  const infoCount = issues.filter((i) => i.severity === 'info').length;

  return {
    isValid: errorCount === 0,
    errors: issues.filter((i) => i.severity === 'error').map((i) => i.message),
    issues,
    frontmatter,
    summary: { errorCount, warningCount, infoCount },
  };
}

/**
 * Validate a SKILL.md content string
 *
 * @param skillMd - The SKILL.md content to validate
 * @returns Validation result with issues and summary
 *
 * @example
 * ```ts
 * const result = validateSkill(skillMdContent);
 * if (!result.isValid) {
 *   console.log('Errors:', result.errors);
 * }
 * ```
 */
export function validateSkill(skillMd: string): SkillValidationResult {
  const parseResult = parseSkillFrontmatter(skillMd);

  if (parseResult.issues.length > 0) {
    return createResult(parseResult.issues);
  }

  const { frontmatter, bodyLineCount } = parseResult;
  const allIssues: ValidationIssue[] = [];

  allIssues.push(...validateName(frontmatter?.name));
  allIssues.push(...validateDescription(frontmatter?.description));
  allIssues.push(...validateCompatibility(frontmatter?.compatibility));
  allIssues.push(...validateMetadata(frontmatter?.metadata as Record<string, unknown>));
  allIssues.push(...validateBody(skillMd, bodyLineCount));

  return createResult(allIssues, frontmatter);
}

/**
 * Validate a skill bundle with bundle name matching
 *
 * @param skillMd - The SKILL.md content
 * @param bundleName - Expected bundle/directory name
 * @param options - Additional validation options
 * @returns Validation result
 *
 * @example
 * ```ts
 * const result = validateSkillBundle(content, 'patient-intake');
 * if (!result.isValid) {
 *   console.log('Bundle validation failed:', result.errors);
 * }
 * ```
 */
export function validateSkillBundle(
  skillMd: string,
  bundleName: string,
  options: {
    strictMode?: boolean;
  } = {}
): SkillValidationResult {
  const parseResult = parseSkillFrontmatter(skillMd);

  if (parseResult.issues.length > 0) {
    return createResult(parseResult.issues);
  }

  const { frontmatter, bodyLineCount } = parseResult;
  const allIssues: ValidationIssue[] = [];

  allIssues.push(...validateName(frontmatter?.name, bundleName));
  allIssues.push(...validateDescription(frontmatter?.description));
  allIssues.push(...validateCompatibility(frontmatter?.compatibility));
  allIssues.push(...validateMetadata(frontmatter?.metadata as Record<string, unknown>));
  allIssues.push(...validateBody(skillMd, bodyLineCount));

  // In strict mode, upgrade warnings to errors
  if (options.strictMode) {
    for (const issue of allIssues) {
      if (issue.severity === 'warning') {
        issue.severity = 'error';
      }
    }
  }

  return createResult(allIssues, frontmatter);
}
