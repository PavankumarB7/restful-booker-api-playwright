import { test, expect } from "@playwright/test";
import { BookingClient } from "../../../api/restful-booker/bookingClient";
import { createBookingPayload } from "../../../test-data/restful-booker/bookingPayload";

test("Update booking without authentication should fail", async ({
  request,
}) => {
  const bookingClient = new BookingClient(request);

  const payload = createBookingPayload();

  // Create booking
  const createResponse = await bookingClient.createBooking(payload);
  const bookingId = (await createResponse.json()).bookingid;

  // Attempt update without token
  const updatedPayload = {
    ...payload,
    firstname: "UnauthorizedUser",
  };

  const response = await request.put(`/booking/${bookingId}`, {
    data: updatedPayload,
  });

  expect(response.status()).toBe(403);
});
