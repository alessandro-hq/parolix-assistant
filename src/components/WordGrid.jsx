// src/components/WordGrid.jsx
export default function WordGrid({ cells, selectedIndices, onCellClick, onContextMenu }) {
  return (
    <div className="word-grid" onClick={e => e.stopPropagation()}>
      {cells.map((cell, i) => {
        const isSelected = selectedIndices.has(i)
        let className = 'cell'
        if (isSelected) className += ' cell--selected'
        if (cell.flagged) className += ' cell--flagged'

        return (
          <div
            key={i}
            className={className}
            onClick={e => onCellClick(i, e)}
            onContextMenu={e => {
              e.preventDefault()
              onContextMenu(i, e)
            }}
          >
            {cell.letter ? cell.letter.toUpperCase() : ''}
          </div>
        )
      })}
    </div>
  )
}
