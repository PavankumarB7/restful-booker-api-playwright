export class BookingClient {
  constructor(request) {
    this.request = request;
  }

  async createBooking(payload) {
    return this.request.post("/booking", {
      data: payload,
    });
  }

  async getBooking(bookingId) {
    return this.request.get(`/booking/${bookingId}`);
  }

  async updateBooking(bookingId, payload, token) {
    return this.request.put(`/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${token}`,
        "Content-Type": "application/json",
      },
      data: payload,
    });
  }

  async deleteBooking(bookingId, token) {
    return this.request.delete(`/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${token}`,
      },
    });
  }

  async searchBooking(queryParams) {
    return this.request.get("/booking", {
      params: queryParams,
    });
  }

  async partialUpdateBooking(bookingId, token, payload) {
    return await this.request.patch(`/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${token}`,
        "Content-Type": "application/json",
      },
      data: payload,
    });
  }

  async createToken() {
    return this.request.post("/auth", {
      data: {
        username: process.env.BOOKING_USERNAME,
        password: process.env.BOOKING_PASSWORD,
      },
    });
  }

  async getAuthToken() {
    const response = await this.createToken();
    const body = await response.json();
    return body.token;
  }

  async createTokenWithCredentials(username, password) {
    return this.request.post("/auth", {
      data: { username, password },
    });
  }
}
