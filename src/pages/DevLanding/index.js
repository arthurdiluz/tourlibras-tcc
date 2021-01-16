import React from 'react'
import { Text, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import { useAuth } from '../../context/auth'

import styles from './styles'

function DevLanding() {
    const navigation = useNavigation()
    const { signOut } = useAuth()

    function handleGoToRegisterLecture() {
        navigation.navigate('RegisterLecture')
    }

    function handleGoToRegisterBadge() {
        navigation.navigate('RegisterBadge')
    }

    function handleLogout() {
        signOut()
    }

    return (
        <View style={styles.container}>
            <Text style={styles.pageTitle}>Painel do Administrador</Text>
            <RectButton
                onPress={handleGoToRegisterLecture}
                style={styles.registerLectureButton}
                rippleColor="rgba(0, 0, 0, 0.2)"
            >
                <Text style={styles.registerLectureButtonText}>Cadastrar aula</Text>
            </RectButton>
            <RectButton
                onPress={handleGoToRegisterBadge}
                style={styles.registerBadgeButton}
                rippleColor="rgba(0, 0, 0, 0.2)"
            >
                <Text style={styles.registerBadgeButtonText}>Cadastrar medalha</Text>
            </RectButton>
            <RectButton
                onPress={handleLogout}
                style={styles.logoutButton}
                rippleColor="rgba(0, 0, 0, 0.2)"
            >
                <Text style={styles.logoutButtonText}>Logout</Text>
            </RectButton>
        </View>
    )
}

export default DevLanding