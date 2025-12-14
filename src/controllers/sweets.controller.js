const Sweet = require("../models/Sweet");

const createSweet = async (req, res) => {
  const { name, category, price, quantity } = req.body;

  if (!name || !category || price == null || quantity == null) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const sweet = await Sweet.create({
    name,
    category,
    price,
    quantity,
  });

  res.status(201).json(sweet);
};

const getAllSweets = async (req, res) => {
  const sweets = await Sweet.find();
  res.status(200).json(sweets);
};

const searchSweets = async (req, res) => {
  const { name, category, minPrice, maxPrice } = req.query;

  const filter = {};

  if (name) {
    filter.name = { $regex: name, $options: "i" };
  }

  if (category) {
    filter.category = category;
  }

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  const sweets = await Sweet.find(filter);
  res.status(200).json(sweets);
};

const purchaseSweet = async (req, res) => {
  const sweet = await Sweet.findById(req.params.id);

  if (!sweet) {
    return res.status(404).json({ message: "Sweet not found" });
  }

  if (sweet.quantity <= 0) {
    return res.status(400).json({ message: "Out of stock" });
  }

  sweet.quantity -= 1;
  await sweet.save();

  res.status(200).json(sweet);
};

/* ✅ NEW FUNCTION */
const restockSweet = async (req, res) => {
  const { quantity } = req.body;

  if (quantity == null || quantity <= 0) {
    return res.status(400).json({
      message: "Invalid restock quantity",
    });
  }

  const sweet = await Sweet.findById(req.params.id);

  if (!sweet) {
    return res.status(404).json({
      message: "Sweet not found",
    });
  }

  sweet.quantity += quantity;
  await sweet.save();

  res.status(200).json(sweet);
};

module.exports = {
  createSweet,
  getAllSweets,
  searchSweets,
  purchaseSweet,
  restockSweet,
};
