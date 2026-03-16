import { test, expect } from "@playwright/test";
import { BookingClient } from "../../../api/restful-booker/bookingClient";
import { createBookingPayload } from "../../../test-data/restful-booker/bookingPayload";

test("Complete booking lifecycle", async ({ request }) => {
  const bookingClient = new BookingClient(request);

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
  expect(bookingData.firstname).toBe(payload.firstname);

  // Generate token
  const token = await bookingClient.getAuthToken();

  // Update booking
  const updatedPayload = {
    ...payload,
    firstname: "LifecycleUser",
  };

  const updateResponse = await bookingClient.updateBooking(
    bookingId,
    updatedPayload,
    token,
  );

  expect(updateResponse.status()).toBe(200);

  // Verify updated booking
  const updatedGet = await bookingClient.getBooking(bookingId);
  const updatedData = await updatedGet.json();

  expect(updatedData.firstname).toBe("LifecycleUser");

  // Delete booking
  const deleteResponse = await bookingClient.deleteBooking(bookingId, token);
  expect(deleteResponse.status()).toBe(201);

  // Verify deletion
  const deletedCheck = await bookingClient.getBooking(bookingId);
  expect(deletedCheck.status()).toBe(404);
});
