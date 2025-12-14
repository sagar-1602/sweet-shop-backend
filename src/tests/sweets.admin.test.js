const request = require("supertest");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Sweet = require("../models/Sweet");
const User = require("../models/User");
const app = require("../app");

beforeAll(async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/sweet_shop_test");
});

beforeEach(async () => {
  await Sweet.deleteMany({});
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Admin restriction on Create Sweet", () => {
  it("should block non-admin user from creating sweet", async () => {
    const user = await User.create({
      name: "Normal User",
      email: "user@example.com",
      password: "password123",
      role: "USER",
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Barfi",
        category: "Indian",
        price: 20,
        quantity: 50,
      });

    expect(res.status).toBe(403);
  });
});
