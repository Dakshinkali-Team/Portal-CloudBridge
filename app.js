const express = require('express');
const app = express();

const catalogRoutes = require('./routes/catalogRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

const errorMiddleware = require('./middleware/errorMiddleware');

const userRoutes = require('./routes/userRoutes');

app.use(express.json());

// Routes
app.use('/api/catalogs', catalogRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);

// Error Handler
app.use(errorMiddleware);

module.exports = app;