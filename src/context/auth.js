import React, {
    createContext, useState, useEffect, useContext
} from 'react'

import AuthService from '../services/Auth'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    async function signInWithFacebook() {
        setLoading(true)
        AuthService.loginWithFacebook()
    }

    async function signOut() {
        AuthService.signOut()
    }

    useEffect(() => {
        AuthService.subscribeAuthChange((response) => {
            setUser(response)
            setLoading(false)
        })
    }, [])

    return (
        <AuthContext.Provider value={{
            signed: !!user, user, signInWithFacebook, signOut, loading
        }}
        >
            {children}
        </AuthContext.Provider>

    )
}

export function useAuth() {
    const context = useContext(AuthContext)

    return context
}
