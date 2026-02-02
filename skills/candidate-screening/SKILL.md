---
name: candidate-screening
description: Screen and rank job applicants against a job description, summarize top candidates, and flag potential concerns. Use when reviewing large applicant pools from ATS systems like Greenhouse, Ashby, or Workday.
license: MIT
compatibility: claude-code, cursor, cline, windsurf, antigravity, opencode
metadata:
  industry: hr-software
  segment: applicant-tracking
  function: talent-acquisition
  value_driver: efficiency
  complexity: medium
  source_systems: greenhouse, ashby, workday, lever, icims
allowed-tools: Read, Write, Edit, WebFetch
---

## Summary

This skill enables AI agents to screen large volumes of job applicants efficiently. Instead of manually reviewing 500 resumes, the agent reads all applications, scores them against the job requirements, and produces a ranked shortlist with summaries.

**The Problem:** Recruiters spend 23 hours per hire just screening resumes. With 250+ applications per corporate job, most qualified candidates are never seen.

**The Solution:** Agent reads every application, scores against JD, surfaces the top 10% with 3-bullet summaries.

## Inputs

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| job_description | text | yes | Full job description with requirements, responsibilities, qualifications |
| candidates | array | yes | List of candidate objects with resume/application data |
| ranking_threshold | number | no | Percentage of candidates to include in shortlist (default: 10) |
| must_have_skills | array | no | Non-negotiable skills/qualifications |
| nice_to_have_skills | array | no | Preferred but optional qualifications |
| location_preference | string | no | Required location or "remote" |
| experience_range | object | no | Min/max years of experience |

## Outputs

| Field | Type | Description |
|-------|------|-------------|
| ranked_candidates | array | Candidates sorted by match score (highest first) |
| candidate_summaries | array | 3-bullet summaries for shortlisted candidates |
| screening_flags | array | Concerns or notes (gaps, job hopping, missing skills) |
| match_scores | object | Detailed scoring breakdown per candidate |
| recommendation | text | Overall hiring recommendation |

## Workflow

### 1. Parse Job Requirements

Extract from job description:
- Required skills and qualifications
- Years of experience needed
- Education requirements
- Location/remote preferences
- Compensation range (if mentioned)

### 2. Normalize Candidate Data

For each candidate:
- Extract structured data from resume
- Identify skills, experience, education
- Calculate tenure at previous roles
- Note employment gaps

### 3. Score Candidates

Apply scoring rubric:
- **Skills Match (40%):** Required skills present
- **Experience Match (25%):** Years and relevance
- **Education Match (15%):** Degree and field
- **Culture Signals (10%):** Values alignment indicators
- **Red Flags (-10%):** Job hopping, gaps, inconsistencies

### 4. Generate Shortlist

- Rank all candidates by total score
- Select top N% based on threshold
- Generate 3-bullet summary for each:
  1. Strongest qualification
  2. Relevant experience highlight
  3. Potential concern or standout factor

### 5. Produce Report

Output structured report with:
- Ranked shortlist with summaries
- Full scoring breakdown
- Flagged concerns
- Recommended next steps

## Scoring Rubric

```
SCORE RANGES:
90-100: Strong match - Recommend immediate interview
80-89:  Good match - Recommend phone screen
70-79:  Potential match - Review manually
60-69:  Weak match - Only if pipeline thin
<60:    No match - Do not proceed

RED FLAGS (auto-deduct points):
- 3+ jobs in 2 years: -10 points
- Employment gap >6mo unexplained: -5 points
- Missing required skill: -15 points per skill
- Overqualified (may not stay): -5 points
```

## Integration Points

### Source Systems
- **Greenhouse:** `GET /v1/candidates`, `GET /v1/applications`
- **Ashby:** `GET /candidate.list`, `GET /application.list`
- **Workday:** Recruiting API endpoints
- **Lever:** `GET /v1/opportunities`
- **iCIMS:** Platform Connect API

### Triggers
- New job posted with 50+ applicants
- Daily digest request
- Manual "screen this role" command

### Downstream Skills
- `interview-scheduler` - Schedule interviews for shortlisted candidates
- `candidate-outreach` - Send personalized messages to top candidates
- `offer-letter-generator` - Generate offers for selected candidates

## Example Usage

```
User: Screen the applicants for the Senior Engineer role

Agent: I'll screen all 247 applicants for the Senior Software Engineer position.

[Processing 247 resumes...]

## Screening Complete

**Top 10% Candidates (25 of 247):**

### 1. Sarah Chen - Score: 94/100
- 8 years Python/Django experience at scale (Netflix, Stripe)
- Led team of 6, shipped 3 major products
- Based in SF, open to hybrid

### 2. Marcus Johnson - Score: 91/100
- Ex-Google Staff Engineer, distributed systems expert
- Perfect skills match, strong system design
- ⚠️ May be overqualified for IC role

### 3. Priya Patel - Score: 89/100
- 5 years backend, promoted twice at current company
- Missing Kubernetes experience (trainable)
- Strong referral from current employee

[... 22 more candidates ...]

**Recommended Action:** Schedule phone screens with top 10 candidates this week.

**Flagged for Review:**
- 12 candidates in "potential match" range (70-79)
- 3 candidates flagged for job hopping pattern
```

## Compliance Notes

- Do not use protected characteristics in scoring (age, gender, race, disability)
- Document scoring rationale for audit trail
- Allow candidates to request explanation of decision
- Retain screening data per local data retention laws
- EEOC/OFCCP compliance: Ensure consistent criteria across all candidates
