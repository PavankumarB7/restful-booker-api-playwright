# Bug Reports – Restful Booker

## BUG-API-01: Invalid Date Range Accepted

**Endpoint:** POST /booking

**Steps:**

1. Send POST with checkout date before checkin date

**Expected:**
API rejects with 400 or validation error

**Actual:**
Booking created successfully with 200

**Severity:** Medium
**Priority:** Medium

---

## BUG-API-02: Incorrect HTTP Status Code on Booking Creation

**Endpoint:** POST /booking

**Steps:**

1. Send valid POST payload

**Expected:**
201 Created (REST standard for resource creation)

**Actual:**
200 OK returned

**Severity:** Low
**Priority:** Low

---

## BUG-API-03: Incorrect Status Code for Invalid Booking ID

**Endpoint:** PUT /booking/{id}, PATCH /booking/{id}, DELETE /booking/{id}

**Steps:**

1. Send request with non-existent booking ID (e.g. 999999)

**Expected:**
404 Not Found

**Actual:**
405 Method Not Allowed

**Severity:** Medium
**Priority:** Medium
