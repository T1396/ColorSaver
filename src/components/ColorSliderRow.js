import React from 'react';
import Slider from 'rc-slider';
import { TextField } from '@mui/material';

/** Displays the sliders to edit the color, with Color-Name Label and TextField */
const ColorSliderRow = ({ color, label, value, inputValue, onSliderChange, onInputChange }) => {
    return (
        <div className="slider-container">
            <div className="color-name-label">{label}</div>
            <Slider
                min={0}
                max={255}
                value={value}
                onChange={(newValue) => onSliderChange(color, newValue)}
            />
            <TextField
                type="number"
                value={inputValue}
                onChange={(e) => onInputChange(color, e.target.value)}
                inputProps={{
                    min: 0,
                    max: 255,
                    style: {textAlign: 'center'}
                }}
                style={{width: '100px', marginLeft: '10px'}}
            />
        </div>
    );
};

export default ColorSliderRow;