import { test, expect } from "@playwright/test";
import { BookingClient } from "../../../api/restful-booker/bookingClient";
import { createBookingPayload } from "../../../test-data/restful-booker/bookingPayload";

test("Search booking by firstname returns matching results", async ({
  request,
}) => {
  const bookingClient = new BookingClient(request);

  // Create a booking with a known name first
  const payload = createBookingPayload();
  const createResponse = await bookingClient.createBooking(payload);
  expect(createResponse.status()).toBe(200);

  const createBody = await createResponse.json();
  const bookingId = createBody.bookingid;
  console.log("bookingId", bookingId);

  // Search by the exact firstname
  const searchResponse = await bookingClient.searchBooking({
    firstname: payload.firstname,
    lastname: payload.lastname,
  });

  expect(searchResponse.status()).toBe(200);

  const body = await searchResponse.json();
  expect(Array.isArray(body)).toBeTruthy();

  // Verify the created booking appears in results
  const found = body.some((b) => b.bookingid === bookingId);
  expect(found).toBeTruthy();

  console.log("Search Results:", body);
});
