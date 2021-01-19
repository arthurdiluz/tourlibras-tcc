import React from 'react'
import { View, Text } from 'react-native'
import { RectButton, ScrollView, BorderlessButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import { Entypo } from '@expo/vector-icons'
import { useAuth } from '../../context/auth'
import { useTheme } from '../../context/theme'

import styles from './styles'
import Header from '../../components/Header'

function Options() {
    const { signOut } = useAuth()
    const { theme } = useTheme()

    function handleSignOut() {
        signOut()
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Header
                title="Opções"
            />
            <ScrollView style={styles.optionsContainer}>
                <View>
                    <RectButton rippleColor={theme.colors.signOutButtonRipple} style={[styles.signOutButton, { backgroundColor: theme.colors.signOutButtonBackground }]} onPress={handleSignOut} title="Sign Out">
                        <Text style={[styles.signOutText, { color: theme.colors.signOutButtonText }]}>Logout</Text>
                    </RectButton>
                </View>
            </ScrollView>
        </View>
    )
}

export default Options
