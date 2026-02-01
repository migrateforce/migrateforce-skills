#!/usr/bin/env node
/**
 * CLI for validating skills
 */
import { readFile } from 'fs/promises';
import { glob } from 'glob';
import { join, basename, dirname } from 'path';
import { validateSkillBundle, parseSkillFrontmatter } from './validator';
import { ValidationIssue } from './types';

const args = process.argv.slice(2);

const COLORS = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  gray: '\x1b[90m',
};

function colorize(text: string, color: keyof typeof COLORS): string {
  return `${COLORS[color]}${text}${COLORS.reset}`;
}

function printIssue(issue: ValidationIssue): void {
  const icon = issue.severity === 'error' ? '✗' : issue.severity === 'warning' ? '⚠' : 'ℹ';
  const color = issue.severity === 'error' ? 'red' : issue.severity === 'warning' ? 'yellow' : 'blue';
  const fieldInfo = issue.field ? colorize(` [${issue.field}]`, 'gray') : '';
  console.log(`  ${colorize(icon, color)} ${issue.message}${fieldInfo}`);
  if (issue.expected) {
    console.log(`    ${colorize('expected:', 'gray')} ${issue.expected}`);
  }
  if (issue.actual) {
    console.log(`    ${colorize('actual:', 'gray')} ${issue.actual}`);
  }
}

async function validateFile(filePath: string): Promise<boolean> {
  const content = await readFile(filePath, 'utf-8');
  const bundleName = basename(dirname(filePath));
  const result = validateSkillBundle(content, bundleName);

  const statusIcon = result.isValid ? colorize('✓', 'green') : colorize('✗', 'red');
  console.log(`\n${statusIcon} ${filePath}`);

  if (result.issues.length > 0) {
    for (const issue of result.issues) {
      printIssue(issue);
    }
  }

  console.log(
    colorize(
      `  ${result.summary.errorCount} errors, ${result.summary.warningCount} warnings, ${result.summary.infoCount} info`,
      'gray'
    )
  );

  return result.isValid;
}

async function validateAll(): Promise<void> {
  const pattern = 'skills/**/SKILL.md';
  const files = await glob(pattern);

  if (files.length === 0) {
    console.log('No SKILL.md files found in skills/ directory');
    process.exit(0);
  }

  console.log(`Found ${files.length} skill(s) to validate\n`);

  let passed = 0;
  let failed = 0;

  for (const file of files) {
    const isValid = await validateFile(file);
    if (isValid) {
      passed++;
    } else {
      failed++;
    }
  }

  console.log('\n' + '─'.repeat(50));
  console.log(`\nValidation complete: ${colorize(`${passed} passed`, 'green')}, ${colorize(`${failed} failed`, failed > 0 ? 'red' : 'green')}`);

  if (failed > 0) {
    process.exit(1);
  }
}

async function main(): Promise<void> {
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
@migrateforce/skills CLI

Usage:
  npx @migrateforce/skills validate [file]     Validate a skill file
  npx @migrateforce/skills validate --all      Validate all skills

Options:
  --all, -a     Validate all skills in skills/ directory
  --help, -h    Show this help message

Examples:
  npx @migrateforce/skills validate skills/patient-intake/SKILL.md
  npx @migrateforce/skills validate --all
`);
    return;
  }

  const command = args[0];

  if (command === 'validate') {
    if (args.includes('--all') || args.includes('-a')) {
      await validateAll();
    } else if (args[1]) {
      const isValid = await validateFile(args[1]);
      if (!isValid) {
        process.exit(1);
      }
    } else {
      console.error('Please specify a file or use --all');
      process.exit(1);
    }
  } else {
    console.error(`Unknown command: ${command}`);
    console.error('Use --help to see available commands');
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('Error:', error.message);
  process.exit(1);
});
