import React, {
    createContext, useContext, useState
} from 'react'
import * as themes from '../themes'

const ThemeContext = createContext({})

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(themes.light)
    const [isDarkThemeOn, setIsDarkThemeOn] = useState(false)

    function toggleTheme() {
        setTheme((theme) => {
            theme === themes.dark ? themes.light : themes.dark
            if(theme === themes.dark) {
                setIsDarkThemeOn(false)
                return themes.light
            } else {
                setIsDarkThemeOn(true)
                return themes.dark
            }
        })
    }

    return (
        <ThemeContext.Provider value={{
            theme,
            isDarkThemeOn,
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