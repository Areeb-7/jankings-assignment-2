import 'dotenv/config'; // ES module way to load .env variables
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'; // Import body-parser as a default export
import connectDB from './database.js'; // Ensure .js extension for ES modules
import router from './routes/services.js';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './graphql/typeDefs.js'; // Import GraphQL type definitions
import resolvers from './graphql/resolvers.js'; // Import GraphQL resolvers

// Initialize express
const app = express();
const port = process.env.PORT || 3010;

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Use body-parser's JSON middleware
app.use(express.static('static'));

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Apply Apollo middleware to the Express app
await server.start(); // Start the Apollo Server
server.applyMiddleware({ app });

// Routes
app.use('/api/auth', (await import('./routes/auth.js')).default); // Use dynamic imports for ES modules
app.use('/api/bookings', (await import('./routes/bookings.js')).default);
app.use('/api/service-providers', router);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
