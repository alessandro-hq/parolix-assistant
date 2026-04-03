import { describe, it, expect } from 'vitest'
import { filterWords } from './filter'

const words = ['casale', 'casare', 'casata', 'mango', 'riso', 'anatra', 'bello']

describe('filterWords — length', () => {
  it('keeps only words of exact length', () => {
    const result = filterWords(words, { length: 6, knownLetters: {}, absentLetters: new Set(), flaggedLetters: new Set() })
    expect(result).toEqual(['casale', 'casare', 'casata', 'anatra'])
  })
})

describe('filterWords — knownLetters', () => {
  it('requires letter at exact position', () => {
    const result = filterWords(['casale', 'casare', 'casata', 'anatra'], {
      length: 6,
      knownLetters: { 0: 'c' },
      absentLetters: new Set(),
      flaggedLetters: new Set(),
    })
    expect(result).toEqual(['casale', 'casare', 'casata'])
  })

  it('requires multiple letters at multiple positions', () => {
    const result = filterWords(['casale', 'casare', 'casata', 'anatra'], {
      length: 6,
      knownLetters: { 0: 'c', 4: 'l' },
      absentLetters: new Set(),
      flaggedLetters: new Set(),
    })
    expect(result).toEqual(['casale'])
  })
})

describe('filterWords — absentLetters', () => {
  it('excludes words containing absent letter', () => {
    const result = filterWords(['casale', 'casare', 'casata', 'anatra'], {
      length: 6,
      knownLetters: {},
      absentLetters: new Set(['r']),
      flaggedLetters: new Set(),
    })
    expect(result).toEqual(['casale', 'casata'])
  })
})

describe('filterWords — flaggedLetters', () => {
  it('excludes words with flagged letter in non-confirmed positions', () => {
    // 'a' flagged, confirmed at position 1
    // 'anatra' has 'a' at positions 0,2,4 — none confirmed → excluded
    // 'casata' has 'a' at positions 1,3,5 — position 1 confirmed, 3 and 5 not → excluded
    // 'casale' has 'a' at positions 1,3 — position 1 confirmed, 3 not → excluded
    // No words match this constraint
    const result = filterWords(['casale', 'casata', 'anatra'], {
      length: 6,
      knownLetters: { 1: 'a' },
      absentLetters: new Set(),
      flaggedLetters: new Set(['a']),
    })
    expect(result).toEqual([])
  })

  it('allows flagged letter in multiple confirmed positions', () => {
    // 'a' flagged, confirmed at positions 1 AND 3
    // 'cabala' = c-a-b-a-l-a → has 'a' at positions 1,3,5 — position 5 is NOT confirmed → excluded
    const words6 = ['cabala']
    const result = filterWords(words6, {
      length: 6,
      knownLetters: { 1: 'a', 3: 'a' },
      absentLetters: new Set(),
      flaggedLetters: new Set(['a']),
    })
    expect(result).toEqual([])
  })

  it('includes word where flagged letter only appears at confirmed positions', () => {
    // 'a' flagged, confirmed at positions 1 AND 3
    // 'cabaca' = c-a-b-a-c-a → has 'a' at positions 1,3,5 — position 5 is NOT confirmed → excluded
    // 'cabaco' = c-a-b-a-c-o → has 'a' at positions 1,3 only — both confirmed → included
    const wordsTest = ['cabaco', 'cabaca']
    const result = filterWords(wordsTest, {
      length: 6,
      knownLetters: { 1: 'a', 3: 'a' },
      absentLetters: new Set(),
      flaggedLetters: new Set(['a']),
    })
    expect(result).toEqual(['cabaco'])
  })
})

describe('filterWords — empty spec', () => {
  it('returns all words of correct length when no constraints', () => {
    const result = filterWords(['riso', 'mango', 'bello'], {
      length: 5,
      knownLetters: {},
      absentLetters: new Set(),
      flaggedLetters: new Set(),
    })
    expect(result).toEqual(['mango', 'bello'])
  })
})
