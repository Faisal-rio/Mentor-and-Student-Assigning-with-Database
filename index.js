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

// Serve static files (e.g., for a frontend)
app.use(express.static('public')); // Assuming you have a 'public' folder for static files

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
