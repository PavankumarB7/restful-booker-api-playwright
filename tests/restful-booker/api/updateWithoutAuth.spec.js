import { test, expect } from "../../../fixtures/bookingFixtures";
import { createBookingPayload } from "../../../test-data/restful-booker/bookingPayload";
import { assertUnauthorized } from "../../../api/restful-booker/bookingAssertions";

test("Update booking without authentication should fail", async ({
  bookingClient,
}) => {
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

  assertUnauthorized(response.status());
});
