import { test } from "../../../fixtures/bookingFixtures";
import { assertNotFound } from "../../../api/restful-booker/bookingAssertions";

test("Partial update with invalid booking ID should return 405", async ({
  bookingClient,
  authToken,
}) => {
  const invalidBookingId = 999999;

  const patchPayload = {
    firstname: "InvalidUpdate",
  };

  const response = await bookingClient.partialUpdateBooking(
    invalidBookingId,
    authToken,
    patchPayload,
  );

  // Restful Booker returns 405 for PATCH on non-existent ID
  assertNotFound(response.status());
});
