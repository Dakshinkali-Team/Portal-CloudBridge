const pool = require('../db');

exports.createCatalog = async (name, description) => {
  const res = await pool.query(
    `INSERT INTO catalogs(name, description)
     VALUES($1,$2) RETURNING *`,
    [name, description]
  );
  return res.rows[0];
};

exports.getAllCatalogs = async () => {
  const res = await pool.query(`SELECT * FROM catalogs`);
  return res.rows;
};

exports.getCatalogById = async (id) => {
  const res = await pool.query(`SELECT * FROM catalogs WHERE id=$1`, [id]);
  return res.rows[0];
};

exports.updateCatalog = async (id, name, description) => {
  const res = await pool.query(
    `UPDATE catalogs SET name=$1, description=$2 WHERE id=$3 RETURNING *`,
    [name, description, id]
  );
  return res.rows[0];
};

exports.deleteCatalog = async (id) => {
  await pool.query(`DELETE FROM catalogs WHERE id=$1`, [id]);
};