const db = require("../Config/db");

const Review = {
  getItemDetailsFromCart: (cartId, callback) => {
    const sql = `
      SELECT items.name AS item_name, items.price AS item_price, cart.quantity AS cart_quantity
      FROM cart
      JOIN items ON cart.item_id = items.id
      WHERE cart.id = ?
    `;
    db.query(sql, [cartId], callback);
  },

  create: (reviewData, callback) => {
    const sql =
      "INSERT INTO reviews (name, comment, rating, item_name, item_price, cart_quantity, cart_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())";
    db.query(
      sql,
      [
        reviewData.name,
        reviewData.comment,
        reviewData.rating,
        reviewData.itemName,
        reviewData.itemPrice,
        reviewData.cartQuantity,
        reviewData.cartId,
      ],
      callback
    );
  },

  getReviews: (searchParams, callback) => {
    const { name, itemName, startDate, endDate } = searchParams;
    let sql = `
      SELECT name, item_name, item_price, created_at
      FROM reviews
      WHERE 1=1
    `;
    const params = [];
    if (name) {
      sql += " AND name LIKE ?";
      params.push(`%${name}%`);
    }
    if (itemName) {
      sql += " AND item_name LIKE ?";
      params.push(`%${itemName}%`);
    }
    if (startDate) {
      sql += " AND created_at >= ?";
      params.push(startDate);
    }
    if (endDate) {
      sql += " AND created_at <= ?";
      params.push(endDate);
    }
    db.query(sql, params, callback);
  },
};

module.exports = Review;
