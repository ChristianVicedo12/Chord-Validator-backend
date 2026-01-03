const { getChordInfo } = require('./chordMappingService');
const { validateProgression } = require('./nfaService');

function validateChordString(progressionString) {
  const chordSymbols = progressionString.split(',').map(s => s.trim()).filter(s => s.length > 0);
  if (chordSymbols.length === 0) return { success: false, error: 'No chords' };
  
  const chordData = [];
  const errors = [];
  
  for (let i = 0; i < chordSymbols.length; i++) {
    const info = getChordInfo(chordSymbols[i]);
    if (info.error) errors.push({ position: i + 1, chord: chordSymbols[i], message: info.message });
    else chordData.push(info);
  }
  
  if (errors.length > 0) return { success: false, chordErrors: errors };
  
  const result = validateProgression(chordData);
  
  // Format: "C" "I" "Tonic"
  const simplifiedChords = chordData.map(c => ({
    chord: c.chord,
    roman: c.roman,
    function: c.function.charAt(0).toUpperCase() + c.function.slice(1)
  }));
  
  return {
    success: true,
    progression: chordSymbols.join(' → '),
    chords: simplifiedChords,
    valid: result.accepted,
    message: result.accepted ? '✅ Valid progression!' : '❌ Invalid progression'
  };
}

module.exports = { validateChordString };
