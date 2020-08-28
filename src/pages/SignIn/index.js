import React, { useEffect, useRef } from 'react'
import {
    View, Text, TextInput, Keyboard, Animated, SafeAreaView
} from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

import { EvilIcons } from '@expo/vector-icons'
import { useAuth } from '../../context/auth'

import styles, { footerHeight } from './styles'

export default function SignIn() {
    const { signInWithFacebook } = useAuth()
    const footerAnim = useRef(new Animated.Value(footerHeight)).current

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', keyboardDidShow)
        Keyboard.addListener('keyboardDidHide', keyboardDidHide)

        return function cleanup() {
            Keyboard.removeListener('keyboardDidShow', keyboardDidShow)
            Keyboard.removeListener('keyboardDidHide', keyboardDidHide)
        }
    }, [])

    const keyboardDidShow = (event) => {
        Animated.timing(footerAnim, {
            duration: event.duration,
            toValue: 0,
            useNativeDriver: false
        }).start()

    }

    const keyboardDidHide = (event) => {
        Animated.timing(footerAnim, {
            duration: event.duration,
            toValue: footerHeight,
            useNativeDriver: false
        }).start()
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <EvilIcons name="user" size={150} color="white" />
            </View>
            <View style={styles.formContainer}>
                <Text style={styles.headerText}>Entre com a sua conta</Text>
                <TextInput
                    style={styles.emailInput}
                    autoCompleteType="email"
                    keyboardType="email-address"
                    placeholder="Digite seu e-mail"
                    placeholderTextColor="#FFF"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.passwordInput}
                    autoCompleteType="password"
                    placeholder="Digite sua senha"
                    placeholderTextColor="#FFF"
                    secureTextEntry
                />
                <RectButton onPress={() => { }} style={styles.mainButton}>
                    <Text style={styles.mainButtonText}>Entrar</Text>
                </RectButton>
            </View>
            <Animated.View style={[styles.footerContainer, { height: footerAnim }]}>
                <Text style={styles.footerText}>
                    Ou entre com sua conta
                    {'\n'}
                    do facebook.
                </Text>
                <RectButton onPress={signInWithFacebook} style={styles.secondaryButton}>
                    <Text style={styles.buttonText}>Entrar com o Facebook</Text>
                </RectButton>
            </Animated.View>
        </SafeAreaView>
    )
}
