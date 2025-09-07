const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes di test
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'A20 Travel API is running!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 A20 Travel Server running on port ${PORT}`);
  console.log(`🗄️ Connected to: ${process.env.SUPABASE_URL}`);
});
