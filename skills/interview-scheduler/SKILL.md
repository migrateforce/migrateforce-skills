---
name: interview-scheduler
description: Coordinate and schedule interviews between candidates and hiring teams. Use when booking phone screens, technical interviews, or panel interviews across multiple calendars.
license: MIT
compatibility: claude-code, cursor, cline, windsurf
metadata:
  industry: hr-software
  segment: applicant-tracking
  function: talent-acquisition
  value_driver: efficiency
  complexity: medium
  source_systems: greenhouse, ashby, calendly, google-calendar
allowed-tools: Read, Write, Edit, WebFetch
---

## Summary

This skill automates the interview scheduling process by finding available time slots across candidate and interviewer calendars, sending invites, and handling rescheduling requests. Eliminates the back-and-forth email chains that typically take 3-5 days.

## Inputs

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| candidate | object | yes | Candidate info (name, email, timezone) |
| interviewers | array | yes | List of interviewer emails |
| interview_type | enum | yes | phone_screen, technical, behavioral, panel, onsite |
| duration_minutes | number | yes | Interview length (30, 45, 60, 90) |
| date_range | object | no | Start and end dates to search (default: next 2 weeks) |
| candidate_availability | array | no | Pre-provided available slots |
| priority | enum | no | normal, urgent, flexible |
| location | string | no | Office location, video link, or "remote" |

## Outputs

| Field | Type | Description |
|-------|------|-------------|
| scheduled_time | datetime | Confirmed interview time |
| calendar_event_id | string | Calendar event identifier |
| video_link | string | Zoom/Meet/Teams link |
| confirmation_sent | boolean | Whether invites were sent |
| interviewer_conflicts | array | Any interviewers who couldn't make it |

## Workflow

### 1. Gather Availability

**Candidate:**
- Check provided availability windows
- Or send availability request email
- Account for timezone differences

**Interviewers:**
- Query calendar APIs (Google, Outlook)
- Respect working hours preferences
- Check for conflicts and blocked time

### 2. Find Optimal Slots

```
SCORING CRITERIA:
- All required interviewers available: +50
- Within candidate's preferred times: +20
- Not during lunch (12-1pm): +10
- Not first/last hour of day: +10
- Adequate prep time between interviews: +10
```

### 3. Present Options

Offer candidate 3 time slots:
1. Best overall match
2. Earliest available
3. Most convenient for candidate timezone

### 4. Confirm and Book

- Create calendar events for all participants
- Generate video conference link
- Send confirmation emails with:
  - Date/time in recipient's timezone
  - Video link and dial-in
  - Interview format and duration
  - Interviewer names and roles
  - Prep materials (if any)

### 5. Handle Changes

**Reschedule requests:**
- Find new available slots
- Update all calendar events
- Send updated invites

**Cancellations:**
- Remove calendar events
- Notify all participants
- Log reason if provided

## Interview Types

| Type | Duration | Participants | Notes |
|------|----------|--------------|-------|
| Phone Screen | 30 min | 1 recruiter | Initial qualification |
| Technical | 60-90 min | 1-2 engineers | Coding/system design |
| Behavioral | 45-60 min | 1 hiring manager | Culture fit |
| Panel | 60 min | 3-5 interviewers | Multiple perspectives |
| Onsite | 4-6 hours | 5-8 interviewers | Full interview loop |

## Calendar Integrations

| Platform | API | Capabilities |
|----------|-----|--------------|
| Google Calendar | Calendar API v3 | Full read/write |
| Microsoft 365 | Graph API | Full read/write |
| Calendly | REST API | Availability only |
| Zoom | REST API | Meeting creation |

## Example Usage

```
User: Schedule a technical interview for Sarah Chen with the backend team

Agent: I'll schedule a technical interview for Sarah Chen.

**Checking availability...**
- Sarah Chen (PST): Available Mon-Wed afternoons
- Mike (interviewer, EST): Available all week
- Lisa (interviewer, EST): Blocked Mon, available Tue-Fri

**Recommended slots:**
1. Tuesday 2:00 PM PST / 5:00 PM EST (60 min) ⭐ Best match
2. Wednesday 1:00 PM PST / 4:00 PM EST (60 min)
3. Wednesday 3:00 PM PST / 6:00 PM EST (60 min)

User: Book option 1

Agent: ✓ Interview scheduled

**Details:**
- Date: Tuesday, Feb 4, 2025
- Time: 2:00 PM PST / 5:00 PM EST
- Duration: 60 minutes
- Interviewers: Mike (System Design), Lisa (Coding)
- Location: Zoom (link in invite)

Calendar invites sent to:
- sarah.chen@email.com
- mike@company.com
- lisa@company.com
```

## Email Templates

### Availability Request
```
Subject: Interview Availability - [Company] [Role]

Hi [Candidate],

We'd like to schedule your [interview_type] interview for the [role] position.

Please share your availability for the next two weeks:
[Calendly link or reply with times]

The interview will be [duration] minutes via [video/phone/onsite].

Best,
[Recruiter]
```

### Confirmation
```
Subject: Interview Confirmed - [Date] at [Time]

Hi [Candidate],

Your interview is confirmed:

📅 [Day], [Date]
🕐 [Time] [Timezone]
⏱️ [Duration] minutes
📍 [Location/Video Link]

You'll be meeting with:
- [Interviewer 1], [Title]
- [Interviewer 2], [Title]

[Prep instructions if any]

Good luck!
[Recruiter]
```

## Integration Points

- **Upstream:** `candidate-screening` (shortlisted candidates)
- **Downstream:** `interview-feedback`, `offer-letter-generator`
- **Triggers:** Candidate moved to "Schedule Interview" stage in ATS
