const pool = require('../db');

// Get user by username (FIXED COLUMN)
exports.getUserByUsername = async (username) => {
  const result = await pool.query(
    `SELECT id, username FROM users WHERE username = $1`,
    [username]
  );

  return result.rows[0];
};

// Create transaction
exports.createTransaction = async (
  user_id,
  service_id,
  total_amount,
  status
) => {
  const result = await pool.query(
    `INSERT INTO transactions (
        user_id,
        service_id,
        total_amount,
        status,
        created_at
     )
     VALUES ($1, $2, $3, $4, NOW())
     RETURNING *`,
    [user_id, service_id, total_amount, status]
  );

  return result.rows[0];
};

// Get all transactions (with username & service name)
exports.getTransactions = async () => {
  const result = await pool.query(`
    SELECT 
      t.id,
      t.user_id,
      u.username,
      t.service_id,
      s.name AS service_name,
      t.total_amount,
      t.status,
      t.created_at
    FROM transactions t
    JOIN users u ON t.user_id = u.id
    JOIN services s ON t.service_id = s.id
    ORDER BY t.created_at DESC
  `);

  return result.rows;
};