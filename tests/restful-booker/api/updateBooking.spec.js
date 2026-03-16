import { test, expect } from "@playwright/test";
import { BookingClient } from "../../../api/restful-booker/bookingClient";
import { createBookingPayload } from "../../../test-data/restful-booker/bookingPayload";

test("Update booking successfully", async ({ request }) => {
  const bookingClient = new BookingClient(request);

  const payload = createBookingPayload();

  // Create booking
  const createResponse = await bookingClient.createBooking(payload);
  expect(createResponse.status()).toBe(200);

  const createBody = await createResponse.json();
  const bookingId = createBody.bookingid;

  // Generate auth token
  const token = await bookingClient.getAuthToken();

  // Update payload
  const updatedPayload = {
    ...payload,
    firstname: "Jane",
  };

  // Update booking
  const updateResponse = await bookingClient.updateBooking(
    bookingId,
    updatedPayload,
    token,
  );

  expect(updateResponse.status()).toBe(200);

  const updateBody = await updateResponse.json();

  expect(updateBody).toMatchObject({
    firstname: "Jane",
    lastname: payload.lastname,
    totalprice: payload.totalprice,
  });
});
