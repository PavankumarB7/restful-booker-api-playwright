import { test, expect } from "@playwright/test";
import { BookingClient } from "../../../api/restful-booker/bookingClient";
import { createBookingPayload } from "../../../test-data/restful-booker/bookingPayload";

test("Partial update without authentication should fail", async ({
  request,
}) => {
  const bookingClient = new BookingClient(request);

  // Create a booking to patch
  const payload = createBookingPayload();
  const createResponse = await bookingClient.createBooking(payload);
  expect(createResponse.status()).toBe(200);

  const bookingId = (await createResponse.json()).bookingid;

  // Attempt PATCH with empty token — no auth
  const patchPayload = {
    firstname: "UnauthorizedPatch",
  };

  const response = await bookingClient.partialUpdateBooking(
    bookingId,
    "", // empty token = no auth
    patchPayload,
  );

  expect(response.status()).toBe(403);
});
