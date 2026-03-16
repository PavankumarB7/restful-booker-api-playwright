import { test, expect } from "@playwright/test";
import { BookingClient } from "../../../api/restful-booker/bookingClient";

test("Partial update with invalid booking ID should return 405", async ({
  request,
}) => {
  const bookingClient = new BookingClient(request);

  const token = await bookingClient.getAuthToken();

  const invalidBookingId = 999999;

  const patchPayload = {
    firstname: "InvalidUpdate",
  };

  const response = await bookingClient.partialUpdateBooking(
    invalidBookingId,
    token,
    patchPayload,
  );

  // Restful Booker returns 405 for PATCH on non-existent ID
  expect(response.status()).toBe(405);
});
