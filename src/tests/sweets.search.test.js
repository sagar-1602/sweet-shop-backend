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

describe("Search sweets", () => {
  it("should filter sweets by category and price range", async () => {
    await Sweet.create([
      { name: "Ladoo", category: "Indian", price: 10, quantity: 100 },
      { name: "Barfi", category: "Indian", price: 20, quantity: 50 },
      { name: "Donut", category: "Western", price: 30, quantity: 40 },
    ]);

    const user = await User.create({
      name: "User",
      email: "user@test.com",
      password: "password123",
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    const res = await request(app)
      .get("/api/sweets/search?category=Indian&minPrice=5&maxPrice=15")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe("Ladoo");
  });
});
