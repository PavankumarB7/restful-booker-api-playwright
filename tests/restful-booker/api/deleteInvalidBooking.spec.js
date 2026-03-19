import { test } from "../../../fixtures/bookingFixtures";
import { assertNotFound } from "../../../api/restful-booker/bookingAssertions";

test("Delete invalid booking ID should return 405", async ({ bookingClient, authToken }) => {
  const invalidBookingId = 999999;

  const response = await bookingClient.deleteBooking(invalidBookingId, authToken);

  // Restful Booker returns 405 for DELETE on non-existent ID
  assertNotFound(response.status());
});
