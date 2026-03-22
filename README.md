# Restful Booker API Test Suite

Automated API test suite for the [Restful Booker](https://restful-booker.herokuapp.com) API built with Playwright and JavaScript.

---

## Tech Stack

- [Playwright](https://playwright.dev/) — API testing framework
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) — test language
- [Faker.js](https://fakerjs.dev/) — dynamic test data generation
- [Luxon](https://moment.github.io/luxon/) — date formatting for booking payloads

---

## Project Structure

```
playwright-automation-framework/
├── api/
│   └── restful-booker/
│       ├── bookingClient.js       # Central API client — all HTTP methods
│       └── bookingAssertions.js   # Reusable assertion helper functions
├── fixtures/
│   └── bookingFixtures.js         # Custom Playwright fixtures for client and auth token
├── test-data/
│   └── restful-booker/
│       └── bookingPayload.js      # Dynamic booking payload using Faker.js
└── tests/
    └── restful-booker/
        └── api/                   # All 17 test spec files
```

---

## Setup & Installation

**1. Clone the repository**

```bash
git clone https://github.com/PavankumarB7/playwright-automation-framework.git
cd playwright-automation-framework
```

**2. Install dependencies**

```bash
npm install
```

**3. Install Playwright browsers**

```bash
npx playwright install
```

**4. Set environment variables**

Create a `.env` file in the root:

```
BASE_URL=https://restful-booker.herokuapp.com
BOOKING_USERNAME=your_username
BOOKING_PASSWORD=your_password
```

---

## How to Run Tests

**Run all Restful Booker tests:**

```bash
npx playwright test tests/restful-booker
```

**Run a specific test file:**

```bash
npx playwright test tests/restful-booker/api/createBooking.spec.js
```

**Run with HTML report:**

```bash
npx playwright test tests/restful-booker --reporter=html
```

---

## Test Coverage

17 tests across all API endpoints.

| #   | Test File                            | What It Tests                                      |
| --- | ------------------------------------ | -------------------------------------------------- |
| 1   | `authPositive.spec.js`               | Valid credentials return a token                   |
| 2   | `authNegative.spec.js`               | Invalid credentials return "Bad credentials"       |
| 3   | `createBooking.spec.js`              | Create booking — happy path                        |
| 4   | `createBookingMissingFields.spec.js` | Missing firstname, lastname, totalprice return 500 |
| 5   | `getBooking.spec.js`                 | Get booking by ID — happy path                     |
| 6   | `getBookingNotFound.spec.js`         | Get non-existent booking ID returns 404            |
| 7   | `searchBooking.spec.js`              | Search by name returns matching booking ID         |
| 8   | `searchBookingNoResults.spec.js`     | Search with no match returns empty array           |
| 9   | `updateBooking.spec.js`              | Full update with valid token — happy path          |
| 10  | `updateWithoutAuth.spec.js`          | Update without token returns 403                   |
| 11  | `updateBookingInvalidId.spec.js`     | Update non-existent booking ID returns 405         |
| 12  | `partialUpdateBooking.spec.js`       | Partial update firstname — happy path              |
| 13  | `partialUpdateInvalidId.spec.js`     | Partial update non-existent ID returns 405         |
| 14  | `patchWithoutAuth.spec.js`           | Partial update without token returns 403           |
| 15  | `deleteBooking.spec.js`              | Delete booking and verify 404 on GET               |
| 16  | `deleteInvalidBooking.spec.js`       | Delete non-existent booking ID returns 405         |
| 17  | `bookingFlow.spec.js`                | Full lifecycle — Create → GET → PUT → DELETE       |

---

## Framework Design Decisions

### BookingClient (`bookingClient.js`)

All API calls go through a single client class. This means if the base URL, headers, or auth method ever changes, it only needs updating in one place — not across every test file.

### Auth Token Fixture (`bookingFixtures.js`)

Instead of calling `getAuthToken()` manually in every test that needs auth, a custom Playwright fixture injects `bookingClient` and `authToken` directly into the test. This removes repetition and keeps tests focused on what they're testing, not setup boilerplate.

```javascript
// without fixture — repeated in every test
const bookingClient = new BookingClient(request);
const token = await bookingClient.getAuthToken();

// with fixture — injected automatically
async({ bookingClient, authToken });
```

### Assertions Helper (`bookingAssertions.js`)

Reusable assertion functions replace repeated `expect` calls across tests. Each function has a clear name that describes what it's checking, making test failures easier to read and understand.

```javascript
// without helper — repeated across multiple tests
expect(body.firstname).toBe(payload.firstname);
expect(body.lastname).toBe(payload.lastname);
expect(body.totalprice).toBe(payload.totalprice);

// with helper — one line
assertBookingDetails(body, payload);
```

---

## Known API Bugs

These are bugs identified in the Restful Booker API during test development:

**1. Invalid date range accepted**
`POST /booking` with `checkout` before `checkin` returns `200 OK` instead of rejecting the request. The API does not validate date ranges.

**2. POST /booking returns 200 instead of 201**
Creating a new resource should return `201 Created` per REST standards. This API returns `200 OK`.

**3. Invalid booking ID returns 405 instead of 404**
`PUT`, `PATCH`, and `DELETE` requests on a non-existent booking ID return `405 Method Not Allowed` instead of `404 Not Found`.
