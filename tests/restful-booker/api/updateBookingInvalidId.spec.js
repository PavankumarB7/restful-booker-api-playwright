import { test } from "../../../fixtures/bookingFixtures";
import { createBookingPayload } from "../../../test-data/restful-booker/bookingPayload";
import { assertNotFound } from "../../../api/restful-booker/bookingAssertions";

test("Update non-existent booking ID should return 404", async ({
  bookingClient,
  authToken,
}) => {
  const invalidBookingId = 999999;
  const payload = createBookingPayload();

  const response = await bookingClient.updateBooking(
    invalidBookingId,
    payload,
    authToken,
  );

  assertNotFound(response.status());
});
