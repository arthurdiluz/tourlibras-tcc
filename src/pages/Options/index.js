import React from 'react'
import { View, Text } from 'react-native'
import { RectButton, ScrollView, BorderlessButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import { Entypo } from '@expo/vector-icons'
import { useAuth } from '../../context/auth'

import styles from './styles'
import Header from '../../components/Header'

function Options() {
    const { signOut } = useAuth()
    const navigation = useNavigation()

    function handleNavigateBack() {
        navigation.goBack()
    }

    function handleSignOut() {
        signOut()
    }

    return (
        <View style={styles.container}>
            <Header
                title="Opções"
                // headerLeft={(
                //     <BorderlessButton onPress={handleNavigateBack}>
                //         <Entypo name="cross" size={30} color="rgba(0, 0, 0, 0.3)" />
                //     </BorderlessButton>
                // )}
            />
            <ScrollView style={styles.optionsContainer}>
                <View style={styles.signOutContainer}>
                    <RectButton style={styles.signOutButton} onPress={handleSignOut} title="Sign Out">
                        <Text style={styles.signOutText}>Logout</Text>
                    </RectButton>
                </View>
            </ScrollView>
        </View>
    )
}

export default Options
