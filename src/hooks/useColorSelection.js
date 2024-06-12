import {useCallback, useState} from "react";

function useColorSelection(initialColors) {
    const [colorValues, setColorValues] = useState(initialColors)
    const [inputValues, setInputValues] = useState({
        red: initialColors.red.toString(),
        green: initialColors.green.toString(),
        blue: initialColors.blue.toString()
    });

    const handleSliderChange = useCallback((color, value) => {
        setColorValues(prevState => ({ ...prevState, [color]: value }));
        setInputValues(prevState => ({ ...prevState, [color]: value.toString() }));
    }, []);

    const handleInputChange = useCallback((color, value) => {
        setInputValues(prevState => ({...prevState, [color]: value}))
        const number = parseInt(value, 10);
        if (!isNaN(number) && number >= 0 && number <= 255) {
            setColorValues(prevState => ({...prevState, [color]: number}));
        } else if (value === '') {
            setColorValues(prevState => ({...prevState, [color]: 0}));
        }
    }, []);

    return { colorValues, inputValues, handleSliderChange, handleInputChange }
}

export default useColorSelection