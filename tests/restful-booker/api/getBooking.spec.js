import { test, expect } from "@playwright/test";
import { BookingClient } from "../../../api/restful-booker/bookingClient";
import { createBookingPayload } from "../../../test-data/restful-booker/bookingPayload";

test("Get booking by ID successfully", async ({ request }) => {
  const bookingClient = new BookingClient(request);

  const payload = createBookingPayload();

  // Create booking first
  const createResponse = await bookingClient.createBooking(payload);
  expect(createResponse.status()).toBe(200);

  const createBody = await createResponse.json();
  console.log("Create response:", createBody);

  const bookingId = createBody.bookingid;
  console.log("Booking ID:", bookingId);

  // Now get the booking
  const getResponse = await bookingClient.getBooking(bookingId);

  expect(getResponse.status()).toBe(200);

  const getBody = await getResponse.json();
  console.log("Get response:", getBody);

  expect(getBody.firstname).toBe(payload.firstname);
  expect(getBody.lastname).toBe(payload.lastname);
});
