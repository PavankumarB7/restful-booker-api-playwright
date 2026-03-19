import { test, expect } from "../../../fixtures/bookingFixtures";
import { createBookingPayload } from "../../../test-data/restful-booker/bookingPayload";
import { assertBookingDetails } from "../../../api/restful-booker/bookingAssertions";

test("Complete booking lifecycle", async ({ bookingClient, authToken }) => {
  const payload = createBookingPayload();

  // Create booking
  const createResponse = await bookingClient.createBooking(payload);
  expect(createResponse.status()).toBe(200);

  const createBody = await createResponse.json();
  const bookingId = createBody.bookingid;

  // Verify created booking
  const getResponse = await bookingClient.getBooking(bookingId);
  expect(getResponse.status()).toBe(200);

  const bookingData = await getResponse.json();
  assertBookingDetails(bookingData, payload);

  // Update booking
  const updatedPayload = {
    ...payload,
    firstname: "LifecycleUser",
  };

  const updateResponse = await bookingClient.updateBooking(
    bookingId,
    updatedPayload,
    authToken,
  );

  expect(updateResponse.status()).toBe(200);

  // Verify updated booking
  const updatedGet = await bookingClient.getBooking(bookingId);
  const updatedData = await updatedGet.json();

  expect(updatedData.firstname).toBe("LifecycleUser");

  // Delete booking
  const deleteResponse = await bookingClient.deleteBooking(bookingId, authToken);
  expect(deleteResponse.status()).toBe(201);

  // Verify deletion
  const deletedCheck = await bookingClient.getBooking(bookingId);
  expect(deletedCheck.status()).toBe(404);
});
