const db = require("../Config/db");

const Cart = {
  addToCart: (item_id, quantity, callback) => {
    const sql = "INSERT INTO cart (item_id, quantity) VALUES (?, ?)";
    db.query(sql, [item_id, quantity], callback);
  },

  getCartItems: (callback) => {
    const sql = `
      SELECT cart.id, items.name, items.price, items.image, cart.quantity
      FROM cart
      JOIN items ON cart.item_id = items.id
    `;
    db.query(sql, callback);
  },

  updateCartItem: (id, quantity, callback) => {
    const sql = "UPDATE cart SET quantity = ? WHERE id = ?";
    db.query(sql, [quantity, id], callback);
  },

  removeCartItem: (id, callback) => {
    const sql = "DELETE FROM cart WHERE id = ?";
    db.query(sql, [id], callback);
  },

  clearCart: (callback) => {
    const sql = "DELETE FROM cart";
    db.query(sql, callback);
  },
};

module.exports = Cart;
