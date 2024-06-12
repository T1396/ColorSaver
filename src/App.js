import './App.css';
import 'rc-slider/assets/index.css'
import {useCallback, useEffect, useState} from "react";
import {TextField, Button} from '@mui/material';
import useColorApi from "./hooks/useColorApi";
import useColorSelection from "./hooks/useColorSelection"
import ColorRow from "./components/ColorRow";
import ColorSliderRow from "./components/ColorSliderRow";

function App() {

    const [name, setName] = useState('')
    const { colors, fetchColors, saveColor } = useColorApi()
    const { colorValues, inputValues, handleSliderChange, handleInputChange } = useColorSelection( {
        red: 0,
        green: 0,
        blue: 0
    })

    /* fetch colors initially */
    useEffect(() => {
        fetchColors()
            .then(() => {
                console.log("Successfully fetched colors")
            })
            .catch(error => {
                console.error("Failed to fetch colors", error)
            })
    }, []);

    /* convert e.g. 0 to 000 */
    const formatValue = useCallback((value) => {
        return value.toString().padStart(3, '0');
    }, []);

    const resetName = useCallback(() => setName(''), [])

    const boxBackground = {
        backgroundColor: `rgb(${colorValues.red}, ${colorValues.green}, ${colorValues.blue})`
    };

    return (
        <div className="App">
            <div className="main-container">
                <div className="rgb-slider-box-container">
                    <div className="slider-group">
                        <ColorSliderRow
                            color="red"
                            label="Rot"
                            value={colorValues.red}
                            inputValue={inputValues.red}
                            onSliderChange={handleSliderChange}
                            onInputChange={handleInputChange} />
                        <ColorSliderRow
                            color="green"
                            label="Grün"
                            value={colorValues.green}
                            inputValue={inputValues.green}
                            onSliderChange={handleSliderChange}
                            onInputChange={handleInputChange}/>
                        <ColorSliderRow
                            color="blue"
                            label="Blau"
                            value={colorValues.blue}
                            inputValue={inputValues.blue}
                            onSliderChange={handleSliderChange}
                            onInputChange={handleInputChange}/>
                    </div>
                    <div className="color-box" style={boxBackground}/>
                </div>
                <div className="save-container">
                    <TextField
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => saveColor(name, colorValues.red, colorValues.green, colorValues.blue, resetName)}
                        style={{flex: 1, height: '56px', marginLeft: '10px'}}
                        disabled={!name}>
                        Speichern
                    </Button>
                </div>

                <div className="saved-colors">
                    <h2>Gespeicherte Farben</h2>
                    {colors.map((color) => (
                        <ColorRow key={color.id} color={color} formatValue={formatValue}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
