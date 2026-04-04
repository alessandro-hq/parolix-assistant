// src/App.jsx
import { useState, useCallback, useEffect } from 'react'
import { useDictionary } from './hooks/useDictionary'
import { filterWords } from './utils/filter'
import WordGrid from './components/WordGrid'
import AbsentLetters from './components/AbsentLetters'
import Keyboard from './components/Keyboard'
import Results from './components/Results'
import './App.css'

export default function App() {
  const { words, loading, error } = useDictionary()
  const [wordLength, setWordLength] = useState(null)
  const [lengthInput, setLengthInput] = useState('')
  const [cells, setCells] = useState([])
  const [selectedIndices, setSelectedIndices] = useState(new Set())
  const [absentLetters, setAbsentLetters] = useState(new Set())
  const [activeInput, setActiveInput] = useState('grid')
  const [results, setResults] = useState(null)

  // Confirm word length and initialise cells
  function handleConfirmLength() {
    const n = parseInt(lengthInput, 10)
    if (isNaN(n) || n < 2 || n > 26) return
    setWordLength(n)
    setCells(Array.from({ length: n }, () => ({ letter: '' })))
    setSelectedIndices(new Set())
    setAbsentLetters(new Set())
    setResults(null)
    setActiveInput('grid')
  }

  // Reset everything
  function handleReset() {
    setWordLength(null)
    setLengthInput('')
    setCells([])
    setSelectedIndices(new Set())
    setAbsentLetters(new Set())
    setResults(null)
    setActiveInput('grid')
  }

  // Handle letter input from keyboard (virtual or physical)
  const handleKey = useCallback((letter) => {
    if (activeInput === 'absent') {
      const l = letter.toLowerCase()
      setAbsentLetters(prev => new Set([...prev, l]))
      return
    }
    if (selectedIndices.size === 0) return
    setCells(prev => {
      const next = [...prev]
      for (const i of selectedIndices) {
        next[i] = { letter: letter.toLowerCase() }
      }
      return next
    })
  }, [activeInput, selectedIndices])

  const handleBackspace = useCallback(() => {
    if (activeInput === 'grid') {
      setCells(prev => {
        const next = [...prev]
        for (const i of selectedIndices) {
          next[i] = { letter: '' }
        }
        return next
      })
    }
  }, [activeInput, selectedIndices])

  // Physical keyboard listener
  useEffect(() => {
    function onKeyDown(e) {
      if (wordLength === null) return
      if (e.key === 'Backspace' || e.key === 'Delete') {
        e.preventDefault()
        handleBackspace()
        return
      }
      if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
        handleKey(e.key)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [wordLength, handleKey, handleBackspace])

  // Search: all placed letters are automatically excluded from other positions
  function handleSearch() {
    const knownLetters = {}
    const flaggedLetters = new Set()
    cells.forEach((cell, i) => {
      if (cell.letter) {
        knownLetters[i] = cell.letter
        flaggedLetters.add(cell.letter)
      }
    })
    const filtered = filterWords(words, {
      length: wordLength,
      knownLetters,
      absentLetters,
      flaggedLetters,
    })
    setResults([...filtered].sort())
  }

  function handleCellClick(index, e) {
    setActiveInput('grid')
    if (e.shiftKey && selectedIndices.size > 0) {
      const first = Math.min(...selectedIndices)
      const last = index
      const [lo, hi] = [Math.min(first, last), Math.max(first, last)]
      const range = new Set()
      for (let i = lo; i <= hi; i++) range.add(i)
      setSelectedIndices(range)
    } else {
      setSelectedIndices(new Set([index]))
    }
  }

  function handleRemoveAbsent(letter) {
    setAbsentLetters(prev => {
      const next = new Set(prev)
      next.delete(letter)
      return next
    })
  }

  function handleActivateAbsent() {
    setActiveInput('absent')
    setSelectedIndices(new Set())
  }

  if (loading) return <div className="loading">Caricamento dizionario...</div>
  if (error) return <div className="error">Errore: {error}</div>

  if (wordLength === null) {
    return (
      <div className="setup-screen">
        <h1>Assistente Parolix</h1>
        <p className="setup-prompt">Quante lettere ha la parola?</p>
        <div className="setup-input-row">
          <input
            type="number"
            min="2"
            max="26"
            value={lengthInput}
            onChange={e => setLengthInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleConfirmLength()}
            autoFocus
            className="length-input"
          />
          <button onClick={handleConfirmLength} className="btn-primary">Conferma</button>
        </div>
      </div>
    )
  }

  // Main UI
  return (
    <div
      className="app-layout"
      onClick={() => {
        setSelectedIndices(new Set())
        setActiveInput('grid')
      }}
    >
      <header className="app-header">
        <h1>Assistente Parolix</h1>
      </header>
      <div className="main-columns">
        <div className="left-panel">
          <WordGrid
            cells={cells}
            selectedIndices={selectedIndices}
            onCellClick={handleCellClick}
          />
          <AbsentLetters
            letters={absentLetters}
            isActive={activeInput === 'absent'}
            onActivate={handleActivateAbsent}
            onRemove={handleRemoveAbsent}
          />
          <Keyboard onKey={handleKey} onBackspace={handleBackspace} cells={cells} absentLetters={absentLetters} />
          <div className="action-buttons">
            <button className="btn-primary" onClick={handleSearch}>Cerca</button>
            <button className="btn-secondary" onClick={handleReset}>Ricomincia</button>
          </div>
        </div>
        <div className="right-panel">
          <Results results={results} />
        </div>
      </div>
    </div>
  )
}
