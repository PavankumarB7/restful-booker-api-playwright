import { test, expect } from "../../../fixtures/bookingFixtures";
import { createBookingPayload } from "../../../test-data/restful-booker/bookingPayload";
import { assertBookingDetails } from "../../../api/restful-booker/bookingAssertions";

test("Get booking by ID successfully", async ({ bookingClient }) => {
  const payload = createBookingPayload();

  // Create booking first
  const createResponse = await bookingClient.createBooking(payload);
  expect(createResponse.status()).toBe(200);

  const createBody = await createResponse.json();

  const bookingId = createBody.bookingid;

  // Now get the booking
  const getResponse = await bookingClient.getBooking(bookingId);

  expect(getResponse.status()).toBe(200);

  const getBody = await getResponse.json();

  assertBookingDetails(getBody, payload);
});
