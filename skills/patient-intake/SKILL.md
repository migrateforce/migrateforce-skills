---
name: patient-intake
description: Collect and validate patient information during medical intake process. Use when a healthcare provider needs to gather patient demographics, medical history, insurance information, and consent forms in a structured workflow.
license: MIT
compatibility: claude-code, claude-desktop, any-mcp-client
metadata:
  industry: healthcare
  segment: clinical-operations
  function: patient-services
  value_driver: efficiency
  complexity: medium
  derived_from: use_case
allowed-tools: Read, Write, Edit, Bash
---

## Summary

This skill guides agents through the patient intake process, ensuring complete and accurate data collection while maintaining HIPAA compliance. The skill handles:

- Patient demographics collection
- Medical history documentation
- Insurance verification
- Consent form management
- Appointment scheduling coordination

## Inputs

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| patient_name | string | yes | Full legal name |
| date_of_birth | date | yes | DOB in YYYY-MM-DD format |
| ssn_last_four | string | no | Last 4 digits of SSN |
| insurance_provider | string | no | Primary insurance |
| policy_number | string | no | Insurance policy number |
| chief_complaint | string | yes | Reason for visit |

## Outputs

| Field | Type | Description |
|-------|------|-------------|
| intake_form_id | string | Unique identifier for the completed intake |
| validation_status | enum | 'complete' | 'incomplete' | 'needs_review' |
| missing_fields | array | List of fields that need completion |
| next_steps | array | Recommended follow-up actions |

## Workflow

1. **Greet and Identify**
   - Verify patient identity with name and DOB
   - Check for existing records in the system

2. **Collect Demographics**
   - Full legal name
   - Date of birth
   - Contact information (phone, email, address)
   - Emergency contact

3. **Medical History**
   - Current medications
   - Known allergies
   - Previous surgeries
   - Family medical history
   - Current conditions

4. **Insurance Verification**
   - Insurance provider and policy number
   - Group number if applicable
   - Verify coverage eligibility

5. **Consent and Compliance**
   - HIPAA acknowledgment
   - Treatment consent
   - Financial responsibility agreement

6. **Validation and Summary**
   - Review all collected information
   - Flag missing or inconsistent data
   - Generate intake summary

## Compliance Notes

- Never store full SSN - only last 4 digits if needed
- All PHI must be transmitted securely
- Maintain audit trail of all data access
- Patient can request data deletion per HIPAA rights

## Example Usage

```
Agent: I'll help you complete the patient intake. Let me start by collecting some basic information.

Agent: What is the patient's full legal name?
User: John Michael Smith

Agent: And their date of birth?
User: March 15, 1985

Agent: What is the primary reason for today's visit?
User: Annual physical exam and blood pressure check
```
