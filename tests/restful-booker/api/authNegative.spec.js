import { test, expect } from "../../../fixtures/bookingFixtures";

test("Auth fails with invalid credentials", async ({ bookingClient }) => {
  const response = await bookingClient.createTokenWithCredentials(
    "wrongUser",
    "wrongPassword",
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.reason).toBe("Bad credentials");
});
