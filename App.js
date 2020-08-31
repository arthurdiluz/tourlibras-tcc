import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { AppLoading } from 'expo'
import {
    Poppins_400Regular, /* eslint-disable-line camelcase */
    Poppins_700Bold, /* eslint-disable-line camelcase */
    Poppins_600SemiBold, /* eslint-disable-line camelcase */
    useFonts
} from '@expo-google-fonts/poppins'

import { AuthProvider } from './src/context/auth'

import Routes from './src/routes'

export default function App() {
    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_600SemiBold,
        Poppins_700Bold
    })

    if (!fontsLoaded) {
        return <AppLoading />
    }

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
