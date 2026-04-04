// src/components/AbsentLetters.jsx
export default function AbsentLetters({ letters, isActive, onActivate, onRemove }) {
  return (
    <div
      className={`absent-letters${isActive ? ' absent-letters--active' : ''}`}
      onClick={e => { e.stopPropagation(); onActivate() }}
    >
      <span className="absent-label">Lettere assenti:</span>
      <div className="absent-chips">
        {[...letters].map(letter => (
          <span key={letter} className="chip">
            {letter.toUpperCase()}
            <button
              className="chip-remove"
              onClick={e => { e.stopPropagation(); onRemove(letter) }}
              aria-label={`Rimuovi ${letter}`}
            >×</button>
          </span>
        ))}
      </div>
    </div>
  )
}
