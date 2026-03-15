import { test, expect } from "@playwright/test";
import { BookingClient } from "../../../api/restful-booker/bookingClient";

test("Search booking by firstname returns matching results", async ({ request }) => {
  const bookingClient = new BookingClient(request);

  const response = await bookingClient.searchBooking({
    firstname: "John",
  });

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(Array.isArray(body)).toBeTruthy();

  console.log("Search Results:", body);
});
