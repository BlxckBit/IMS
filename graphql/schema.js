const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Contact {
    name: String
    email: String
    phone: String
  }

  type Manufacturer {
    name: String
    country: String
    website: String
    description: String
    address: String
    contact: Contact
  }

  type Product {
    id: ID!
    name: String
    sku: String
    description: String
    price: Float
    category: String
    amountInStock: Int
    manufacturer: Manufacturer
  }

  type Query {
    products: [Product]
    product(id: ID!): Product
    totalStockValue: Float
    totalStockValueByManufacturer: [StockValueByManufacturer]
    lowStockProducts: [Product]
    criticalStockProducts: [CriticalProduct]
    manufacturers: [Manufacturer]
  }

  type StockValueByManufacturer {
    manufacturer: String
    totalValue: Float
  }

  type CriticalProduct {
    manufacturerName: String
    contactName: String
    contactPhone: String
    contactEmail: String
  }

  type Mutation {
    addProduct(
      name: String!
      sku: String
      description: String
      price: Float
      category: String
      amountInStock: Int
      manufacturer: ManufacturerInput
    ): Product

    updateProduct(
      id: ID!
      name: String
      sku: String
      description: String
      price: Float
      category: String
      amountInStock: Int
      manufacturer: ManufacturerInput
    ): Product

    deleteProduct(id: ID!): String
  }

  input ContactInput {
    name: String
    email: String
    phone: String
  }

  input ManufacturerInput {
    name: String
    country: String
    website: String
    description: String
    address: String
    contact: ContactInput
  }
`;

module.exports = typeDefs;
