const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// 1. Connect to the Database
connectDB();

// 2. Middleware
app.use(cors()); 
app.use(express.json()); 
app.use('/api/users', require('./routes/UserRoutes'));
app.use('/api/customers', require('./routes/CustomerRoutes'));


// 3. Test Route
app.get('/', (req, res) => {
    res.send("API is running...");
});

// 4. Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
