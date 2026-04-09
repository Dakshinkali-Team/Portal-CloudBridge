const model = require('../models/transactionModel');

exports.create = async (req, res, next) => {
  try {
    const { username, service_id, total_amount, status } = req.body;

    // Get user_id from username
    const user = await model.getUserByUsername(username);

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const user_id = user.id;

    // Create transaction
    const data = await model.createTransaction(
      user_id,
      service_id,
      total_amount,
      status || 'PENDING'
    );

    res.status(201).json({
      message: 'Transaction created',
      data: {
        ...data,
        username: username,
      },
    });

  } catch (err) {
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const data = await model.getTransactions();

    res.json({
      message: 'Transactions fetched',
      data,
    });

  } catch (err) {
    next(err);
  }
};