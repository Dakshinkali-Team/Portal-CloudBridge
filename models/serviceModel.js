const pool = require('../db');

exports.createService = async (name, price, catalog_id) => {
  const res = await pool.query(
    `INSERT INTO services(name, price, catalog_id)
     VALUES($1,$2,$3) RETURNING *`,
    [name, price, catalog_id]
  );
  return res.rows[0];
};

exports.getServices = async () => {
  const res = await pool.query(`
    SELECT s.*, c.name AS catalog
    FROM services s
    JOIN catalogs c ON s.catalog_id = c.id
  `);
  return res.rows;
};