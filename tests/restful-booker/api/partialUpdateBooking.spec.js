import { test, expect } from "../../../fixtures/bookingFixtures";
import { createBookingPayload } from "../../../test-data/restful-booker/bookingPayload";
import { faker } from "@faker-js/faker";

test("Partial update booking firstname successfully", async ({ bookingClient, authToken }) => {
  // Step 1: create booking
  const payload = createBookingPayload();
  const createResponse = await bookingClient.createBooking(payload);

  expect(createResponse.status()).toBe(200);

  const createBody = await createResponse.json();
  const bookingId = createBody.bookingid;

  // Step 2: partial update payload
  const updatedName = faker.person.firstName();

  const patchPayload = {
    firstname: updatedName,
  };

  // Step 3: call PATCH API
  const patchResponse = await bookingClient.partialUpdateBooking(
    bookingId,
    authToken,
    patchPayload,
  );

  expect(patchResponse.status()).toBe(200);

  const patchBody = await patchResponse.json();

  // Step 4: assertions
  expect(patchBody.firstname).toBe(updatedName);
  expect(patchBody.lastname).toBe(payload.lastname);
});
