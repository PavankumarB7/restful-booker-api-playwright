import { test, expect } from "../../../fixtures/bookingFixtures";

test("Search booking by firstname with no matching results", async ({
  bookingClient,
}) => {
  const response = await bookingClient.searchBooking({
    firstname: "NonExistingUserXYZ",
  });

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.length).toBe(0);
});
