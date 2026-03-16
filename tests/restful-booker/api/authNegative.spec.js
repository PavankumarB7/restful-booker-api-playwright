import { test, expect } from "@playwright/test";
import { BookingClient } from "../../../api/restful-booker/bookingClient";

test("Auth fails with invalid credentials", async ({ request }) => {
  const bookingClient = new BookingClient(request);

  const response = await bookingClient.createTokenWithCredentials(
    "wrongUser",
    "wrongPassword",
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.reason).toBe("Bad credentials");
});
