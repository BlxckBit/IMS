const express = require('express');
const productRoutes = require('./routes/products');

const app = express();

// ✅ parse JSON
app.use(express.json());

// ✅ connect routes
app.use('/api/products', productRoutes);

module.exports = app;
