/**
 * Skill catalog functions for discovering and listing skills
 */
import { glob } from 'glob';
import { join, dirname, basename } from 'path';
import { loadSkill } from './loader';
import { Skill, ListSkillsOptions } from './types';

/**
 * Default base path for skills directory
 */
const DEFAULT_SKILLS_PATH = 'skills';

/**
 * Get the path to a skill's SKILL.md file
 *
 * @param skillName - Name of the skill
 * @param basePath - Base directory for skills
 * @returns Path to SKILL.md file
 *
 * @example
 * ```ts
 * const path = getSkillPath('patient-intake');
 * // Returns: 'skills/patient-intake/SKILL.md'
 * ```
 */
export function getSkillPath(skillName: string, basePath: string = DEFAULT_SKILLS_PATH): string {
  return join(basePath, skillName, 'SKILL.md');
}

/**
 * Find a skill by name
 *
 * @param skillName - Name of the skill to find
 * @param basePath - Base directory for skills
 * @returns Loaded skill or null if not found
 *
 * @example
 * ```ts
 * const skill = await findSkill('patient-intake');
 * if (skill) {
 *   console.log(skill.description);
 * }
 * ```
 */
export async function findSkill(
  skillName: string,
  basePath: string = DEFAULT_SKILLS_PATH
): Promise<Skill | null> {
  try {
    const skillPath = getSkillPath(skillName, basePath);
    return await loadSkill(skillPath);
  } catch {
    return null;
  }
}

/**
 * List all available skills with optional filtering
 *
 * @param options - Filter and search options
 * @returns Array of loaded skills matching the criteria
 *
 * @example
 * ```ts
 * // List all skills
 * const skills = await listSkills();
 *
 * // Filter by industry
 * const healthcareSkills = await listSkills({ industry: 'healthcare' });
 *
 * // Filter by complexity
 * const simpleSkills = await listSkills({ complexity: 'low' });
 *
 * // Search by name or description
 * const results = await listSkills({ search: 'patient' });
 * ```
 */
export async function listSkills(options: ListSkillsOptions = {}): Promise<Skill[]> {
  const basePath = options.basePath || DEFAULT_SKILLS_PATH;

  // Find all SKILL.md files
  const pattern = join(basePath, '**/SKILL.md');
  const files = await glob(pattern);

  // Load all skills
  const skills: Skill[] = [];
  for (const file of files) {
    try {
      const skill = await loadSkill(file);
      skills.push(skill);
    } catch (error) {
      // Skip invalid skills silently
      console.warn(`Failed to load skill from ${file}:`, error);
    }
  }

  // Apply filters
  let filtered = skills;

  if (options.industry) {
    const industry = options.industry.toLowerCase();
    filtered = filtered.filter((skill) => {
      const skillIndustry = skill.frontmatter.metadata?.industry;
      return typeof skillIndustry === 'string' && skillIndustry.toLowerCase() === industry;
    });
  }

  if (options.complexity) {
    filtered = filtered.filter((skill) => {
      return skill.frontmatter.metadata?.complexity === options.complexity;
    });
  }

  if (options.valueDriver) {
    const driver = options.valueDriver.toLowerCase();
    filtered = filtered.filter((skill) => {
      const skillDriver = skill.frontmatter.metadata?.value_driver;
      return typeof skillDriver === 'string' && skillDriver.toLowerCase() === driver;
    });
  }

  if (options.search) {
    const search = options.search.toLowerCase();
    filtered = filtered.filter((skill) => {
      return (
        skill.name.toLowerCase().includes(search) ||
        skill.description.toLowerCase().includes(search)
      );
    });
  }

  // Sort by name
  filtered.sort((a, b) => a.name.localeCompare(b.name));

  return filtered;
}

/**
 * Get all unique industries from available skills
 *
 * @param basePath - Base directory for skills
 * @returns Array of unique industry names
 *
 * @example
 * ```ts
 * const industries = await getIndustries();
 * // Returns: ['healthcare', 'financial-services', 'retail']
 * ```
 */
export async function getIndustries(basePath: string = DEFAULT_SKILLS_PATH): Promise<string[]> {
  const skills = await listSkills({ basePath });
  const industries = new Set<string>();

  for (const skill of skills) {
    const industry = skill.frontmatter.metadata?.industry;
    if (typeof industry === 'string') {
      industries.add(industry);
    }
  }

  return Array.from(industries).sort();
}

/**
 * Get all unique value drivers from available skills
 *
 * @param basePath - Base directory for skills
 * @returns Array of unique value driver names
 */
export async function getValueDrivers(basePath: string = DEFAULT_SKILLS_PATH): Promise<string[]> {
  const skills = await listSkills({ basePath });
  const drivers = new Set<string>();

  for (const skill of skills) {
    const driver = skill.frontmatter.metadata?.value_driver;
    if (typeof driver === 'string') {
      drivers.add(driver);
    }
  }

  return Array.from(drivers).sort();
}

/**
 * Get skill count by complexity level
 *
 * @param basePath - Base directory for skills
 * @returns Object with counts per complexity level
 */
export async function getSkillCountByComplexity(
  basePath: string = DEFAULT_SKILLS_PATH
): Promise<{ low: number; medium: number; high: number; unknown: number }> {
  const skills = await listSkills({ basePath });
  const counts = { low: 0, medium: 0, high: 0, unknown: 0 };

  for (const skill of skills) {
    const complexity = skill.frontmatter.metadata?.complexity;
    if (complexity === 'low' || complexity === 'medium' || complexity === 'high') {
      counts[complexity]++;
    } else {
      counts.unknown++;
    }
  }

  return counts;
}
