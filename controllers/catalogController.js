const model = require('../models/catalogModel');

exports.create = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const data = await model.createCatalog(name, description);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const data = await model.getAllCatalogs();
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const data = await model.getCatalogById(req.params.id);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const data = await model.updateCatalog(req.params.id, name, description);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    await model.deleteCatalog(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
};