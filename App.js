// import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import { AuthProvider } from './src/context/auth'

import Routes from './src/routes'

export default function App() {

    return (
        <NavigationContainer>
            <AuthProvider>
                <Routes />
            </AuthProvider>
        </NavigationContainer>
    )
}

// #708FC8
// https://medium.com/datadriveninvestor/facebook-login-with-react-native-expo-firebase-and-typescript-56df4ed6099a
// https://www.instamobile.io/react-native-tutorials/facebook-login-react-native-firebase/
