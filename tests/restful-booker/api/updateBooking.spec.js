import { test, expect } from "../../../fixtures/bookingFixtures";
import { createBookingPayload } from "../../../test-data/restful-booker/bookingPayload";

test("Update booking successfully", async ({ bookingClient, authToken }) => {
  const payload = createBookingPayload();

  // Create booking
  const createResponse = await bookingClient.createBooking(payload);
  expect(createResponse.status()).toBe(200);

  const createBody = await createResponse.json();
  const bookingId = createBody.bookingid;

  // Update payload
  const updatedPayload = {
    ...payload,
    firstname: "Jane",
  };

  // Update booking
  const updateResponse = await bookingClient.updateBooking(
    bookingId,
    updatedPayload,
    authToken,
  );

  expect(updateResponse.status()).toBe(200);

  const updateBody = await updateResponse.json();

  expect(updateBody).toMatchObject({
    firstname: "Jane",
    lastname: payload.lastname,
    totalprice: payload.totalprice,
  });
});
