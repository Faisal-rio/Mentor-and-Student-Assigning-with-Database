const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db');
const apiRoutes = require('./routes/api');

const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to the database
connectDB();

// Use API routes
app.use('/api', apiRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
