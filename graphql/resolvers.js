const Product = require('../models/Product');

const resolvers = {
  Query: {
    products: async () => await Product.find(),

    product: async (_, { id }) => await Product.findById(id),

    totalStockValue: async () => {
      const products = await Product.find();
      return products.reduce((sum, p) => sum + (p.price || 0) * (p.amountInStock || 0), 0);
    },

    totalStockValueByManufacturer: async () => {
      const products = await Product.find();
      const grouped = {};
      products.forEach(p => {
        const name = p.manufacturer?.name || "Unknown";
        grouped[name] = (grouped[name] || 0) + (p.price || 0) * (p.amountInStock || 0);
      });
      return Object.keys(grouped).map(name => ({
        manufacturer: name,
        totalValue: grouped[name]
      }));
    },

    lowStockProducts: async () => await Product.find({ amountInStock: { $lt: 151 } }),

    criticalStockProducts: async () => {
      const products = await Product.find({ amountInStock: { $lt: 5 } });
      return products.map(p => ({
        manufacturerName: p.manufacturer?.name || "Unknown",
        contactName: p.manufacturer?.contact?.name || "N/A",
        contactPhone: p.manufacturer?.contact?.phone || "N/A",
        contactEmail: p.manufacturer?.contact?.email || "N/A",
      }));
    },

    manufacturers: async () => {
      const products = await Product.find();
      return products.map(p => p.manufacturer).filter(Boolean);
    }
  },

  Mutation: {
    addProduct: async (_, args) => await Product.create(args),

    updateProduct: async (_, { id, ...rest }) =>
      await Product.findByIdAndUpdate(id, rest, { new: true }),

    deleteProduct: async (_, { id }) => {
      await Product.findByIdAndDelete(id);
      return "Deleted";
    }
  }
};

module.exports = resolvers;
