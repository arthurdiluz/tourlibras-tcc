import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar'

import { useAuth } from '../context/auth'

import AppRoutes from './app.routes'
import AuthRoutes from './auth.routes'
import DevRoutes from './dev.routes'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

function Routes() {
    const { signed, loading } = useAuth()

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#708FC8" />
            </View>
        )
    }

    return signed ? (
        <>
            <AppRoutes />
            <StatusBar style='dark' />
        </>
    ) : (
            <>
                <AuthRoutes />
                <StatusBar style='light' />
            </>
        )
}

export default Routes
