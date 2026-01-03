const CHORD_DATABASE = {
  tonic: {
    'C': { roman: 'I', degree: 1, notes: ['C', 'E', 'G'], quality: 'major', function: 'tonic' },
    'Em': { roman: 'iii', degree: 3, notes: ['E', 'G', 'B'], quality: 'minor', function: 'tonic' },
    'Am': { roman: 'vi', degree: 6, notes: ['A', 'C', 'E'], quality: 'minor', function: 'tonic' },
  },
  predominant: {
    'Dm': { roman: 'ii', degree: 2, notes: ['D', 'F', 'A'], quality: 'minor', function: 'predominant' },
    'F': { roman: 'IV', degree: 4, notes: ['F', 'A', 'C'], quality: 'major', function: 'predominant' },
  },
  dominant: {
    'G': { roman: 'V', degree: 5, notes: ['G', 'B', 'D'], quality: 'major', function: 'dominant' },
    'G7': { roman: 'V7', degree: 5, notes: ['G', 'B', 'D', 'F'], quality: 'dominant7', function: 'dominant' },
  }
};
const CHORD_LOOKUP = {};
Object.values(CHORD_DATABASE).forEach(category => {
  Object.entries(category).forEach(([chord, data]) => {
    CHORD_LOOKUP[chord.toLowerCase()] = data;
  });
});
function getChordInfo(chordSymbol) {
  const normalized = chordSymbol.trim().toLowerCase();
  const chordData = CHORD_LOOKUP[normalized];
  if (!chordData) return { error: true, message: 'Unknown chord: ' + chordSymbol };
  return { error: false, chord: chordSymbol, ...chordData };
}
function getChordsByFunction(functionName) {
  return CHORD_DATABASE[functionName] || {};
}
module.exports = { CHORD_DATABASE, getChordInfo, getChordsByFunction };
