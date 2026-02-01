/**
 * Skill metadata from frontmatter
 */
export interface SkillMetadata {
  industry?: string;
  segment?: string;
  function?: string;
  value_driver?: string;
  complexity?: 'low' | 'medium' | 'high';
  derived_from?: 'use_case' | 'workflow_template' | 'assessment' | 'user';
  source_id?: string;
  [key: string]: string | number | boolean | undefined;
}

/**
 * Parsed SKILL.md frontmatter
 */
export interface SkillFrontmatter {
  name: string;
  description: string;
  license?: string;
  compatibility?: string;
  metadata?: SkillMetadata;
  'allowed-tools'?: string;
}

/**
 * Loaded skill with content and metadata
 */
export interface Skill {
  /** Skill name from frontmatter */
  name: string;
  /** Skill description */
  description: string;
  /** Full parsed frontmatter */
  frontmatter: SkillFrontmatter;
  /** Markdown body (after frontmatter) */
  body: string;
  /** Full raw content */
  content: string;
  /** File path if loaded from file */
  path?: string;
  /** Parsed sections from body */
  sections: Record<string, string>;
}

/**
 * Validation severity levels
 */
export type ValidationSeverity = 'error' | 'warning' | 'info';

/**
 * Individual validation issue
 */
export interface ValidationIssue {
  code: string;
  message: string;
  severity: ValidationSeverity;
  field?: string;
  expected?: string;
  actual?: string;
}

/**
 * Validation result
 */
export interface SkillValidationResult {
  isValid: boolean;
  errors: string[];
  issues: ValidationIssue[];
  frontmatter?: SkillFrontmatter;
  summary: {
    errorCount: number;
    warningCount: number;
    infoCount: number;
  };
}

/**
 * Options for listing skills
 */
export interface ListSkillsOptions {
  /** Filter by industry */
  industry?: string;
  /** Filter by complexity */
  complexity?: 'low' | 'medium' | 'high';
  /** Filter by value driver */
  valueDriver?: string;
  /** Search query */
  search?: string;
  /** Base directory for skills */
  basePath?: string;
}
