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
  expect(createResponse.status()).toBe(200);

  const bookingId = (await createResponse.json()).bookingid;

  // Attempt update with empty token
  const updatedPayload = {
    ...payload,
    firstname: "UnauthorizedUser",
  };

  const response = await bookingClient.updateBooking(
    bookingId,
    updatedPayload,
    "", // empty token = no auth
  );

  expect(response.status()).toBe(403);
});
