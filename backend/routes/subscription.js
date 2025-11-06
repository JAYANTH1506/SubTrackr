const express = require("express");
const router = express.Router();
const Subscription = require("../models/Subscription");
const jwt = require("jsonwebtoken");

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const verified = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};

// Add Subscription
router.post("/", verifyToken, async (req, res) => {
  try {
    const newSub = new Subscription({ ...req.body, userId: req.user.id });
    await newSub.save();
    res.status(201).json({ message: "Subscription added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Subscriptions for Logged-in User
router.get("/", verifyToken, async (req, res) => {
  try {
    const subs = await Subscription.find({ userId: req.user.id });
    res.json(subs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Subscription
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Subscription.findByIdAndDelete(req.params.id);
    res.json({ message: "Subscription deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
