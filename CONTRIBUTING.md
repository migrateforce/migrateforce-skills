# Contributing to MigrateForce Skills

We welcome contributions! This guide will help you add skills to the library.

## Quick Start

```bash
# Fork and clone
git clone https://github.com/YOUR_USERNAME/migrateforce-skills.git
cd migrateforce-skills

# Install dependencies
npm install

# Create your skill
npx @migrateforce/cli skill init my-skill-name

# Edit your skill
code ./skills/my-skill-name/SKILL.md

# Validate
npm run validate

# Commit and push
git add .
git commit -m "feat: add my-skill-name skill"
git push origin main

# Open a pull request
```

## Skill Guidelines

### Naming

- Use lowercase with hyphens: `patient-intake`, `lead-scoring`
- Be descriptive but concise
- Avoid generic names like `helper` or `util`

### Description

Your description should answer:
1. **What** does this skill do?
2. **When** should an agent use it?

**Good:** "Collect patient demographics and insurance information during medical intake. Use when onboarding new patients."

**Bad:** "Handles patient stuff"

### Quality Checklist

- [ ] Name follows format (lowercase, hyphens, 1-64 chars)
- [ ] Description is 50+ characters
- [ ] Has a Summary section
- [ ] Inputs are documented with types
- [ ] Outputs are documented
- [ ] Workflow is clear and actionable
- [ ] Example usage included
- [ ] Passes `npm run validate`

### Metadata

Add metadata to improve discoverability:

```yaml
metadata:
  industry: healthcare      # Target industry
  complexity: medium        # low, medium, high
  value_driver: efficiency  # efficiency, cost_reduction, revenue
```

## Directory Structure

```
skills/
├── patient-intake/
│   ├── SKILL.md           # Required
│   ├── references/        # Optional: supporting docs
│   └── scripts/           # Optional: helper scripts
└── lead-scoring/
    └── SKILL.md
```

## Testing Your Skill

1. **Validate syntax:**
   ```bash
   npm run validate
   ```

2. **Test with an agent:**
   - Add to a Claude Code project
   - Reference in CLAUDE.md
   - Verify the agent understands and can execute it

## Pull Request Process

1. **One skill per PR** - Makes review easier
2. **Use conventional commits:**
   - `feat: add patient-intake skill`
   - `fix: correct inputs in lead-scoring`
   - `docs: improve patient-intake example`

3. **PR template:**
   ```markdown
   ## Skill: [name]

   **Industry:** [industry]
   **Complexity:** [low/medium/high]

   ### What it does
   [Brief description]

   ### Testing
   - [ ] Passes validation
   - [ ] Tested with [agent name]
   ```

## Skill Ideas

Looking for inspiration? Here are skills we'd love to see:

### Healthcare
- appointment-scheduling
- insurance-verification
- prescription-refill
- lab-result-review

### Finance
- invoice-processing
- expense-categorization
- budget-analysis
- tax-document-prep

### Sales
- lead-qualification
- proposal-generation
- contract-review
- crm-data-entry

### Marketing
- content-calendar
- social-media-post
- email-campaign
- seo-audit

### Engineering
- code-review
- bug-triage
- release-notes
- api-documentation

## Code of Conduct

- Be respectful and constructive
- Focus on the skill, not the person
- Help others improve their contributions

## Questions?

- Open an issue for questions
- Join discussions in existing issues
- Check the [SKILL.md Specification](./docs/SKILL-SPEC.md)

---

Thank you for contributing! Every skill makes AI agents more capable.
