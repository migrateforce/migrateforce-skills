---
name: candidate-outreach
description: Craft and send personalized recruitment messages to passive candidates. Use when sourcing talent from LinkedIn, GitHub, or other platforms.
license: MIT
compatibility: claude-code, cursor, cline, windsurf, antigravity, opencode
metadata:
  industry: hr-software
  segment: applicant-tracking
  function: talent-acquisition
  value_driver: revenue
  complexity: low
  source_systems: linkedin, github, greenhouse, ashby
allowed-tools: Read, Write, Edit, WebFetch
---

## Summary

This skill generates personalized, high-converting outreach messages to passive candidates. It researches the candidate's background, finds relevant connection points, and crafts messages that stand out from generic recruiter spam.

## Inputs

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| candidate_profile | object | yes | LinkedIn/GitHub profile data |
| job_opportunity | object | yes | Role being recruited for |
| company_info | object | yes | Company details and selling points |
| outreach_channel | enum | yes | linkedin, email, twitter, github |
| tone | enum | no | professional, casual, technical |
| sequence_stage | number | no | Which follow-up message (1-4) |

## Outputs

| Field | Type | Description |
|-------|------|-------------|
| subject_line | string | Email/InMail subject |
| message_body | text | Personalized outreach message |
| personalization_points | array | Specific details referenced |
| follow_up_date | date | When to send next message |
| ab_variant | string | Which template variant used |

## Workflow

### 1. Research Candidate

**From LinkedIn:**
- Current role and company
- Previous experience
- Education and skills
- Posts and articles
- Mutual connections
- Recent activity

**From GitHub:**
- Popular repositories
- Recent contributions
- Languages and technologies
- Open source involvement

### 2. Find Connection Points

```
PERSONALIZATION HIERARCHY (best to worst):
1. Mutual connection ("Sarah mentioned you...")
2. Their content ("Loved your post on...")
3. Shared experience ("Fellow [school] alum...")
4. Their work ("Your project X is impressive...")
5. Company news ("Congrats on the Series B...")
6. Role relevance ("Your [skill] expertise...")
```

### 3. Craft Message

**Structure:**
1. Personalized hook (why them specifically)
2. Brief company/role intro (1-2 sentences)
3. What's in it for them
4. Soft call to action
5. Easy opt-out

**Length:**
- LinkedIn InMail: 100-150 words
- Email: 150-200 words
- Twitter DM: Under 280 characters

### 4. A/B Variants

Generate 2-3 variants testing:
- Subject lines
- Opening hooks
- Call-to-action phrasing
- Tone (professional vs casual)

### 5. Sequence Planning

| Stage | Timing | Focus |
|-------|--------|-------|
| 1 | Initial | Personalized intro |
| 2 | +3 days | Value add (article, insight) |
| 3 | +7 days | Social proof (team, culture) |
| 4 | +14 days | Final follow-up |

## Message Templates

### Initial Outreach (LinkedIn)

```
Hi [First Name],

[Personalized hook - reference their work/post/project]

I'm reaching out because we're building [brief description] at [Company],
and your experience with [specific skill/project] caught my attention.

We're looking for a [Role] to [key responsibility]. The team includes
[notable person/background], and we just [recent achievement].

Would you be open to a quick call to learn more? No pressure either way.

[Your name]

P.S. [Optional: mutual connection, relevant link, or conversation starter]
```

### Follow-up #1 (Email)

```
Subject: Re: [Original subject]

Hi [First Name],

Wanted to follow up on my note from last week.

I came across [relevant article/resource] and thought you might find it
interesting given your work on [their project].

[Company] is [brief value prop]. We're solving [problem] for [customers].

If you're not looking right now, I completely understand. But if you know
anyone who might be interested, I'd appreciate a referral.

Best,
[Your name]
```

### Breakup Message

```
Subject: Closing the loop

Hi [First Name],

I've reached out a few times about the [Role] opportunity at [Company].
I'll assume the timing isn't right.

If that changes, feel free to reach out. I'd still love to connect.

Wishing you continued success at [Current Company].

[Your name]
```

## Personalization Examples

**Generic (Bad):**
> "I came across your profile and thought you'd be a great fit for our role."

**Personalized (Good):**
> "Your talk at ReactConf on state management was excellent—we're dealing with
> similar complexity at scale. Would love to chat about how you'd approach our
> real-time collaboration challenges."

**Generic (Bad):**
> "We're a fast-growing startup looking for talented engineers."

**Personalized (Good):**
> "We just closed our Series B to build AI tools for recruiters (yes, ironic
> that I'm recruiting you). Your work on the recommendation engine at Spotify
> is exactly what we need."

## Example Usage

```
User: Write outreach for Jane Doe, Staff Engineer at Google, for our Senior Backend role

Agent: I've researched Jane's profile and crafted this outreach:

**Personalization points found:**
- Recent blog post on distributed systems
- Speaker at KubeCon 2024
- Open source contributor to Envoy
- Mutual connection: Mike (our CTO)

**LinkedIn InMail:**

Subject: Your KubeCon talk + a question

Hi Jane,

Your KubeCon talk on service mesh performance was one of the best I've seen—
especially the latency optimization section. We're running into similar
challenges at [Company] as we scale to 10M requests/sec.

Mike Chen (I think you worked together at Stripe?) suggested I reach out.
We're building [product] and looking for a Staff Engineer to lead our
infrastructure team.

The role: own our Kubernetes platform, scale distributed systems,
mentor 5 engineers. Comp: $350-450k total.

Open to a 20-min call next week?

[Your name]

**A/B Variant (more casual):**

Subject: Fellow Envoy contributor here 👋

Hi Jane,

Saw your Envoy PRs on connection pooling—nice work on the memory
optimization. We're heavy Envoy users at [Company] and running into
an interesting challenge you might have thoughts on...

[continues]

**Recommended send time:** Tuesday 10am PST
**Follow-up scheduled:** Friday if no response
```

## Integration Points

- **Upstream:** Sourcing lists, LinkedIn Recruiter, GitHub search
- **Downstream:** ATS candidate creation, `interview-scheduler`
- **Tracking:** Open rates, response rates, conversion to interview
