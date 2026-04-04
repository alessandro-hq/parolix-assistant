// src/components/Keyboard.jsx
const ROWS = [
  ['Q','W','E','R','T','Y','U','I','O','P'],
  ['A','S','D','F','G','H','J','K','L'],
  ['Z','X','C','V','B','N','M','⌫'],
]

export default function Keyboard({ onKey, onBackspace }) {
  function handleClick(key) {
    if (key === '⌫') {
      onBackspace()
    } else {
      onKey(key)
    }
  }

  return (
    <div className="keyboard">
      {ROWS.map((row, ri) => (
        <div key={ri} className="keyboard-row">
          {row.map(key => (
            <button
              key={key}
              className={`key${key === '⌫' ? ' key--backspace' : ''}`}
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
