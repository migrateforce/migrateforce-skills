/**
 * @migrateforce/skills
 * The open source Skills library for AI agents.
 *
 * @example
 * ```ts
 * import { loadSkill, validateSkill, listSkills } from '@migrateforce/skills';
 *
 * const skill = await loadSkill('./skills/patient-intake/SKILL.md');
 * const result = validateSkill(skill.content);
 * ```
 */

export { loadSkill, loadSkillFromString } from './loader';
export { validateSkill, validateSkillBundle, parseSkillFrontmatter } from './validator';
export { listSkills, findSkill, getSkillPath } from './catalog';
export type {
  Skill,
  SkillFrontmatter,
  SkillMetadata,
  SkillValidationResult,
  ValidationIssue,
  ValidationSeverity,
  ListSkillsOptions,
} from './types';
