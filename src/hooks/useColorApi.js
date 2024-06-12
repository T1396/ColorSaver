// hooks/useColorApi.js
import {useCallback, useState} from 'react'

const useColorApi = () => {
    const [colors, setColors] = useState([])

    const fetchColors = useCallback(async () => {
        try {
            const response = await fetch('https://wrapped-finishes.000webhostapp.com/get_colors.php')
            if (!response.ok) {
                throw new Error(`Network response error. Status: ${response.status}`)
            }
            const data = await response.json()
            setColors(data)
        } catch (error) {
            console.error("Error fetching colors", error)
        }
    }, [])

    const saveColor = async (name, red, green, blue, resetName) => {
        try {
            const response = await fetch('https://wrapped-finishes.000webhostapp.com/save_color.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `name=${name}&red=${red}&green=${green}&blue=${blue}`
            })
            if (!response.ok) {
                throw new Error(`Network response error. Status: ${response.status}`)
            }
            await response.text()
            // fetch colors when a new one is saved
            await fetchColors()
            resetName() // reset text field
        } catch (error) {
            console.error("Error saving color", error)
        }
    }

    return { colors, fetchColors, saveColor }
}

export default useColorApi

