import { expect } from "@playwright/test";

export function assertBookingCreated(body, payload) {
  expect(body.bookingid).toBeDefined();
  expect(body.booking.firstname).toBe(payload.firstname);
  expect(body.booking.lastname).toBe(payload.lastname);
  expect(body.booking.totalprice).toBe(payload.totalprice);
  expect(body.booking.depositpaid).toBe(payload.depositpaid);
}

export function assertBookingDetails(body, payload) {
  expect(body.firstname).toBe(payload.firstname);
  expect(body.lastname).toBe(payload.lastname);
  expect(body.totalprice).toBe(payload.totalprice);
  expect(body.depositpaid).toBe(payload.depositpaid);
}

export function assertUnauthorized(status) {
  expect(status).toBe(403);
}

export function assertNotFound(status) {
  expect(status).toBe(405);
}

export function assertBookingNotFound(status) {
  expect(status).toBe(404);
}
