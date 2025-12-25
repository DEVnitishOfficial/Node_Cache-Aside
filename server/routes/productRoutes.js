import express from "express";
import redis from "../config/redis.js";
import Product from "../models/product.js";

const router = express.Router();

/**
 * GET ALL PRODUCTS (WITH CACHE)
 */
router.get("/", async (req, res) => {
  const cacheKey = "products:all";

  // 1️⃣ Check cache
  const cachedData = await redis.get(cacheKey);

  if (cachedData) {
    console.log("✅ CACHE HIT");
    return res.json(JSON.parse(cachedData));
  }

  console.log("❌ CACHE MISS");

  // 2️⃣ Fetch from DB
  const products = await Product.find();

  // 3️⃣ Save to Redis (TTL: 60 sec)
  await redis.set(cacheKey, JSON.stringify(products), "EX", 60);

  res.json(products);
});

/**
 * ADD PRODUCT (INVALIDATE CACHE)
 */
router.post("/", async (req, res) => {
  const product = await Product.create(req.body);

  // Invalidate cache
  await redis.del("products:all");

  res.status(201).json(product);
});

export default router;
