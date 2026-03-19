import { test, expect } from "../../../fixtures/bookingFixtures";
import { createBookingPayload } from "../../../test-data/restful-booker/bookingPayload";

test("Delete booking successfully", async ({ bookingClient, authToken }) => {
  const payload = createBookingPayload();

  // Create booking
  const createResponse = await bookingClient.createBooking(payload);
  expect(createResponse.status()).toBe(200);

  const createBody = await createResponse.json();
  const bookingId = createBody.bookingid;

  // Delete booking
  const deleteResponse = await bookingClient.deleteBooking(bookingId, authToken);

  expect(deleteResponse.status()).toBe(201);

  // Verify booking deleted
  const getResponse = await bookingClient.getBooking(bookingId);

  expect(getResponse.status()).toBe(404);
});
