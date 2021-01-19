import React, {
    createContext, useContext, useState
} from 'react'
import * as themes from '../themes'

const ThemeContext = createContext({})

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(themes.light)

    function toggleTheme() {
        setTheme((theme) => theme === themes.dark ? themes.light : themes.dark)
    }

    return (
        <ThemeContext.Provider value={{
            theme,
            toggleTheme
        }}
        >
            {children}
        </ThemeContext.Provider>

    )
}

export function useTheme() {
    const context = useContext(ThemeContext)

    return context
}