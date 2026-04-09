const pool = require('../db');

// GET ALL USERS
exports.getUsers = async () => {
  const res = await pool.query(`SELECT * FROM users ORDER BY id`);
  return res.rows;
};

// CREATE USER (optional)
exports.createUser = async (username, email) => {
  const res = await pool.query(
    `INSERT INTO users(username, email)
     VALUES($1, $2) RETURNING *`,
    [username, email]
  );
  return res.rows[0];
};