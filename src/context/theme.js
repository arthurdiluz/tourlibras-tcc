import React, {
    createContext, useContext, useEffect, useState
} from 'react'
import Database from '../services/Database'
import * as themes from '../themes'

import { useAuth } from './auth'

const ThemeContext = createContext({})

export const ThemeProvider = ({ children }) => {
    const { user, loading, signed } = useAuth()
    const [theme, setTheme] = useState(themes.light)
    const [isDarkThemeOn, setIsDarkThemeOn] = useState(false)

    useEffect(() => {
        if(signed) {
            Database.getUserAppTheme(user.uid).then((appTheme) => {
                if(appTheme === 'dark') {
                    setTheme(themes.dark)
                    setIsDarkThemeOn(true)
                } else {
                    setTheme(themes.light)
                    setIsDarkThemeOn(false)
                }
            })
        }
    }, [user])

    useEffect(() => {
        if(!loading) {
            Database.updateUserAppTheme(user, theme.title)
        }
    }, [theme])

    function toggleTheme() {
        setTheme((theme) => {
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