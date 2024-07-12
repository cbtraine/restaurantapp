const db = require("../Config/db");

const Item = {
  create: (name, image, price, category_id, callback) => {
    const sql =
      "INSERT INTO items (name, image, price, category_id) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, image, price, category_id], callback);
  },

  // getByCategory: (categoryId, callback) => {
  //   const sql =
  //     "SELECT * FROM items WHERE category_id = ? AND available = TRUE";
  //   db.query(sql, [categoryId], callback);
  // },
  // searchByName: (name, callback) => {
  //   const sql = "SELECT * FROM items WHERE name LIKE ? AND available = TRUE";
  //   db.query(sql, [`%${name}%`], callback);
  // },
  getAll: (filter, callback) => {
    let query = `
       SELECT items.*, categories.name AS category_name, categories.type AS category_type
      FROM items 
      JOIN categories ON items.category_id = categories.id
    `;
    const queryParams = [];
    const conditions = [];

    if (filter.available !== undefined) {
      conditions.push("items.available = ?");
      queryParams.push(filter.available);
    }

    if (filter.search) {
      conditions.push("items.name LIKE ?");
      queryParams.push(`%${filter.search}%`);
    }
    if (filter.category) {
      conditions.push("items.category_id = ?");
      queryParams.push(filter.category);
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    query += " LIMIT ? OFFSET ?";
    queryParams.push(filter.limit, (filter.page - 1) * filter.limit);

    db.query(query, queryParams, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  },
  getCount: (filter, callback) => {
    let query = `
      SELECT COUNT(*) AS count
      FROM items
      JOIN categories ON items.category_id = categories.id
    `;
    const queryParams = [];
    const conditions = [];

    if (filter.available !== undefined) {
      conditions.push("items.available = ?");
      queryParams.push(filter.available);
    }

    if (filter.search) {
      conditions.push("items.name LIKE ?");
      queryParams.push(`%${filter.search}%`);
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    db.query(query, queryParams, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results[0].count);
    });
  },

  delete: (id, callback) => {
    const sql = "DELETE FROM items WHERE id = ?";
    db.query(sql, [id], callback);
  },
  update: (id, name, image, price, category_id, callback) => {
    const sql =
      "UPDATE items SET name = ?, image = ?, price = ?, category_id = ? WHERE id = ?";
    db.query(sql, [name, image, price, category_id, id], callback);
  },
  updateAvailability: (id, available, callback) => {
    const sql = "UPDATE items SET available = ? WHERE id = ?";
    db.query(sql, [available, id], callback);
  },
};

module.exports = Item;
