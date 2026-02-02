---
name: offer-letter-generator
description: Generate compliant offer letters with compensation details, equity grants, and start date coordination. Use when extending job offers to candidates.
license: MIT
compatibility: claude-code, cursor, cline, windsurf, antigravity, opencode
metadata:
  industry: hr-software
  segment: applicant-tracking
  function: talent-acquisition
  value_driver: efficiency
  complexity: medium
  source_systems: greenhouse, ashby, workday, rippling
allowed-tools: Read, Write, Edit
---

## Summary

This skill generates professional, legally compliant offer letters tailored to the role, location, and candidate. It handles compensation calculations, equity grants, benefits summaries, and produces documents ready for e-signature.

## Inputs

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| candidate_name | string | yes | Full legal name |
| job_title | string | yes | Offered position |
| department | string | yes | Team/department |
| manager_name | string | yes | Reporting manager |
| start_date | date | yes | Proposed start date |
| base_salary | number | yes | Annual base salary |
| currency | string | no | Currency code (default: USD) |
| equity_grant | object | no | Stock options/RSUs details |
| signing_bonus | number | no | One-time signing bonus |
| location | string | yes | Work location or "Remote" |
| employment_type | enum | yes | full-time, part-time, contractor |
| offer_expiration | date | no | When offer expires |

## Outputs

| Field | Type | Description |
|-------|------|-------------|
| offer_letter | document | Formatted offer letter (PDF/DOCX) |
| compensation_summary | object | Breakdown of total compensation |
| equity_schedule | object | Vesting schedule if applicable |
| compliance_checklist | array | Location-specific requirements met |

## Workflow

### 1. Validate Inputs

- Confirm salary within approved band for role/level
- Verify equity grant approval
- Check start date against onboarding capacity
- Validate location-specific requirements

### 2. Calculate Total Compensation

```
TOTAL COMPENSATION BREAKDOWN:
- Base Salary:      $150,000
- Target Bonus:     $22,500 (15%)
- Equity (annual):  $50,000 (4-year vest)
- Benefits Value:   $25,000
─────────────────────────────
Total Package:      $247,500
```

### 3. Generate Letter

**Standard Sections:**
1. Congratulations and offer summary
2. Position details (title, department, manager)
3. Compensation (base, bonus, equity)
4. Benefits overview
5. Start date and location
6. At-will employment statement
7. Contingencies (background check, I-9)
8. Acceptance deadline
9. Signature blocks

### 4. Apply Location Compliance

| Location | Requirements |
|----------|--------------|
| California | No non-compete, salary history ban |
| New York | Salary range disclosure |
| Colorado | Benefits disclosure |
| EU/UK | GDPR data notice, notice period |
| Canada | Provincial employment standards |

### 5. Generate Documents

- Offer letter (PDF)
- Equity grant summary
- Benefits guide link
- Background check authorization
- I-9 preparation instructions

## Offer Letter Template

```
[COMPANY LOGO]

[Date]

Dear [Candidate Name],

We are pleased to offer you the position of [Job Title] at [Company Name]!
We were impressed by your background and believe you'll make a significant
contribution to our team.

POSITION DETAILS
─────────────────
Title:          [Job Title]
Department:     [Department]
Manager:        [Manager Name]
Location:       [Location]
Start Date:     [Start Date]
Employment:     [Full-time/Part-time]

COMPENSATION
─────────────────
Base Salary:    [Amount] per year, paid [frequency]
Target Bonus:   [Amount or %] based on [criteria]

[If equity:]
Equity Grant:   [Number] [stock options/RSUs]
                Vesting: [schedule]
                Strike Price: [if options]

[If signing bonus:]
Signing Bonus:  [Amount], paid [timing]
                [Clawback terms if any]

BENEFITS
─────────────────
You will be eligible for our comprehensive benefits package including:
- Health, dental, and vision insurance
- 401(k) with [match %] company match
- [PTO days] days paid time off
- [Other key benefits]

Full benefits details: [link]

CONTINGENCIES
─────────────────
This offer is contingent upon:
- Satisfactory completion of background check
- Verification of employment eligibility (I-9)
- [Any other contingencies]

ACCEPTANCE
─────────────────
Please indicate your acceptance by signing below and returning this letter
by [Expiration Date].

We are excited about the possibility of you joining our team!

Sincerely,

_____________________
[Hiring Manager Name]
[Title]


ACCEPTANCE

I accept this offer of employment:

_____________________          ____________
[Candidate Name]               Date
```

## Equity Section (if applicable)

```
EQUITY GRANT DETAILS
─────────────────

Grant Type:     [Stock Options / RSUs]
Number:         [X,XXX] shares
Strike Price:   $[X.XX] (options only)

Vesting Schedule:
- 1-year cliff: 25% vests after 12 months
- Monthly after: Remaining 75% vests monthly over 36 months
- Full vest: 4 years from start date

Current 409A Valuation: $[X.XX] per share
[Disclaimer about valuation changes]
```

## Example Usage

```
User: Generate offer letter for Sarah Chen, Senior Engineer, $175k base

Agent: I'll generate the offer letter for Sarah Chen.

**Offer Summary:**
- Position: Senior Software Engineer
- Base Salary: $175,000/year
- Target Bonus: 15% ($26,250)
- Equity: 10,000 stock options (4-year vest)
- Total Package: ~$251,250/year

**Location Compliance (California):**
✓ No non-compete clause included
✓ Salary history not requested
✓ At-will employment stated

**Documents Generated:**
1. offer-letter-sarah-chen.pdf
2. equity-grant-summary.pdf
3. benefits-overview.pdf

**Next Steps:**
- Send via DocuSign for e-signature
- Offer expires: February 15, 2025
- Pending: Background check authorization
```

## Integration Points

- **Upstream:** `candidate-screening`, interview feedback
- **Downstream:** `onboarding-checklist`, HRIS setup
- **E-signature:** DocuSign, HelloSign, PandaDoc
