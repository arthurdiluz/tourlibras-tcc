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

    function handleGoToEditLecture() {
        navigation.navigate('EditLecturesList')
    }

    function handleGoToEditBadge() {
        navigation.navigate('EditBadgesList')
    }

    function handleLogout() {
        signOut()
    }

    return (
        <View style={styles.container}>
            <Text style={styles.pageTitle}>Painel do Administrador</Text>
            <RectButton
                onPress={handleGoToRegisterLecture}
                style={styles.defaultButton}
                rippleColor="rgba(0, 0, 0, 0.2)"
            >
                <Text style={styles.defaultButtonText}>Cadastrar aula</Text>
            </RectButton>
            <RectButton
                onPress={handleGoToRegisterBadge}
                style={styles.defaultButton}
                rippleColor="rgba(0, 0, 0, 0.2)"
            >
                <Text style={styles.defaultButtonText}>Cadastrar medalha</Text>
            </RectButton>
            <RectButton
                onPress={handleGoToEditLecture}
                style={styles.defaultButton}
                rippleColor="rgba(0, 0, 0, 0.2)"
            >
                <Text style={styles.defaultButtonText}>Editar aula</Text>
            </RectButton>
            <RectButton
                onPress={handleGoToEditBadge}
                style={styles.defaultButton}
                rippleColor="rgba(0, 0, 0, 0.2)"
            >
                <Text style={styles.defaultButtonText}>Editar medalha</Text>
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