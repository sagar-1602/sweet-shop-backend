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

describe("Out of stock purchase", () => {
  it("should not allow purchase when quantity is zero", async () => {
    const sweet = await Sweet.create({
      name: "Halwa",
      category: "Indian",
      price: 15,
      quantity: 0,
    });

    const user = await User.create({
      name: "User",
      email: "user@test.com",
      password: "password123",
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    const res = await request(app)
      .post(`/api/sweets/${sweet._id}/purchase`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Out of stock");
  });
});
