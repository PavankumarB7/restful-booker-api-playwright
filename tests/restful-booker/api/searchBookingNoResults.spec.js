import { test, expect } from "@playwright/test";
import { BookingClient } from "../../../api/restful-booker/bookingClient";

test("Search booking by firstname with no matching results", async ({
  request,
}) => {
  const bookingClient = new BookingClient(request);

  const response = await bookingClient.searchBooking({
    firstname: "NonExistingUserXYZ",
  });

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.length).toBe(0);
});
