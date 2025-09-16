const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const productRoutes = require('./routes/products');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

const app = express();

app.use(express.json());
app.use('/api/products', productRoutes);

// ✅ GraphQL setup
async function startApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });
}

startApolloServer();

module.exports = app;
