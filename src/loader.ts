/**
 * Skill loader functions
 */
import matter from 'gray-matter';
import { readFile } from 'fs/promises';
import { Skill, SkillFrontmatter } from './types';

/**
 * Parse sections from markdown body
 */
function parseSections(body: string): Record<string, string> {
  const sections: Record<string, string> = {};
  const lines = body.split('\n');

  let currentSection = '';
  let currentContent: string[] = [];

  for (const line of lines) {
    const headerMatch = line.match(/^##\s+(.+)$/);
    if (headerMatch) {
      // Save previous section
      if (currentSection) {
        sections[currentSection] = currentContent.join('\n').trim();
      }
      currentSection = headerMatch[1].toLowerCase().replace(/\s+/g, '-');
      currentContent = [];
    } else if (currentSection) {
      currentContent.push(line);
    }
  }

  // Save last section
  if (currentSection) {
    sections[currentSection] = currentContent.join('\n').trim();
  }

  return sections;
}

/**
 * Load a skill from a file path
 *
 * @param filePath - Path to SKILL.md file
 * @returns Loaded skill with parsed content
 *
 * @example
 * ```ts
 * const skill = await loadSkill('./skills/patient-intake/SKILL.md');
 * console.log(skill.name); // 'patient-intake'
 * console.log(skill.sections); // { summary: '...', inputs: '...', outputs: '...' }
 * ```
 */
export async function loadSkill(filePath: string): Promise<Skill> {
  const content = await readFile(filePath, 'utf-8');
  const skill = loadSkillFromString(content);
  skill.path = filePath;
  return skill;
}

/**
 * Load a skill from a string content
 *
 * @param content - Raw SKILL.md content
 * @returns Loaded skill with parsed content
 *
 * @example
 * ```ts
 * const content = `---
 * name: patient-intake
 * description: Collect patient information
 * ---
 * ## Summary
 * This skill handles patient intake...
 * `;
 * const skill = loadSkillFromString(content);
 * ```
 */
export function loadSkillFromString(content: string): Skill {
  const { data, content: body } = matter(content);

  const frontmatter = data as SkillFrontmatter;

  if (!frontmatter.name) {
    throw new Error('SKILL.md must have a "name" field in frontmatter');
  }

  if (!frontmatter.description) {
    throw new Error('SKILL.md must have a "description" field in frontmatter');
  }

  return {
    name: frontmatter.name,
    description: frontmatter.description,
    frontmatter,
    body: body.trim(),
    content,
    sections: parseSections(body),
  };
}
