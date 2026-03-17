import { test, expect } from "@playwright/test";
import { BookingClient } from "../../../api/restful-booker/bookingClient";
import { createBookingPayload } from "../../../test-data/restful-booker/bookingPayload";

test("Create booking without firstname should return 500", async ({
  request,
}) => {
  const bookingClient = new BookingClient(request);

  const payload = createBookingPayload();
  delete payload.firstname;

  const response = await bookingClient.createBooking(payload);

  expect(response.status()).toBe(500);
});

test("Create booking without lastname should return 500", async ({
  request,
}) => {
  const bookingClient = new BookingClient(request);

  const payload = createBookingPayload();
  delete payload.lastname;

  const response = await bookingClient.createBooking(payload);

  expect(response.status()).toBe(500);
});

test("Create booking without totalprice should return 500", async ({
  request,
}) => {
  const bookingClient = new BookingClient(request);

  const payload = createBookingPayload();
  delete payload.totalprice;

  const response = await bookingClient.createBooking(payload);

  expect(response.status()).toBe(500);
});
