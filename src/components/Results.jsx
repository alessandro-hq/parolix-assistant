// src/components/Results.jsx
export default function Results({ results }) {
  if (results === null) {
    return (
      <div className="results">
        <h2 className="results-header">Risultati</h2>
        <p className="results-empty">Premi 'Cerca' per avviare la ricerca.</p>
      </div>
    )
  }

  return (
    <div className="results">
      <h2 className="results-header">
        Risultati
        <span className="results-count">{results.length} parole</span>
      </h2>
      {results.length === 0 ? (
        <p className="results-empty">Nessuna parola trovata.</p>
      ) : (
        <ul className="results-list">
          {results.map(word => (
            <li key={word} className="results-item">{word}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
