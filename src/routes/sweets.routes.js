const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const adminOnly = require("../middleware/role.middleware");
const {
  createSweet,
  getAllSweets,
  searchSweets,
  purchaseSweet,
  restockSweet,
} = require("../controllers/sweets.controller");

const router = express.Router();

router.post("/", authMiddleware, adminOnly, createSweet);
router.get("/", authMiddleware, getAllSweets);
router.get("/search", authMiddleware, searchSweets);
router.post("/:id/purchase", authMiddleware, purchaseSweet);
router.post("/:id/restock", authMiddleware, adminOnly, restockSweet);

module.exports = router;
