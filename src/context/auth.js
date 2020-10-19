import React, {
    createContext, useState, useEffect, useContext
} from 'react'

import AuthService from '../services/Auth'
import Database from '../services/Database'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    async function authWithFacebook() {
        setLoading(true)
        await AuthService.authWithFacebook()
    }

    async function signInWithEmail(email, password) {
        const error = await AuthService.loginWithEmail(email, password)

        return error
    }

    async function signUpWithEmail(email, password) {
        const error = await AuthService.signUpWithEmail(email, password)
        await Database.createUserDetailsOnDb(user.uid)

        return error
    }

    async function checkIfEmailExists(email) {
        const error = await AuthService.checkIfEmailExists(email)

        return error
    }

    async function passwordReset(email) {
        const error = await AuthService.passwordReset(email)

        return error
    }

    async function signOut() {
        AuthService.signOut()
    }

    useEffect(() => {
        AuthService.subscribeAuthChange(async (response) => {
            setUser(response)
            setLoading(false)

            if(response) {
                const res = await Database.checkIfExistUserDetail(response.uid)

                if(!res) {
                    await Database.createUserDetailsOnDb(response)
                }
            }
        })
    }, [])

    return (
        <AuthContext.Provider value={{
            signed: !!user,
            user,
            authWithFacebook,
            signOut,
            loading,
            checkIfEmailExists,
            signInWithEmail,
            signUpWithEmail,
            passwordReset
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
