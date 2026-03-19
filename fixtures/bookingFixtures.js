import { test as base } from "@playwright/test";
import { BookingClient } from "../api/restful-booker/bookingClient";

export const test = base.extend({
  bookingClient: async ({ request }, use) => {
    const client = new BookingClient(request);
    await use(client);
  },

  authToken: async ({ request }, use) => {
    const client = new BookingClient(request);
    const token = await client.getAuthToken();
    await use(token);
  },
});

export { expect } from "@playwright/test";
