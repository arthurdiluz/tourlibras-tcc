import React, { useEffect, useState } from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar'

import { useAuth } from '../context/auth'
import { useTheme } from '../context/theme'

import AppRoutes from './app.routes'
import AuthRoutes from './auth.routes'
import DevRoutes from './dev.routes'
import Database from '../services/Database'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

function Routes() {
    const { theme } = useTheme()
    const { signed, loading, user } = useAuth()
    const [userDetails, setUserDetails] = useState({})

    useEffect(() => {
        if(signed == true) {
            Database.getUserDetailsOnce(user.uid).then(response => {
                setUserDetails(response)
            })
        }
    }, [signed])

    if (loading) {
        return (
            <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
                <ActivityIndicator size="large" color={theme.colors.main} />
            </View>
        )
    }

    return signed ? (
        <>
            {
                userDetails.admin == true ? (
                    <>
                        <DevRoutes />
                        <StatusBar style='auto' />
                    </>
                ) : (
                    <>
                        <AppRoutes />
                        <StatusBar style={theme.colors.statusBar} />
                    </>
                )
            }
        </>
    ) : (
            <>
                <AuthRoutes />
                <StatusBar style='light' />
            </>
        )
}

export default Routes
