# Assistente Parolix

Tool web personale per risolvere enigmi Parolix filtrando il dizionario italiano.

## Stack
- React 18 + Vite
- JavaScript ES2020+
- Vitest + @testing-library/react per i test
- Hosted su Vercel via GitHub (username: alessandro-hq)

## File chiave
- `public/it_dic.txt` — dizionario sorgente (non modificare)
- `src/utils/filter.js` — logica di filtro pura (core del progetto)
- `src/hooks/useDictionary.js` — caricamento dizionario in memoria
- `src/App.jsx` — tutto lo stato dell'app

## Requisiti
Leggi `../PRD_Parolix_Assistant.md` per i requisiti completi.
Leggi `../DEPLOYMENT.md` per stack e istruzioni di deploy.

## Convenzioni
- Tutto il testo UI in italiano
- Tutto il filtering lato client, nessuna chiamata API
- Il dizionario viene caricato una volta sola al mount e tenuto in memoria
- Nessuna lettera accentata (non presente nel dizionario sorgente)

## Comandi
- `npm run dev` — server locale su http://localhost:5173
- `npm run build` — build di produzione
- `npm run test` — esegui i test una volta
- `npm run test:watch` — test in modalità watch

---

## Funzionalità implementate

### Griglia parola
- L'utente inserisce il numero di lettere al setup (2–26)
- Celle cliccabili; shift+click seleziona un range
- Click su cella attiva input da tastiera per quella posizione
- Click su sfondo deseleziona tutto

### Logica di filtro (`src/utils/filter.js`)
- **length**: filtra per lunghezza esatta
- **knownLetters**: lettere in posizione esatta
- **absentLetters**: lettere assenti dalla parola (inserite manualmente)
- **flaggedLetters**: lettere che devono comparire SOLO nelle posizioni confermate — auto-calcolate da tutte le lettere piazzate nella griglia. Se una lettera è piazzata, non può comparire in altre posizioni della parola.

### Tastiera virtuale (`src/components/Keyboard.jsx`)
- Layout alfabetico A–Z (3 righe da 9), backspace in fondo a destra
- Tasti `flex: 1` — si adattano a qualsiasi larghezza schermo
- **Colori stato lettere**:
  - Grigio: lettera inserita nella griglia
  - Rosso: lettera marcata come assente
  - Si aggiorna in tempo reale ad ogni interazione
- Tastiera fisica supportata tramite `keydown` listener

### Lettere assenti (`src/components/AbsentLetters.jsx`)
- Click sul pannello "Assenti" attiva input per quelle lettere
- Chip removibili con ×
- Bordo blu quando attivo

### Risultati (`src/components/Results.jsx`)
- Lista ordinata alfabeticamente
- Mostra conteggio parole trovate
- Pannello destro scrollabile indipendentemente

### Layout
- Desktop: 2fr (sinistra interattiva) + 1fr (risultati destra)
- Pannello sinistro fisso — non scrolla mai
- Solo il pannello destro con i risultati scrolla
- Mobile (≤767px): colonna singola, tutto naturalmente scrollabile
- Font: DM Sans (Google Fonts)

### Decisioni di design notevoli
- Nessun menu contestuale — rimosso perché inaffidabile su React 19
- Le lettere piazzate vengono auto-escluse da altre posizioni (flaggedLetters) senza bisogno di input manuale dall'utente
- `height: 100vh; overflow: hidden` su `.app-layout` per fissare il pannello sinistro su desktop
