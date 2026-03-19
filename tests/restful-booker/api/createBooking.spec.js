import { test, expect } from "../../../fixtures/bookingFixtures";
import { createBookingPayload } from "../../../test-data/restful-booker/bookingPayload";
import { assertBookingCreated } from "../../../api/restful-booker/bookingAssertions";

test("Create booking successfully", async ({ bookingClient }) => {
  const payload = createBookingPayload();

  const response = await bookingClient.createBooking(payload);

  expect(response.status()).toBe(200);

  const body = await response.json();

  assertBookingCreated(body, payload);
});
