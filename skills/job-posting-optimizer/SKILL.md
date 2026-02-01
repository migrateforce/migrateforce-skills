---
name: job-posting-optimizer
description: Analyze and improve job postings to attract more qualified candidates. Use when creating new job listings or improving underperforming postings.
license: MIT
compatibility: claude-code, cursor, cline, windsurf
metadata:
  industry: hr-software
  segment: applicant-tracking
  function: talent-acquisition
  value_driver: revenue
  complexity: low
  source_systems: greenhouse, ashby, linkedin, indeed
allowed-tools: Read, Write, Edit
---

## Summary

This skill optimizes job postings for clarity, inclusivity, and conversion. It analyzes job descriptions against best practices, removes biased language, improves readability, and suggests SEO improvements to attract more qualified applicants.

## Inputs

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| job_title | string | yes | Current job title |
| job_description | text | yes | Full job posting content |
| target_audience | string | no | Ideal candidate persona |
| company_culture | text | no | Company values and culture description |
| compensation_range | string | no | Salary range to include |
| optimize_for | array | no | Priorities: diversity, seo, conversion, clarity |

## Outputs

| Field | Type | Description |
|-------|------|-------------|
| optimized_title | string | Improved job title |
| optimized_description | text | Rewritten job posting |
| readability_score | number | Flesch-Kincaid score |
| bias_flags | array | Potentially biased language found |
| seo_keywords | array | Recommended keywords for search |
| improvement_summary | text | What was changed and why |

## Workflow

### 1. Analyze Current Posting

**Readability Check:**
- Calculate Flesch-Kincaid grade level (target: 8th grade)
- Identify jargon and acronyms
- Check sentence length (target: <20 words avg)

**Bias Detection:**
- Gender-coded words (ninja, rockstar, aggressive)
- Age-biased language (digital native, young team)
- Unnecessary requirements (degree when not needed)
- Exclusionary phrases

**Structure Analysis:**
- Clear sections (About, Responsibilities, Requirements, Benefits)
- Bullet points vs. paragraphs
- Length (ideal: 300-700 words)

### 2. Optimize Title

```
POOR TITLES          →  BETTER TITLES
"Rockstar Developer"  →  "Senior Software Engineer"
"Marketing Guru"      →  "Marketing Manager"
"Jr. Dev"             →  "Software Engineer I"
```

Include:
- Seniority level
- Primary function
- Avoid internal jargon

### 3. Rewrite Requirements

**Before:**
- 10+ years experience required
- Must have CS degree from top university
- Looking for a young, hungry team player

**After:**
- 7+ years experience preferred (or equivalent)
- Strong computer science fundamentals
- Collaborative team member who takes initiative

### 4. Improve Structure

```markdown
## About [Company]
[2-3 sentences about mission and culture]

## What You'll Do
- [Responsibility 1]
- [Responsibility 2]
- [Responsibility 3]

## What We're Looking For
**Required:**
- [Must-have 1]
- [Must-have 2]

**Nice to Have:**
- [Preferred 1]
- [Preferred 2]

## What We Offer
- [Benefit 1]
- [Benefit 2]
- [Compensation range]

## How to Apply
[Clear call to action]
```

### 5. SEO Optimization

- Include searchable job title variations
- Add location keywords
- Use industry-standard terminology
- Include salary for Indeed/LinkedIn boost

## Bias Checklist

| Biased Term | Neutral Alternative |
|-------------|---------------------|
| Ninja/Rockstar | Skilled professional |
| Aggressive | Ambitious, driven |
| Young team | Dynamic team |
| Digital native | Tech-savvy |
| Man-hours | Work hours |
| Manpower | Workforce |
| Chairman | Chairperson |
| He/she | They |

## Example Usage

```
User: Optimize this job posting for Senior Developer

Agent: I've analyzed your job posting. Here's my assessment:

**Current Issues:**
- ❌ Title uses "Rockstar" - may deter qualified candidates
- ❌ Requires 10 years experience for mid-level role
- ❌ "Fast-paced environment" appears 3 times
- ❌ No salary range (reduces applications by 30%)
- ⚠️ Readability: Grade 14 (too complex)

**Optimized Version:**

# Senior Software Engineer - Backend

## About Us
[Company] builds [product] that helps [customers] [benefit].
We're a team of 50 solving [problem] with [technology].

## What You'll Do
- Design and build scalable backend services
- Collaborate with product and frontend teams
- Mentor junior engineers and review code
- Improve system reliability and performance

## What We're Looking For
**Required:**
- 5+ years backend development experience
- Proficiency in Python, Go, or similar
- Experience with distributed systems
- Strong communication skills

**Nice to Have:**
- Experience with Kubernetes
- Background in fintech

## What We Offer
- $150,000 - $200,000 base + equity
- Remote-first with optional SF office
- Unlimited PTO + 16 weeks parental leave
- $2,000 annual learning budget

**Improvements Made:**
- Removed biased language (+15% more diverse applicants)
- Added salary range (+30% more applications)
- Reduced requirements from 8 to 4 must-haves
- Lowered readability to 8th grade level
```

## Integration Points

- **Upstream:** Job requisition creation
- **Downstream:** Post to job boards, ATS listing
- **Triggers:** New job created, posting underperforming
