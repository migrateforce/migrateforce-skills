<p align="center">
  <h1 align="center">migrateforce-skills</h1>
  <p align="center">
    The open source Skills library for AI agents.<br/>
    Agent-ready capabilities in SKILL.md format.
  </p>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@migrateforce/skills"><img src="https://img.shields.io/npm/v/@migrateforce/skills.svg" alt="npm version"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT"></a>
  <a href="https://github.com/migrateforce/migrateforce-skills/stargazers"><img src="https://img.shields.io/github/stars/migrateforce/migrateforce-skills" alt="GitHub stars"></a>
</p>

---

## What is a Skill?

A **Skill** is a portable, composable unit of domain knowledge that AI agents can execute. Skills tell agents *what to do* and *when to do it*—the semantic layer between raw APIs and intelligent automation.

```
SKILL.md = Knowledge (what, when, why)
MCP      = Actions (how, tools, API calls)
Together = Complete agent capabilities
```

## Quick Start

```bash
# Add a skill to your project
npx @migrateforce/cli skill add patient-intake

# Or install the library
npm install @migrateforce/skills
```

## Browse Skills

| Industry | Skills | Examples |
|----------|--------|----------|
| **Healthcare** | 25+ | `patient-intake`, `appointment-scheduling`, `insurance-verification` |
| **Marketing** | 20+ | `lead-scoring`, `campaign-automation`, `content-calendar` |
| **Sales** | 15+ | `deal-qualification`, `quote-generation`, `contract-review` |
| **Finance** | 12+ | `invoice-processing`, `expense-categorization`, `reconciliation` |

[**Browse all skills →**](https://migrateforce.com/skills)

---

## SKILL.md Specification

Skills use YAML frontmatter + Markdown body:

```yaml
---
name: patient-intake-automation
description: Automates patient intake workflows for healthcare practices
license: MIT
metadata:
  industry: healthcare
  segment: dental
  complexity: medium
  value_driver: cost_reduction
---

## Summary

Automates the patient intake process by extracting information from forms,
validating insurance eligibility, and pre-populating EHR records.

## Trigger Conditions

- New patient form submitted
- Appointment scheduled for new patient
- Insurance information updated

## Inputs Required

| Input | Type | Required | Description |
|-------|------|----------|-------------|
| `patient_form` | PDF or JSON | Yes | Completed intake form |
| `insurance_info` | Object | Yes | Provider and policy details |
| `practice_id` | String | Yes | Healthcare practice identifier |

## Outputs

| Output | Type | Description |
|--------|------|-------------|
| `patient_record` | Object | Validated patient data ready for EHR |
| `eligibility_status` | Enum | Insurance verification result |
| `recommended_actions` | Array | Next steps for front desk staff |

## Integration Points

- **Depends on**: `insurance-verification` skill
- **Uses MCP**: `ehr-api`, `insurance-api`
- **Triggers**: `appointment-reminder` skill
```

---

## Creating Skills

### From scratch

```bash
# Initialize a new skill
npx @migrateforce/cli skill init my-skill

# Edit the generated SKILL.md
code ./skills/my-skill/SKILL.md

# Validate
npx @migrateforce/cli skill validate
```

### From a use case

```bash
npx @migrateforce/cli skill derive \
  --from-use-case "patient intake automation" \
  --industry healthcare
```

### From an assessment

```bash
npx @migrateforce/cli skill derive \
  --from-assessment assessment-id
```

---

## Validation

```bash
# Validate a single skill
npx @migrateforce/cli skill validate ./skills/my-skill/SKILL.md

# Validate all skills in directory
npx @migrateforce/cli skill validate --all

# Check for breaking changes
npx @migrateforce/cli skill validate --check-compat
```

### Validation Rules

| Rule | Description |
|------|-------------|
| `NAME_REQUIRED` | Skill must have a name in frontmatter |
| `DESCRIPTION_REQUIRED` | Description is mandatory |
| `NAME_FORMAT` | Name must be lowercase with hyphens |
| `SUMMARY_SECTION` | Must include a Summary section |
| `INPUTS_DOCUMENTED` | All inputs must be documented |
| `OUTPUTS_DOCUMENTED` | All outputs must be documented |

---

## Directory Structure

```
migrateforce-skills/
├── skills/
│   ├── healthcare/
│   │   ├── patient-intake/
│   │   │   └── SKILL.md
│   │   ├── insurance-verification/
│   │   │   └── SKILL.md
│   │   └── appointment-scheduling/
│   │       └── SKILL.md
│   ├── marketing/
│   │   ├── lead-scoring/
│   │   │   └── SKILL.md
│   │   └── campaign-automation/
│   │       └── SKILL.md
│   └── sales/
│       └── deal-qualification/
│           └── SKILL.md
├── docs/
│   ├── SKILL-SPEC.md          # Full specification
│   └── CONTRIBUTING.md
├── src/
│   ├── validator.ts           # Validation logic
│   └── parser.ts              # SKILL.md parser
└── package.json
```

---

## Using Skills with AI Agents

Skills work with any AI agent that can read context:

### Claude Code

```bash
# Add skill to project
npx @migrateforce/cli skill add patient-intake

# Reference in CLAUDE.md
echo "See ./skills/patient-intake/SKILL.md for patient intake workflow" >> CLAUDE.md
```

### Cursor

```bash
# Add to your project
npx @migrateforce/cli skill add patient-intake

# Reference in .cursorrules
echo "@skills/patient-intake/SKILL.md" >> .cursorrules
```

### Programmatic Use

```typescript
import { loadSkill } from '@migrateforce/skills';

const skill = await loadSkill('./skills/patient-intake/SKILL.md');

// Use as context for any LLM
const systemPrompt = `You have the following skill:

${skill.body}

Execute this skill when the user's request matches.`;
```

---

## Contributing

We welcome skill contributions!

### Process

1. Fork this repo
2. Create your skill in `skills/<industry>/<skill-name>/SKILL.md`
3. Run validation: `npm run validate`
4. Submit a PR

### Quality Guidelines

- [ ] Clear, specific description (1-2 sentences)
- [ ] Well-defined trigger conditions
- [ ] All inputs/outputs documented with types
- [ ] Integration points specified
- [ ] Tested with reference agent (optional but encouraged)

See [CONTRIBUTING.md](./CONTRIBUTING.md) for full guidelines.

---

## API Reference

### `loadSkill(path)`

```typescript
import { loadSkill } from '@migrateforce/skills';

const skill = await loadSkill('./SKILL.md');
console.log(skill.name);        // 'patient-intake'
console.log(skill.metadata);    // { industry: 'healthcare', ... }
console.log(skill.sections);    // { summary: '...', inputs: '...', ... }
```

### `validateSkill(content)`

```typescript
import { validateSkill } from '@migrateforce/skills';

const result = validateSkill(skillMdContent);
if (!result.isValid) {
  console.log(result.errors);   // ['NAME_REQUIRED', ...]
}
```

### `listSkills(options)`

```typescript
import { listSkills } from '@migrateforce/skills';

const skills = await listSkills({
  industry: 'healthcare',
  complexity: 'medium',
});
```

---

## License

MIT — Use these skills anywhere, no restrictions.

---

## Links

- [Skills Directory](https://migrateforce.com/skills) — Browse and search
- [SKILL.md Specification](./docs/SKILL-SPEC.md) — Full spec
- [MigrateForce MCP](https://github.com/migrateforce/migrateforce-mcp) — Action layer
- [Discord](https://discord.gg/migrateforce) — Community

---

<p align="center">
  <sub>Part of the <a href="https://github.com/migrateforce">MigrateForce</a> open source ecosystem</sub>
</p>
