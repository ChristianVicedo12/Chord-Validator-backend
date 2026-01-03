const NFA_DEFINITION = {
  states: ['q0', 'q1', 'q2', 'q3', 'q_reject'],
  startState: 'q0',
  acceptStates: ['q1'],
  transitions: {
    q0: { 'I': 'q1', 'iii': 'q1', 'vi': 'q1' },
    q1: { 'I': 'q1', 'iii': 'q1', 'vi': 'q1', 'ii': 'q2', 'IV': 'q2', 'V': 'q3' },
    q2: { 'V': 'q3' },
    q3: { 'V': 'q3', 'I': 'q1', 'iii': 'q1', 'vi': 'q1' },
    q_reject: {}
  }
};
function transition(currentState, romanNumeral) {
  if (currentState === 'q_reject') return 'q_reject';
  return NFA_DEFINITION.transitions[currentState]?.[romanNumeral] || 'q_reject';
}
function validateProgression(chords) {
  let currentState = NFA_DEFINITION.startState;
  const trace = [];
  for (let i = 0; i < chords.length; i++) {
    const chord = chords[i];
    const previousState = currentState;
    currentState = transition(currentState, chord.roman);
    trace.push({ step: i + 1, chord: chord.chord, roman: chord.roman, function: chord.function, previousState, currentState });
    if (currentState === 'q_reject') return { valid: false, finalState: currentState, accepted: false, trace };
  }
  const accepted = NFA_DEFINITION.acceptStates.includes(currentState);
  return { valid: accepted, finalState: currentState, accepted, trace };
}
module.exports = { NFA_DEFINITION, validateProgression };
