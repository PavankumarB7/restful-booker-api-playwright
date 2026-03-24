# API Test Scenarios – Restful Booker

## Booking API Coverage

| ID        | Scenario                                         | Method               | Type     | Priority |
| --------- | ------------------------------------------------ | -------------------- | -------- | -------- |
| API-TS-01 | Validate authentication with valid credentials   | POST /auth           | Positive | High     |
| API-TS-02 | Validate authentication with invalid credentials | POST /auth           | Negative | High     |
| API-TS-03 | Create booking with valid payload                | POST /booking        | Positive | High     |
| API-TS-04 | Create booking with missing required fields      | POST /booking        | Negative | High     |
| API-TS-05 | Retrieve booking by valid ID                     | GET /booking/{id}    | Positive | High     |
| API-TS-06 | Retrieve booking with invalid ID                 | GET /booking/{id}    | Negative | Medium   |
| API-TS-07 | Search booking by name                           | GET /booking         | Positive | Medium   |
| API-TS-08 | Search booking with no results                   | GET /booking         | Negative | Medium   |
| API-TS-09 | Update booking with valid token                  | PUT /booking/{id}    | Positive | High     |
| API-TS-10 | Update booking without auth token                | PUT /booking/{id}    | Security | High     |
| API-TS-11 | Update booking with invalid ID                   | PUT /booking/{id}    | Negative | Medium   |
| API-TS-12 | Partial update booking with valid data           | PATCH /booking/{id}  | Positive | Medium   |
| API-TS-13 | Partial update without auth                      | PATCH /booking/{id}  | Security | High     |
| API-TS-14 | Delete booking with valid token                  | DELETE /booking/{id} | Positive | High     |
| API-TS-15 | Delete booking without auth token                | DELETE /booking/{id} | Security | High     |
| API-TS-16 | Delete booking with invalid ID                   | DELETE /booking/{id} | Negative | Medium   |
| API-TS-17 | Verify complete booking lifecycle                | Multiple             | E2E      | High     |
