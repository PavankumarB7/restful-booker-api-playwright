import { test, expect } from "../../../fixtures/bookingFixtures";
import { createBookingPayload } from "../../../test-data/restful-booker/bookingPayload";
import { assertUnauthorized } from "../../../api/restful-booker/bookingAssertions";

test("Partial update without authentication should fail", async ({
  bookingClient,
}) => {
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

  assertUnauthorized(response.status());
});
