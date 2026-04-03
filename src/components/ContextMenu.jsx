// src/components/ContextMenu.jsx
export default function ContextMenu({ x, y, isFlagged, onFlag, onUnflag }) {
  return (
    <ul
      className="context-menu"
      style={{ position: 'fixed', top: y, left: x }}
      onClick={e => e.stopPropagation()}
    >
      {!isFlagged && (
        <li onClick={onFlag}>Lettera non esiste</li>
      )}
      {isFlagged && (
        <li onClick={onUnflag}>Lettera esiste</li>
      )}
    </ul>
  )
}
