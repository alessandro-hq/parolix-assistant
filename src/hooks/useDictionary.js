// src/hooks/useDictionary.js
import { useState, useEffect } from 'react'

export function useDictionary() {
  const [words, setWords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/it_dic.txt')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.text()
      })
      .then(text => {
        const parsed = text
          .split('\n')
          .map(w => w.trim())
          .filter(w => w.length > 0)
        setWords(parsed)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return { words, loading, error }
}
