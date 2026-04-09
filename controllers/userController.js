const model = require('../models/userModel');

// GET USERS
exports.getUsers = async (req, res, next) => {
  try {
    const users = await model.getUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

// CREATE USER
exports.createUser = async (req, res, next) => {
  try {
    const { username, email } = req.body;
    const user = await model.createUser(username, email);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};