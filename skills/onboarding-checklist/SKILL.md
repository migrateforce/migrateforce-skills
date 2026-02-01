---
name: onboarding-checklist
description: Generate and track new hire onboarding tasks across HR, IT, and team systems. Use when preparing for a new employee's first day and first 90 days.
license: MIT
compatibility: claude-code, cursor, cline, windsurf
metadata:
  industry: hr-software
  segment: applicant-tracking
  function: talent-acquisition
  value_driver: efficiency
  complexity: medium
  source_systems: rippling, workday, bamboohr, okta
allowed-tools: Read, Write, Edit
---

## Summary

This skill creates comprehensive onboarding checklists for new hires, assigns tasks to relevant stakeholders (HR, IT, hiring manager), tracks completion, and ensures nothing falls through the cracks during the critical first 90 days.

## Inputs

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| employee_name | string | yes | New hire's name |
| job_title | string | yes | Position |
| department | string | yes | Team/department |
| manager_name | string | yes | Reporting manager |
| start_date | date | yes | First day of work |
| location | string | yes | Office location or "Remote" |
| equipment_needs | array | no | Laptop, monitors, etc. |
| system_access | array | no | Required software/systems |
| buddy_name | string | no | Assigned onboarding buddy |

## Outputs

| Field | Type | Description |
|-------|------|-------------|
| checklist | array | Full onboarding task list |
| timeline | object | Tasks organized by day/week |
| stakeholder_tasks | object | Tasks grouped by owner |
| calendar_events | array | Suggested calendar blocks |
| completion_tracker | object | Progress tracking dashboard |

## Workflow

### 1. Generate Pre-Start Tasks (Before Day 1)

**HR Tasks (-2 weeks):**
- [ ] Send offer letter and collect signed copy
- [ ] Initiate background check
- [ ] Send new hire paperwork (I-9, W-4, direct deposit)
- [ ] Add to HRIS system
- [ ] Set up payroll
- [ ] Enroll in benefits (if applicable)
- [ ] Order welcome swag

**IT Tasks (-1 week):**
- [ ] Provision laptop/equipment
- [ ] Create email account
- [ ] Set up SSO/Okta account
- [ ] Add to required Slack channels
- [ ] Grant system access (list per role)
- [ ] Ship equipment (if remote)

**Manager Tasks (-1 week):**
- [ ] Prepare 30/60/90 day plan
- [ ] Schedule first week meetings
- [ ] Assign onboarding buddy
- [ ] Notify team of new hire
- [ ] Prepare desk/workspace (if office)

### 2. Generate Day 1 Agenda

```
NEW HIRE DAY 1 SCHEDULE
─────────────────────────

9:00 AM   Welcome meeting with HR
          - Office tour / remote setup check
          - Paperwork completion
          - Benefits overview

10:00 AM  IT setup session
          - Laptop configuration
          - Software installation
          - Security training

11:00 AM  Meet your manager
          - Role expectations
          - 30/60/90 day plan review
          - Questions

12:00 PM  Lunch with team
          (Manager or buddy hosts)

1:30 PM   Meet the team
          - Introductions
          - Team structure overview
          - Current projects

3:00 PM   Buddy check-in
          - Answer questions
          - Slack/tools walkthrough

4:00 PM   Self-paced: Review documentation
          - Company wiki
          - Team docs
          - Product overview

4:30 PM   End-of-day check-in with manager
          - Questions
          - Tomorrow's plan
```

### 3. Generate Week 1 Tasks

**New Hire Tasks:**
- [ ] Complete all HR paperwork
- [ ] Finish security/compliance training
- [ ] Set up all required tools
- [ ] Read team documentation
- [ ] 1:1s with each team member
- [ ] Shadow key meetings
- [ ] Review codebase/product (role-specific)

**Manager Tasks:**
- [ ] Daily check-in (15 min)
- [ ] Introduce to cross-functional partners
- [ ] Assign first small task
- [ ] Share context documents
- [ ] Schedule recurring 1:1

### 4. Generate 30/60/90 Day Milestones

**30 Days - Learning:**
- Understand product/codebase
- Complete all training
- Ship first small contribution
- Build relationships with team
- Identify questions and gaps

**60 Days - Contributing:**
- Own a medium-sized project
- Participate in team rituals
- Provide first feedback/ideas
- Demonstrate core competencies
- Minimal hand-holding needed

**90 Days - Performing:**
- Deliver meaningful results
- Work independently
- Contribute to team decisions
- Identify improvement areas
- Ready for performance goals

### 5. Track Completion

```
ONBOARDING PROGRESS: David Kim
──────────────────────────────

Pre-Start   ████████████████████ 100%
Week 1      ████████████░░░░░░░░  60%
30-Day      ████░░░░░░░░░░░░░░░░  20%
60-Day      ░░░░░░░░░░░░░░░░░░░░   0%
90-Day      ░░░░░░░░░░░░░░░░░░░░   0%

BLOCKERS:
⚠️ IT: Laptop delayed (ETA: Feb 3)
⚠️ HR: Benefits enrollment pending

UPCOMING:
📅 Feb 3: Team sync (first attendance)
📅 Feb 5: 30-day check-in with manager
```

## Checklist Templates by Role

### Engineering

| Task | Owner | Due |
|------|-------|-----|
| GitHub access | IT | Day -3 |
| Dev environment setup | IT | Day 1 |
| Code review training | Buddy | Week 1 |
| Architecture overview | Tech Lead | Week 1 |
| First PR merged | New Hire | Week 2 |
| On-call shadow | Team | Week 3 |

### Sales

| Task | Owner | Due |
|------|-------|-----|
| Salesforce access | IT | Day -3 |
| Product demo training | Enablement | Week 1 |
| Shadow 3 sales calls | Manager | Week 1-2 |
| First solo demo | New Hire | Week 3 |
| Assigned territory | Manager | Week 4 |

### Marketing

| Task | Owner | Due |
|------|-------|-----|
| Brand guidelines review | New Hire | Week 1 |
| Tool access (HubSpot, etc) | IT | Day 1 |
| Campaign review meeting | Manager | Week 1 |
| First content piece | New Hire | Week 2 |

## Example Usage

```
User: Create onboarding checklist for Sarah Chen, starting Feb 3 as Senior Engineer

Agent: I've generated the onboarding plan for Sarah Chen.

**Onboarding Summary:**
- Employee: Sarah Chen
- Role: Senior Software Engineer
- Manager: David Kim
- Start Date: February 3, 2025
- Location: Remote (San Francisco)
- Buddy: Mike Johnson

**Pre-Start Tasks (7 items):**

HR Tasks:
- [x] Offer letter signed
- [x] Background check complete
- [ ] Benefits enrollment (due: Feb 1)
- [x] Payroll setup

IT Tasks:
- [x] MacBook Pro ordered (ships Feb 1)
- [x] Email: sarah.chen@company.com
- [ ] GitHub org invite (pending)
- [ ] Okta SSO setup (pending)

Manager Tasks:
- [x] 30/60/90 plan drafted
- [x] Mike assigned as buddy
- [ ] Team notified (send today)

**Day 1 Calendar:**
[Calendar events created in Google Calendar]

9:00 AM - Welcome with HR (Zoom)
10:00 AM - IT Setup Session
11:00 AM - 1:1 with David Kim
12:00 PM - Virtual lunch with team
2:00 PM - Engineering orientation
4:00 PM - Buddy sync with Mike

**Week 1 Goals:**
- Complete security training
- Dev environment running
- Review backend codebase
- Ship first commit (bug fix)

**Tracking Dashboard:** [Link]
```

## Integration Points

- **Upstream:** `offer-letter-generator`, accepted offer
- **Systems:** HRIS (Rippling, Workday), IT (Okta, Jamf), Communication (Slack)
- **Calendar:** Google Calendar, Outlook
- **Downstream:** Performance management, regular 1:1s
