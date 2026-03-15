import { test, expect } from "@playwright/test";
import { BookingClient } from "../../../api/restful-booker/bookingClient";
import { createBookingPayload } from "../../../test-data/restful-booker/bookingPayload";
import { faker } from "@faker-js/faker";

test("Partial update booking firstname successfully", async ({ request }) => {
  const bookingClient = new BookingClient(request);

  // Step 1: create auth token
  const token = await bookingClient.getAuthToken();

  // Step 2: create booking
  const payload = createBookingPayload();
  const createResponse = await bookingClient.createBooking(payload);

  expect(createResponse.status()).toBe(200);

  const createBody = await createResponse.json();
  const bookingId = createBody.bookingid;

  // Step 3: partial update payload
  const updatedName = faker.person.firstName();

  const patchPayload = {
    firstname: updatedName,
  };

  // Step 4: call PATCH API
  const patchResponse = await bookingClient.partialUpdateBooking(
    bookingId,
    token,
    patchPayload,
  );

  expect(patchResponse.status()).toBe(200);

  const patchBody = await patchResponse.json();

  // Step 5: assertions
  expect(patchBody.firstname).toBe(updatedName);
  expect(patchBody.lastname).toBe(payload.lastname);
});
