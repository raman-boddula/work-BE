const express = require("express");

const Product = require("../models/product.model");

const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
  try {
    const user = req.user;
    console.log("111user",user)

    const product = await Product.create({
      title: req.body.title,
      body: req.body.body1,
      user: user.user._id,
    });

    return res.status(201).json({ product });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
});

router.get("/", async (req, res) => {
  const products = await Product.find().lean().exec();

  return res.send(products);
});

module.exports = router;