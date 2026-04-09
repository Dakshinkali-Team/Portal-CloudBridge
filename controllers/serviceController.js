const model = require('../models/serviceModel');

exports.create = async (req, res, next) => {
  try {
    const { name, price, catalog_id } = req.body;
    const data = await model.createService(name, price, catalog_id);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const data = await model.getServices();
    res.json(data);
  } catch (err) {
    next(err);
  }
};