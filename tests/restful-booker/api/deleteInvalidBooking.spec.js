import { test, expect } from "@playwright/test";
import { BookingClient } from "../../../api/restful-booker/bookingClient";

test("Delete invalid booking ID should return 405", async ({ request }) => {
  const bookingClient = new BookingClient(request);

  const token = await bookingClient.getAuthToken();

  const invalidBookingId = 999999;

  const response = await bookingClient.deleteBooking(invalidBookingId, token);

  // Restful Booker returns 405 for DELETE on non-existent ID
  expect(response.status()).toBe(405);
});
