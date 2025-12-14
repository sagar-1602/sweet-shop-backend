const request = require("supertest");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const app = require("../app");

beforeAll(async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/sweet_shop_test");
});

beforeEach(async () => {
  await User.deleteMany({});

  const hashedPassword = await bcrypt.hash("password123", 10);

  await User.create({
    name: "Test User",
    email: "test@example.com",
    password: hashedPassword,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Auth Login API", () => {
  it("should login user and return token", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "password123",
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
