const db = require("../Config/db");

const UserModel = {
  async createUser(username, email, hashedPassword) {
    return new Promise((resolve, reject) => {
      const query =
        "INSERT INTO users (username, email, password ,is_active) VALUES (?, ?, ?,0)";
      db.query(query, [username, email, hashedPassword], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  async getUserByEmail(email) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users WHERE email = ? AND is_active = 1 ";
      db.query(query, [email], (err, result) => {
        if (err) return reject(err);
        resolve(result[0]);
      });
    });
  },

  async getUserByUsernameOrEmail(username, email) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users WHERE username = ? OR email = ?";
      db.query(query, [username, email], (err, result) => {
        if (err) return reject(err);
        resolve(result[0]);
      });
    });
  },

  async updateResetToken(email, token) {
    return new Promise((resolve, reject) => {
      const query = "UPDATE users SET reset_token = ? WHERE email = ?";
      db.query(query, [token, email], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  async clearResetToken(email) {
    return new Promise((resolve, reject) => {
      const query = "UPDATE users SET reset_token = NULL WHERE email = ?";
      db.query(query, [email], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  async updatePassword(email, hashedPassword) {
    return new Promise((resolve, reject) => {
      const query = "UPDATE users SET password = ? WHERE email = ?";
      db.query(query, [hashedPassword, email], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  async getAllUsers({ search, filter, limit, offset }) {
    return new Promise((resolve, reject) => {
      let query = `SELECT id, username, email, is_active FROM users WHERE role = 'admin'`;

      if (filter) {
        query += ` AND is_active = ${filter === "active" ? 1 : 0}`;
      }

      if (search) {
        query += ` AND username LIKE '%${search}%'`;
      }

      query += ` LIMIT ${limit} OFFSET ${offset}`;

      db.query(query, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  },
  async getTotalUsers({ search, filter }) {
    return new Promise((resolve, reject) => {
      let query = `SELECT COUNT(*) AS total FROM users WHERE role = 'admin'`;

      if (filter) {
        query += ` AND is_active = ${filter === "active" ? 1 : 0}`;
      }

      if (search) {
        query += ` AND username LIKE '%${search}%'`;
      }

      db.query(query, (err, rows) => {
        if (err) return reject(err);
        resolve(rows[0].total);
      });
    });
  },

  async getUserById(id) {
    return new Promise((resolve, reject) => {
      const query = "SELECT id, is_active FROM users WHERE id = ?";
      db.query(query, [id], (err, rows) => {
        if (err) return reject(err);
        resolve(rows[0]);
      });
    });
  },

  async updateUserStatus(id, is_active) {
    return new Promise((resolve, reject) => {
      const query = "UPDATE users SET is_active = ? WHERE id = ?";
      db.query(query, [is_active, id], (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  },
  async deleteUser(id) {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM users WHERE id = ?";
      db.query(query, [id], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },
};

module.exports = UserModel;
