// src/components/Keyboard.jsx
const ROWS = [
  ['A','B','C','D','E','F','G','H','I'],
  ['J','K','L','M','N','O','P','Q','R'],
  ['S','T','U','V','W','X','Y','Z','⌫'],
]

export default function Keyboard({ onKey, onBackspace, cells, absentLetters }) {
  const placedLetters = new Set(cells.map(c => c.letter.toUpperCase()).filter(Boolean))

  function handleClick(key) {
    if (key === '⌫') {
      onBackspace()
    } else {
      onKey(key)
    }
  }

  function keyClass(key) {
    if (key === '⌫') return 'key key--backspace'
    const l = key.toUpperCase()
    if (absentLetters.has(l.toLowerCase())) return 'key key--absent'
    if (placedLetters.has(l)) return 'key key--placed'
    return 'key'
  }

  return (
    <div className="keyboard">
      {ROWS.map((row, ri) => (
        <div key={ri} className="keyboard-row">
          {row.map(key => (
            <button
              key={key}
              className={keyClass(key)}
              onClick={() => handleClick(key)}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  )
}
