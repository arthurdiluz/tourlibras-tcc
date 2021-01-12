import React from 'react'
import { Text, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import { useAuth } from '../../context/auth'

import { DARK_GRAY_COLOR, MAIN_COLOR, RED_COLOR, WHITE_COLOR } from '../../../styles.global'

function DevLanding() {
    const navigation = useNavigation()
    const { signOut } = useAuth()

    function handleGoToRegisterLecture() {
        navigation.navigate('RegisterLecture')
    }

    function handleLogout() {
        signOut()
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 20, backgroundColor: MAIN_COLOR }}>
            <Text style={{ marginBottom: 50, fontSize: 23, fontFamily: 'Poppins_700Bold', color: WHITE_COLOR, textAlign: 'center' }}>Painel do Administrador</Text>
            <RectButton
                onPress={handleGoToRegisterLecture}
                style={{
                    width: '100%',
                    backgroundColor: WHITE_COLOR,
                    borderRadius: 12,
                    padding: 7,
                    marginBottom: 10,
                    alignItems: 'center'
                }}
                rippleColor="rgba(0, 0, 0, 0.2)"
            >
                <Text style={{
                    fontSize: 18,
                    fontFamily: 'Poppins_600SemiBold',
                    color: DARK_GRAY_COLOR
                }}>Cadastrar aula</Text>
            </RectButton>
            <RectButton
                onPress={handleLogout}
                style={{
                    width: '100%',
                    backgroundColor: RED_COLOR,
                    borderRadius: 12,
                    padding: 7,
                    alignItems: 'center'
                }}
                rippleColor="rgba(0, 0, 0, 0.2)"
            >
                <Text style={{
                    fontSize: 18,
                    fontFamily: 'Poppins_600SemiBold',
                    color: WHITE_COLOR
                }}>Logout</Text>
            </RectButton>
        </View>
    )
}

export default DevLanding