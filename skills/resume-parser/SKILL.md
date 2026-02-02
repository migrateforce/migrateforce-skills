---
name: resume-parser
description: Extract structured data from resumes in any format (PDF, DOCX, LinkedIn). Use when ingesting candidate applications or building talent databases.
license: MIT
compatibility: claude-code, cursor, cline, windsurf, antigravity, opencode
metadata:
  industry: hr-software
  segment: applicant-tracking
  function: talent-acquisition
  value_driver: efficiency
  complexity: low
  source_systems: greenhouse, ashby, workday, lever
allowed-tools: Read, Write, Edit
---

## Summary

This skill extracts structured, machine-readable data from unstructured resumes. It handles multiple formats (PDF, DOCX, plain text, LinkedIn exports) and normalizes the output for downstream processing like candidate screening or database storage.

## Inputs

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| resume_content | text/file | yes | Raw resume content or file path |
| format | enum | no | pdf, docx, txt, linkedin (auto-detected if not specified) |
| extraction_level | enum | no | basic, standard, detailed (default: standard) |

## Outputs

| Field | Type | Description |
|-------|------|-------------|
| candidate_name | string | Full name |
| email | string | Primary email address |
| phone | string | Phone number (normalized) |
| location | object | City, state, country |
| linkedin_url | string | LinkedIn profile URL |
| summary | string | Professional summary/objective |
| experience | array | Work history with dates, titles, companies, descriptions |
| education | array | Degrees, institutions, dates, GPA |
| skills | array | Technical and soft skills |
| certifications | array | Professional certifications |
| languages | array | Languages and proficiency levels |
| parse_confidence | number | 0-100 confidence score |

## Workflow

### 1. Format Detection
- Identify input format (PDF, DOCX, TXT, LinkedIn JSON)
- Extract raw text using appropriate parser
- Preserve section structure where possible

### 2. Section Identification
Identify standard resume sections:
- Contact Information
- Summary/Objective
- Work Experience
- Education
- Skills
- Certifications
- Projects
- Publications

### 3. Entity Extraction

**Contact Info:**
- Name (handle international name formats)
- Email (validate format)
- Phone (normalize to E.164)
- Location (city, state, country)
- LinkedIn URL

**Experience:**
```
{
  "company": "Acme Corp",
  "title": "Senior Engineer",
  "start_date": "2020-03",
  "end_date": "2023-06",
  "current": false,
  "description": "Led backend team...",
  "achievements": ["Reduced latency 40%", "Mentored 3 juniors"]
}
```

**Education:**
```
{
  "institution": "MIT",
  "degree": "BS",
  "field": "Computer Science",
  "graduation_date": "2018-05",
  "gpa": 3.8
}
```

### 4. Skill Normalization
- Map variations to canonical names (JS → JavaScript)
- Categorize: languages, frameworks, tools, soft skills
- Infer skills from experience descriptions

### 5. Quality Scoring
Calculate parse confidence based on:
- Fields successfully extracted
- Date format consistency
- Section completeness

## Supported Formats

| Format | Support Level | Notes |
|--------|--------------|-------|
| PDF (text) | Full | Standard text-based PDFs |
| PDF (scanned) | Partial | Requires OCR, lower accuracy |
| DOCX | Full | Microsoft Word documents |
| DOC | Full | Legacy Word format |
| TXT | Full | Plain text |
| LinkedIn JSON | Full | LinkedIn data export |
| HTML | Full | Web-based resumes |

## Example Output

```json
{
  "candidate_name": "Sarah Chen",
  "email": "sarah.chen@email.com",
  "phone": "+1-415-555-0123",
  "location": {
    "city": "San Francisco",
    "state": "CA",
    "country": "US"
  },
  "linkedin_url": "linkedin.com/in/sarahchen",
  "summary": "Senior software engineer with 8 years of experience...",
  "experience": [
    {
      "company": "Stripe",
      "title": "Staff Engineer",
      "start_date": "2021-01",
      "end_date": null,
      "current": true,
      "description": "Lead payments infrastructure team",
      "achievements": [
        "Scaled payment processing 10x",
        "Reduced fraud by 30%"
      ]
    }
  ],
  "education": [
    {
      "institution": "Stanford University",
      "degree": "MS",
      "field": "Computer Science",
      "graduation_date": "2015-06"
    }
  ],
  "skills": {
    "languages": ["Python", "Go", "TypeScript"],
    "frameworks": ["Django", "React", "Kubernetes"],
    "tools": ["PostgreSQL", "Redis", "AWS"],
    "soft_skills": ["Leadership", "Mentoring"]
  },
  "certifications": [
    {
      "name": "AWS Solutions Architect",
      "issuer": "Amazon",
      "date": "2022-03"
    }
  ],
  "parse_confidence": 95
}
```

## Error Handling

| Error | Handling |
|-------|----------|
| Unreadable PDF | Return error with suggestion to re-upload |
| Missing contact info | Flag as incomplete, extract what's available |
| Ambiguous dates | Use best guess, flag for review |
| Non-English resume | Attempt extraction, note language |

## Integration Points

- **Upstream:** File uploads, email attachments, ATS imports
- **Downstream:** `candidate-screening`, database storage, search indexing
