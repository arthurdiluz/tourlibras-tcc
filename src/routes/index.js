import React, { useEffect, useState } from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar'

import { useAuth } from '../context/auth'

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
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#708FC8" />
            </View>
        )
    }

    return signed ? (
        <>
            {
                userDetails.admin == true ? (
                    <DevRoutes />
                ) : (
                    <AppRoutes />
                )
            }
            <StatusBar style='auto' />
        </>
    ) : (
            <>
                <AuthRoutes />
                <StatusBar style='light' />
            </>
        )
}

export default Routes
