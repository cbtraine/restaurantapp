const express = require("express");
const router = express.Router();
const Review = require("../Models/reviewModel");

router.post("/submit", (req, res) => {
  const { name, comment, rating, items, cartId } = req.body;

  if (!name || !rating || !items || items.length === 0) {
    return res
      .status(400)
      .json({ error: "Name, rating, and at least one item are required" });
  }

  console.log("Received review data:", {
    name,
    comment,
    rating,
    items,
    cartId,
  });

  const reviewPromises = items.map((item) => {
    return new Promise((resolve, reject) => {
      Review.create(
        {
          name,
          comment,
          rating,
          itemName: item.itemName,
          itemPrice: item.itemPrice,
          cartQuantity: item.cartQuantity,
          cartId: cartId,
        },
        (err, result) => {
          if (err) {
            console.error("Error inserting review:", err);
            return reject(err);
          }
          resolve(result);
        }
      );
    });
  });

  Promise.all(reviewPromises)
    .then(() =>
      res.status(200).json({ message: "Reviews submitted successfully" })
    )
    .catch((err) => {
      console.error("Failed to submit reviews:", err);
      res.status(500).json({ error: "Failed to submit reviews" });
    });
});

router.get("/reviews", (req, res) => {
  const { name, itemName, startDate, endDate } = req.query;

  Review.getReviews({ name, itemName, startDate, endDate }, (err, results) => {
    if (err) {
      console.error("Failed to fetch reviews:", err);
      return res.status(500).json({ error: "Failed to fetch reviews" });
    }
    res.status(200).json(results);
  });
});

module.exports = router;
