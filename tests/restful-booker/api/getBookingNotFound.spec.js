import { test, expect } from "../../../fixtures/bookingFixtures";
import { assertBookingNotFound } from "../../../api/restful-booker/bookingAssertions";

test("Get booking with invalid ID returns 404", async ({ bookingClient }) => {
  const invalidBookingId = 999999;

  const response = await bookingClient.getBooking(invalidBookingId);

  assertBookingNotFound(response.status());
});
