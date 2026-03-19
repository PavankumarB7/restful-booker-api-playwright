import { test, expect } from "../../../fixtures/bookingFixtures";

test("Auth with valid credentials returns token", async ({ bookingClient }) => {
  const response = await bookingClient.createToken();

  expect(response.status()).toBe(200);

  const body = await response.json();

  // Token should exist and be a non-empty string
  expect(body.token).toBeDefined();
  expect(typeof body.token).toBe("string");
  expect(body.token.length).toBeGreaterThan(0);
});
