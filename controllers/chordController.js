const { validateChordString } = require('../services/validationService');
const { getChordsByFunction } = require('../services/chordMappingService');
const validateChords = async (req, res, next) => {
  try {
    const { progression } = req.body;
    if (!progression) return res.status(400).json({ success: false, error: 'Progression required' });
    const result = validateChordString(progression);
    res.json(result);
  } catch (error) { next(error); }
};
const listChords = async (req, res, next) => {
  try {
    res.json({ success: true, chords: { tonic: getChordsByFunction('tonic'), predominant: getChordsByFunction('predominant'), dominant: getChordsByFunction('dominant') } });
  } catch (error) { next(error); }
};
module.exports = { validateChords, listChords };
