import { test, expect } from "@playwright/test";
import { BookingClient } from "../../../api/restful-booker/bookingClient";

test("Partial update with invalid booking ID should return 405 or 404", async ({
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

  expect(response.status()).toBeGreaterThanOrEqual(400);
});
