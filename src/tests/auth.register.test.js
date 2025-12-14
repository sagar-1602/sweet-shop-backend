const request = require("supertest");
const mongoose = require("mongoose");
const User = require("../models/User");
const app = require("../app");

beforeAll(async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/sweet_shop_test");
});

beforeEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Auth Register API", () => {
  it("should register a new user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("User registered successfully");
  });
});
