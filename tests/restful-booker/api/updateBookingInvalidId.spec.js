import { test, expect } from "@playwright/test";
import { BookingClient } from "../../../api/restful-booker/bookingClient";
import { createBookingPayload } from "../../../test-data/restful-booker/bookingPayload";

test("Update non-existent booking ID should return 404", async ({
  request,
}) => {
  const bookingClient = new BookingClient(request);

  const token = await bookingClient.getAuthToken();

  const invalidBookingId = 999999;
  const payload = createBookingPayload();

  const response = await bookingClient.updateBooking(
    invalidBookingId,
    payload,
    token,
  );

  expect(response.status()).toBe(405);
});
