const Product = require('../models/Product');

const resolvers = {
  Query: {
    products: () => Product.find(),
    product: (_, { id }) => Product.findById(id),
    totalStockValue: async () => {
      const products = await Product.find();
      return products.reduce((sum, p) => sum + p.price * p.amountInStock, 0);
    },
    totalStockValueByManufacturer: async () => {
      const products = await Product.find();
      const grouped = {};
      products.forEach(p => {
        const name = p.manufacturer?.name || "Unknown";
        grouped[name] = (grouped[name] || 0) + p.price * p.amountInStock;
      });
      return Object.keys(grouped).map(name => ({
        manufacturer: name,
        totalValue: grouped[name]
      }));
    },
    lowStockProducts: () => Product.find({ amountInStock: { $lt: 10 } }),
    criticalStockProducts: async () => {
      const products = await Product.find({ amountInStock: { $lt: 5 } });
      return products.map(p => ({
        manufacturerName: p.manufacturer?.name,
        contactName: p.manufacturer?.contact?.name,
        contactPhone: p.manufacturer?.contact?.phone,
        contactEmail: p.manufacturer?.contact?.email,
      }));
    },
    manufacturers: async () => {
      const products = await Product.find();
      return products.map(p => p.manufacturer);
    }
  },
  Mutation: {
    addProduct: (_, args) => Product.create(args),
    updateProduct: (_, { id, ...rest }) => Product.findByIdAndUpdate(id, rest, { new: true }),
    deleteProduct: async (_, { id }) => {
      await Product.findByIdAndDelete(id);
      return "Deleted";
    }
  }
};

module.exports = resolvers;
