// ColorRow.js
import React from 'react'

/** Row to display a saved color (rgb values, colorbox and name) */
const ColorRow = React.memo(({ color, formatValue }) => {
    return (
        <div className="saved-color-item">
            <strong
                className="color-rgb-text-style">R {formatValue(color.red)} G {formatValue(color.green)} B {formatValue(color.blue)}</strong>
            <div className="color-box-small"
                 style={{ backgroundColor: `rgb(${color.red}, ${color.green}, ${color.blue}`}}></div>
            <span className="color-name-style">{color.name}</span>
        </div>
    )
})

export default ColorRow