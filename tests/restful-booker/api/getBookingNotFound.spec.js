import { test, expect } from "@playwright/test";
import { BookingClient } from "../../../api/restful-booker/bookingClient";

test("Get booking with invalid ID returns 404", async ({ request }) => {
  const bookingClient = new BookingClient(request);

  const invalidBookingId = 999999;

  const response = await bookingClient.getBooking(invalidBookingId);

  expect(response.status()).toBe(404);
});