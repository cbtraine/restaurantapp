const Cart = require("../Models/cartModel");

exports.addToCart = (req, res) => {
  const { item_id, quantity } = req.body;

  Cart.addToCart(item_id, quantity, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).send({ message: "Item added to cart successfully" });
  });
};

exports.getCartItems = (req, res) => {
  Cart.getCartItems((err, results) => {
    console.log(results);
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).send(results);
  });
};

exports.updateCartItem = (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  const { quantity } = req.body;

  Cart.updateCartItem(id, quantity, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).send({ message: "Cart item updated successfully" });
  });
};

exports.removeCartItem = (req, res) => {
  const { id } = req.params;

  Cart.removeCartItem(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).send({ message: "Cart item removed successfully" });
  });
};

exports.clearCart = (req, res) => {
  Cart.clearCart((err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).send({ message: "Cart cleared successfully" });
  });
};
