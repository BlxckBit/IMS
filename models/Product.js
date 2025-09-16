const mongoose = require('mongoose');

// Contact schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String
}, { _id: false });

// Manufacturer schema
const manufacturerSchema = new mongoose.Schema({
  name: String,
  country: String,
  website: String,
  description: String,
  address: String,
  contact: contactSchema
}, { _id: false });

// Product schema
const productSchema = new mongoose.Schema({
  name: String,
  sku: String,
  description: String,
  price: Number,
  category: String,
  amountInStock: Number
});

module.exports = mongoose.model('Product', productSchema);



// manufacturer: manufacturerSchema