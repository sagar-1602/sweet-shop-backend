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

describe("Purchase sweet", () => {
  it("should decrease sweet quantity by 1", async () => {
    const sweet = await Sweet.create({
      name: "Ladoo",
      category: "Indian",
      price: 10,
      quantity: 5,
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

    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(4);
  });
});
