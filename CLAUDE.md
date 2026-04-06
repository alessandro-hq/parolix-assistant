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
- Celle sempre su una singola riga (nowrap), si scalano proporzionalmente fino a 20 lettere
- Font size celle usa `clamp()` per scalare su parole lunghe
- Celle cliccabili; shift+click seleziona un range
- Click su cella attiva input da tastiera per quella posizione
- Click su sfondo deseleziona tutto

### Logica di filtro (`src/utils/filter.js`)
- **length**: filtra per lunghezza esatta
- **knownLetters**: lettere in posizione esatta
- **absentLetters**: lettere assenti dalla parola (inserite manualmente)
- **flaggedLetters**: lettere che devono comparire SOLO nelle posizioni confermate — auto-calcolate da tutte le lettere piazzate nella griglia. Se una lettera è piazzata, non può comparire in altre posizioni della parola.

### Tastiera virtuale (`src/components/Keyboard.jsx`)
- Layout alfabetico A–Z in 2 righe: A–M sopra, N–Z + ⌫ sotto
- Tasti `flex: 1` — si adattano a qualsiasi larghezza schermo
- **Colori stato lettere** (si aggiornano in tempo reale):
  - Grigio (`key--placed`): lettera inserita nella griglia
  - Rosso (`key--absent`): lettera marcata come assente
  - Assente ha priorità su piazzata se entrambe presenti
- Tastiera fisica supportata tramite `keydown` listener

### Pulsanti azione
- Ordine: **Ricomincia** (sinistra, secondario) — **Cerca** (destra, primario)

### Lettere assenti (`src/components/AbsentLetters.jsx`)
- Click sul pannello "Assenti" attiva input per quelle lettere
- Chip removibili con ×
- Bordo blu quando attivo

### Risultati (`src/components/Results.jsx`)
- Lista ordinata alfabeticamente
- Mostra conteggio parole trovate
- Nessun override font — usa DM Sans come tutto il resto

### Layout
- Desktop: 2fr (sinistra interattiva) + 1fr (risultati destra)
- Pannello sinistro fisso — non scrolla mai (`height: 100vh; overflow: hidden` su `.app-layout`)
- Solo il pannello destro con i risultati scrolla
- Mobile (≤767px): colonna singola, tutto naturalmente scrollabile, `app-layout` torna a `height: auto`

### Font
- **DM Sans** peso 400 (regular) caricato da Google Fonts — identico su tutti i dispositivi e OS
- Un solo peso importato (`wght@400`) per velocità di caricamento
- Nessun `font-weight` superiore a 400 usato nell'app
- Non usare Calibri: è un font Microsoft, non disponibile su Mac/iOS/Android senza Office

### Decisioni di design notevoli
- Nessun menu contestuale — rimosso perché inaffidabile su React 19 (synthetic events non chiamano `preventDefault` su div)
- Le lettere piazzate vengono auto-escluse da altre posizioni (flaggedLetters) senza input manuale
- Il risultato `.results-item` non ha `font-family: monospace` — era un override che nascondeva DM Sans
