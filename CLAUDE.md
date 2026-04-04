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
