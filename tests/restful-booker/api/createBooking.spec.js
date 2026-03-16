import { test, expect } from "@playwright/test";
import { BookingClient } from "../../../api/restful-booker/bookingClient";
import { createBookingPayload } from "../../../test-data/restful-booker/bookingPayload";

test("Create booking successfully", async ({ request }) => {
  const bookingClient = new BookingClient(request);

  const payload = createBookingPayload();

  const response = await bookingClient.createBooking(payload);

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.bookingid).toBeDefined();
  expect(body.booking.firstname).toBe(payload.firstname);
  expect(body.booking.lastname).toBe(payload.lastname);
});
