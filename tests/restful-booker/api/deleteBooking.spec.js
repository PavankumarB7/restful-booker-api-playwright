import { test, expect } from "@playwright/test";
import { BookingClient } from "../../../api/restful-booker/bookingClient";
import { createBookingPayload } from "../../../test-data/restful-booker/bookingPayload";

test("Delete booking successfully", async ({ request }) => {
  const bookingClient = new BookingClient(request);

  // Generate auth token
  const token = await bookingClient.getAuthToken();
  const payload = createBookingPayload();

  // Create booking
  const createResponse = await bookingClient.createBooking(payload);
  expect(createResponse.status()).toBe(200);

  const createBody = await createResponse.json();
  const bookingId = createBody.bookingid;

  console.log("Booking ID:", bookingId);

  // Delete booking
  const deleteResponse = await bookingClient.deleteBooking(bookingId, token);

  expect(deleteResponse.status()).toBe(201);

  console.log("Delete Response:", await deleteResponse.text());

  // Verify booking deleted
  const getResponse = await bookingClient.getBooking(bookingId);

  expect(getResponse.status()).toBe(404);
});
