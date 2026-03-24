# API Test Coverage – Restful Booker

## Covered

- Booking creation (valid & invalid)
- Booking retrieval
- Booking update (full & partial)
- Booking deletion
- Authentication validation

## Test Types

- Positive testing
- Negative testing
- Security testing
- Edge case testing
- End-to-end testing

## Key Defects Identified

- Invalid date range accepted without validation (checkout before checkin returns 200)
- POST /booking returns 200 instead of 201 (REST standard violation)
- Invalid booking ID returns 405 instead of 404 on PUT, PATCH, DELETE

## Not Covered

- Performance testing
- Load testing
- Rate limiting

**Reason:**
Focused on functional validation and defect detection
