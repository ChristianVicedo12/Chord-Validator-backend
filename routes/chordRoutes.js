const express = require('express');
const router = express.Router();
const chordController = require('../controllers/chordController');
router.post('/validate', chordController.validateChords);
router.get('/list', chordController.listChords);
module.exports = router;
