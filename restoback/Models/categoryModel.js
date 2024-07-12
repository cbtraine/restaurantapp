const db = require("../Config/db");

const Category = {
  create: (name, image, type, callback) => {
    const sql = 'INSERT INTO categories (name, image, type) VALUES (?, ?, ?)';
    db.query(sql, [name, image, type], callback);
  },
  getAll: (callback) => {
    const sql = 'SELECT * FROM categories';
    db.query(sql, callback);
  }
};

module.exports = Category;
