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

describe("Restock sweet", () => {
  it("should allow admin to restock sweet", async () => {
    const sweet = await Sweet.create({
      name: "Kaju Katli",
      category: "Indian",
      price: 25,
      quantity: 5,
    });

    const admin = await User.create({
      name: "Admin",
      email: "admin@test.com",
      password: "password123",
      role: "ADMIN",
    });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);

    const res = await request(app)
      .post(`/api/sweets/${sweet._id}/restock`)
      .set("Authorization", `Bearer ${token}`)
      .send({ quantity: 10 });

    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(15);
  });
});
