cd /workspaces/Chord-Validator-backend/ChordValidatorV2const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/chords', require('./routes/chordRoutes'));

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
  console.log(`📚 Health: http://localhost:${PORT}/health`);
  console.log(`🔗 API: http://localhost:${PORT}/api/chords/list`);
  console.log(`🔗 Validate: POST http://localhost:${PORT}/api/chords/validate`);
});

module.exports = app;
