import { test, expect } from "@playwright/test";

test("Auth fails with invalid credentials", async ({ request }) => {
  const response = await request.post("/auth", {
    data: {
      username: "wrongUser",
      password: "wrongPassword",
    },
  });

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.reason).toBe("Bad credentials");
});
