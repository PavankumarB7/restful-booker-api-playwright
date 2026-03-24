# API Test Cases – Restful Booker

## TC-API-01: Create Booking (Valid Data)

**Preconditions:**

- API is available

**Request:**
POST /booking

**Expected Result:**

- Status: 200
- bookingid generated
- Response matches payload

---

## TC-API-02: Get Booking by ID

**Steps:**

1. Create booking
2. Fetch using ID

**Expected Result:**

- Status: 200
- Correct booking details returned

---

## TC-API-03: Update Booking Without Auth

**Steps:**

1. Create booking
2. Send PUT request without token

**Expected Result:**

- Status: 403 Forbidden

---

## TC-API-04: Delete Booking (Valid Token)

**Steps:**

1. Create booking
2. Delete with valid token
3. GET deleted booking

**Expected Result:**

- Delete status: 201
- GET after delete returns 404
