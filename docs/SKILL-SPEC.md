# SKILL.md Specification

Version: 1.0.0

## Overview

A Skill is a portable, reusable unit of domain knowledge for AI agents. Skills tell agents **what to do** and **when to do it**—the semantic layer between raw capabilities and intelligent automation.

## File Structure

Every skill is a directory containing at minimum a `SKILL.md` file:

```
my-skill/
├── SKILL.md           # Required: Skill definition
├── references/        # Optional: Supporting documents
├── scripts/           # Optional: Helper scripts
└── assets/            # Optional: Images, templates
```

## SKILL.md Format

SKILL.md uses YAML frontmatter followed by Markdown content:

```yaml
---
name: my-skill-name
description: One-line description of what this skill does and when to use it
license: MIT
compatibility: claude-code, cursor, cline
metadata:
  industry: healthcare
  complexity: medium
  value_driver: efficiency
allowed-tools: Read, Write, Edit, Bash
---

## Summary

Detailed description of the skill...

## Inputs

...

## Outputs

...
```

## Frontmatter Fields

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Unique skill identifier. Lowercase, hyphens allowed. 1-64 chars. |
| `description` | string | What the skill does and when to use it. 1-1024 chars. |

### Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `license` | string | License identifier (e.g., "MIT", "Apache-2.0") |
| `compatibility` | string | Comma-separated list of compatible agents |
| `metadata` | object | Key-value pairs for categorization |
| `allowed-tools` | string | Comma-separated list of tools the skill may use |

### Metadata Fields

Common metadata fields for discovery:

| Field | Values | Description |
|-------|--------|-------------|
| `industry` | healthcare, finance, retail, etc. | Target industry |
| `complexity` | low, medium, high | Implementation complexity |
| `value_driver` | efficiency, cost_reduction, revenue | Business value category |
| `segment` | string | Industry sub-segment |
| `function` | string | Business function |

## Body Sections

### Recommended Sections

| Section | Purpose |
|---------|---------|
| `## Summary` | Detailed description of the skill |
| `## Inputs` | Table of required/optional inputs |
| `## Outputs` | Table of expected outputs |
| `## Workflow` | Step-by-step execution flow |
| `## Example Usage` | Sample agent interaction |

### Optional Sections

| Section | Purpose |
|---------|---------|
| `## Trigger Conditions` | When this skill should activate |
| `## Integration Points` | Dependencies and connections |
| `## Compliance Notes` | Regulatory considerations |
| `## Error Handling` | How to handle failures |

## Name Format

Skill names must:
- Contain only lowercase letters, numbers, and hyphens
- Not start or end with a hyphen
- Not contain consecutive hyphens
- Be 1-64 characters long

**Valid:** `patient-intake`, `lead-scoring`, `invoice-ocr`
**Invalid:** `Patient_Intake`, `-my-skill`, `my--skill`

## Validation

Use the CLI to validate skills:

```bash
# Validate a single skill
npx @migrateforce/cli skill validate ./skills/my-skill/SKILL.md

# Validate all skills
npx @migrateforce/cli skill validate --all
```

### Validation Rules

| Code | Severity | Description |
|------|----------|-------------|
| `NAME_REQUIRED` | error | Missing name field |
| `NAME_INVALID_FORMAT` | error | Name doesn't match pattern |
| `DESCRIPTION_REQUIRED` | error | Missing description |
| `DESCRIPTION_TOO_BRIEF` | warning | Description under 50 chars |
| `BODY_MISSING_SUMMARY` | info | No Summary section |
| `BODY_MISSING_INPUTS` | info | No Inputs section |
| `BODY_MISSING_OUTPUTS` | info | No Outputs section |

## Agent Compatibility

Skills are designed to work across multiple AI agents:

| Agent | Integration |
|-------|-------------|
| Claude Code | Add to project, reference in CLAUDE.md |
| Cursor | Place in .cursor/rules or reference |
| Cline | Add to workspace context |
| Windsurf | Include in project |
| MCP | Use with @migrateforce/mcp for tool generation |

### Claude Code Integration

```bash
# Add skill to project
npx @migrateforce/cli skill add patient-intake

# Reference in CLAUDE.md
echo "Reference: ./skills/patient-intake/SKILL.md" >> CLAUDE.md
```

### Cursor Integration

```bash
# Add to Cursor rules
npx @migrateforce/cli skill add patient-intake --format cursor
```

## Publishing Skills

### To MigrateForce Library

1. Fork [migrateforce-skills](https://github.com/migrateforce/migrateforce-skills)
2. Add your skill: `skills/your-skill-name/SKILL.md`
3. Validate: `npm run validate`
4. Submit pull request

### From Your Own Repo

Skills can also be installed directly from GitHub:

```bash
npx @migrateforce/cli skill add github:username/repo
```

## Examples

### Minimal Skill

```yaml
---
name: hello-world
description: A simple greeting skill for testing agent capabilities
---

## Summary

This skill demonstrates the basic SKILL.md format. Use it to verify your agent can read and execute skills.

## Workflow

1. Greet the user
2. Ask how you can help
3. Respond appropriately
```

### Full Skill

```yaml
---
name: patient-intake
description: Collect and validate patient information during medical intake. Use when a healthcare provider needs to gather demographics, history, and insurance.
license: MIT
compatibility: claude-code, cursor, cline
metadata:
  industry: healthcare
  segment: clinical-operations
  complexity: medium
  value_driver: efficiency
allowed-tools: Read, Write, Edit
---

## Summary

This skill guides agents through patient intake, ensuring complete data collection while maintaining HIPAA compliance.

## Inputs

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| patient_name | string | yes | Full legal name |
| date_of_birth | date | yes | DOB in YYYY-MM-DD |
| insurance_provider | string | no | Primary insurance |

## Outputs

| Field | Type | Description |
|-------|------|-------------|
| intake_form_id | string | Unique identifier |
| validation_status | enum | complete, incomplete, needs_review |

## Workflow

1. **Verify Identity** - Confirm name and DOB
2. **Collect Demographics** - Address, phone, email
3. **Medical History** - Medications, allergies, conditions
4. **Insurance** - Provider, policy number, group
5. **Consent** - HIPAA, treatment, financial

## Example Usage

\`\`\`
Agent: I'll help you complete patient intake. What is the patient's full name?
User: John Smith
Agent: And their date of birth?
User: March 15, 1985
\`\`\`
```

## Changelog

- **1.0.0** - Initial specification
