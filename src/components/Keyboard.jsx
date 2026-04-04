// src/components/Keyboard.jsx
const ROWS = [
  ['A','B','C','D','E','F','G','H','I'],
  ['J','K','L','M','N','O','P','Q','R'],
  ['S','T','U','V','W','X','Y','Z','⌫'],
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
