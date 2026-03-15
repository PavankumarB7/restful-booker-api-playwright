import { test, expect } from "@playwright/test";
import { BookingClient } from "../../../api/restful-booker/bookingClient";

test("Delete invalid booking ID should return error", async ({ request }) => {
  const bookingClient = new BookingClient(request);

  const token = await bookingClient.getAuthToken();

  const invalidBookingId = 999999;

  const response = await bookingClient.deleteBooking(invalidBookingId, token);

  expect(response.status()).toBeGreaterThanOrEqual(400);
});
