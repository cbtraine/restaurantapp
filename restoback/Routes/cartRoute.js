const express = require("express");
const router = express.Router();
const cartController = require("../Controllers/cartController");

router.post("/add", cartController.addToCart);
router.get("/", cartController.getCartItems);
router.put("/update/:id", cartController.updateCartItem);
router.delete("/remove/:id", cartController.removeCartItem);
router.delete("/clear", cartController.clearCart);

module.exports = router;
