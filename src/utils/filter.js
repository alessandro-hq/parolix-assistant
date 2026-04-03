// src/utils/filter.js

/**
 * @param {string[]} words
 * @param {{
 *   length: number,
 *   knownLetters: Record<number, string>,
 *   absentLetters: Set<string>,
 *   flaggedLetters: Set<string>
 * }} spec
 * @returns {string[]}
 */
export function filterWords(words, { length, knownLetters, absentLetters, flaggedLetters }) {
  return words.filter(word => {
    // 1. Length
    if (word.length !== length) return false

    // 2. Known letters at exact positions
    for (const [pos, letter] of Object.entries(knownLetters)) {
      if (word[parseInt(pos)] !== letter) return false
    }

    // 3. Absent letters — must not appear anywhere
    for (const letter of absentLetters) {
      if (word.includes(letter)) return false
    }

    // 4. Flagged letters — must not appear outside confirmed positions
    for (const letter of flaggedLetters) {
      const confirmedPositions = new Set()
      for (const [pos, l] of Object.entries(knownLetters)) {
        if (l === letter) confirmedPositions.add(parseInt(pos))
      }
      for (let i = 0; i < word.length; i++) {
        if (word[i] === letter && !confirmedPositions.has(i)) return false
      }
    }

    return true
  })
}
