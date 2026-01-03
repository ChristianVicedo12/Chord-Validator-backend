cat > server.js << 'EOF'
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/database');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to Database
connectDB();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/chords', require('./routes/chordRoutes'));
app.use('/api/progressions', require('./routes/progressionRoutes'));

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Chord Validator API is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling
app.use(require('./middleware/errorHandler'));

// Start server
app.listen(PORT, () => {
  console.log(`🎵 Chord Validator API running on port ${PORT}`);
  console.log(`📚 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 API endpoint: http://localhost:${PORT}/api/chords`);
});

module.exports = app;
EOF