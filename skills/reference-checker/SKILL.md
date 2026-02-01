---
name: reference-checker
description: Conduct and document professional reference checks for final-stage candidates. Use when verifying candidate backgrounds before extending offers.
license: MIT
compatibility: claude-code, cursor, cline, windsurf
metadata:
  industry: hr-software
  segment: applicant-tracking
  function: talent-acquisition
  value_driver: efficiency
  complexity: medium
  source_systems: greenhouse, ashby, workday, checkr
allowed-tools: Read, Write, Edit, WebFetch
---

## Summary

This skill streamlines the reference check process by generating structured questionnaires, scheduling calls with references, documenting responses, and synthesizing findings into actionable hiring recommendations.

## Inputs

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| candidate_name | string | yes | Candidate being evaluated |
| job_title | string | yes | Role they're being considered for |
| references | array | yes | List of reference contacts |
| key_competencies | array | yes | Skills/behaviors to verify |
| concerns | array | no | Specific areas to probe |
| check_type | enum | no | standard, executive, technical |

## Outputs

| Field | Type | Description |
|-------|------|-------------|
| reference_summaries | array | Summary from each reference |
| competency_scores | object | Rating per competency |
| red_flags | array | Concerns identified |
| recommendation | enum | strong_hire, hire, no_hire, needs_discussion |
| full_report | document | Complete reference check report |

## Workflow

### 1. Prepare Questions

**Standard Questions:**
1. How do you know [candidate]? What was your working relationship?
2. What were their primary responsibilities?
3. What are their greatest strengths?
4. What areas could they improve?
5. How did they handle [specific situation relevant to role]?
6. Would you rehire them? Why or why not?

**Role-Specific Questions:**
- Technical: Code quality, system design, debugging approach
- Leadership: Team management, conflict resolution, decision making
- Sales: Deal closing, relationship building, quota attainment

### 2. Contact References

**Outreach Email:**
```
Subject: Reference Request for [Candidate Name]

Dear [Reference Name],

[Candidate] has applied for a [Role] position at [Company] and provided
your name as a professional reference.

We'd appreciate 15 minutes of your time to discuss their qualifications.
Would any of these times work?

[Time slot 1]
[Time slot 2]
[Time slot 3]

If you prefer, you can complete a brief written questionnaire instead: [link]

Thank you for your time.

[Recruiter name]
```

### 3. Conduct Reference Call

**Call Structure (15 min):**
- 2 min: Introduction and context
- 3 min: Relationship and role verification
- 5 min: Core competency questions
- 3 min: Concerns and red flags
- 2 min: Final recommendation question

**Probing Techniques:**
- "Can you give me a specific example?"
- "How did that compare to others in similar roles?"
- "What happened as a result?"
- "If you could change one thing..."

### 4. Document Responses

```json
{
  "reference_name": "Jane Smith",
  "relationship": "Direct manager, 2 years",
  "company": "Previous Corp",
  "date_checked": "2025-02-01",
  "responses": {
    "strengths": ["Technical depth", "Mentorship"],
    "growth_areas": ["Public speaking", "Delegation"],
    "specific_example": "Led migration project...",
    "would_rehire": true,
    "rehire_enthusiasm": "Absolutely, without hesitation"
  },
  "overall_sentiment": "strongly_positive"
}
```

### 5. Synthesize Findings

**Competency Matrix:**
| Competency | Ref 1 | Ref 2 | Ref 3 | Avg |
|------------|-------|-------|-------|-----|
| Technical Skills | 5 | 5 | 4 | 4.7 |
| Communication | 4 | 4 | 5 | 4.3 |
| Leadership | 3 | 4 | 4 | 3.7 |
| Reliability | 5 | 5 | 5 | 5.0 |

**Red Flag Categories:**
- 🔴 Critical: Integrity issues, termination for cause
- 🟡 Caution: Performance concerns, interpersonal issues
- 🟢 Minor: Developmental areas, normal growth needs

## Reference Check Report

```markdown
# Reference Check Report

**Candidate:** [Name]
**Position:** [Role]
**Date:** [Date]
**Checked by:** [Recruiter]

## Summary
[2-3 sentence executive summary]

## References Contacted

### Reference 1: Jane Smith
- **Relationship:** Direct manager (2019-2021)
- **Company:** Previous Corp
- **Key Feedback:** [Summary]
- **Sentiment:** ⭐⭐⭐⭐⭐ Strongly Positive

### Reference 2: Mike Johnson
[...]

## Competency Assessment

| Competency | Rating | Evidence |
|------------|--------|----------|
| Technical | 4.7/5 | "Strongest engineer on the team" |
| Leadership | 3.7/5 | "Growing into leadership role" |

## Themes

**Consistent Strengths:**
- [Strength 1]
- [Strength 2]

**Development Areas:**
- [Area 1]
- [Area 2]

## Red Flags
[None identified / List any concerns]

## Recommendation
☑️ **STRONG HIRE** - All references enthusiastic, no concerns raised

## Raw Notes
[Detailed call notes appended]
```

## Example Usage

```
User: Run reference checks for David Kim, final candidate for Engineering Manager

Agent: I'll conduct reference checks for David Kim.

**References provided:**
1. Sarah Chen - Former director at TechCo
2. Mike Park - Peer engineer at TechCo
3. Lisa Wang - Direct report at TechCo

**Key competencies to verify:**
- Technical leadership
- People management
- Cross-functional collaboration
- Conflict resolution

**Outreach sent:** Feb 1, 2025

---

**Reference Check Complete**

## Summary
David receives strong endorsements from all three references. Former director
describes him as "top 10% of engineering managers I've worked with." Direct
report highlights his mentorship. One note: peer mentioned he can be
"too detail-oriented" in code reviews.

## Scores
- Technical Leadership: 4.8/5
- People Management: 4.5/5
- Collaboration: 4.3/5
- Conflict Resolution: 4.0/5

## Key Quotes
> "David turned around a struggling team in 6 months. Retention went from
> 40% to 90%." - Sarah Chen

> "Best manager I've had. He genuinely cared about my growth." - Lisa Wang

## Recommendation
✅ **STRONG HIRE**

No red flags. Consistent positive feedback across all references.
Minor development area (code review thoroughness) is actually a strength
for a management role.
```

## Compliance Notes

- Only ask job-related questions
- Don't ask about protected characteristics
- Document consistently across all candidates
- Some states restrict what references can disclose
- Keep records per data retention policy

## Integration Points

- **Upstream:** Final interview stage, `candidate-screening`
- **Downstream:** `offer-letter-generator`, hiring decision
- **Background check:** Pair with formal background check services (Checkr, Sterling)
