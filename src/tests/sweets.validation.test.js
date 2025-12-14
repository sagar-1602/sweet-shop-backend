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

describe("Sweet validation", () => {
  it("should return 400 if required fields are missing", async () => {
    const admin = await User.create({
      name: "Admin",
      email: "admin@test.com",
      password: "password123",
      role: "ADMIN",
    });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);

    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Rasgulla",
        // missing category, price, quantity
      });

    expect(res.status).toBe(400);
  });
});
