import React, {
    useEffect, useRef, useState
} from 'react'
import {
    View, Text, TextInput, Keyboard, Animated, SafeAreaView, TouchableOpacity
} from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import { EvilIcons } from '@expo/vector-icons'
import { useAuth } from '../../context/auth'

import styles, {
    FOOTER_HEIGHT, ICON_SIZE
} from './styles'

export default function Login() {
    const {
        authWithFacebook, signInWithEmail
    } = useAuth()
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(undefined)

    const footerAnim = useRef(new Animated.Value(FOOTER_HEIGHT)).current

    const iconSizeAnim = useRef(new Animated.Value(ICON_SIZE)).current
    const iconOpacityAnim = useRef(new Animated.Value(1)).current
    const AnimatedEvilIcons = Animated.createAnimatedComponent(EvilIcons)

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', keyboardDidShow)
        Keyboard.addListener('keyboardDidHide', keyboardDidHide)

        return function cleanup() {
            Keyboard.removeListener('keyboardDidShow', keyboardDidShow)
            Keyboard.removeListener('keyboardDidHide', keyboardDidHide)
        }
    }, []) /* eslint-disable-line react-hooks/exhaustive-deps */

    const keyboardDidShow = (event) => {
        Animated.timing(footerAnim, {
            duration: event.duration,
            toValue: 0,
            useNativeDriver: false
        }).start()
        Animated.timing(iconSizeAnim, {
            duration: event.duration + 200,
            toValue: 0,
            useNativeDriver: false
        }).start()
        Animated.timing(iconOpacityAnim, {
            duration: event.duration + 150,
            toValue: 0,
            useNativeDriver: false
        }).start()
    }

    const keyboardDidHide = (event) => {
        Animated.timing(footerAnim, {
            duration: event.duration,
            toValue: FOOTER_HEIGHT,
            useNativeDriver: false
        }).start()
        Animated.timing(iconSizeAnim, {
            duration: event.duration + 200,
            toValue: ICON_SIZE,
            useNativeDriver: false
        }).start()
        Animated.timing(iconOpacityAnim, {
            duration: event.duration + 150,
            toValue: 1,
            useNativeDriver: false
        }).start()
    }

    async function handleEmailSignIn() {
        setLoading(true)
        const error = await signInWithEmail(email, password)

        if (error) {
            setErrorMessage(error.toString(error))
            setLoading(false)
        }
    }

    function handleNavigationToSignup() {
        navigation.navigate('Signup')
    }

    function handleForgotPassword() {
        navigation.navigate('ForgotPassword')
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <AnimatedEvilIcons name="user" style={{ fontSize: iconSizeAnim, opacity: iconOpacityAnim }} color="white" />
            </View>
            <View style={styles.formContainer}>
                <Text style={styles.headerText}>
                    Entre com a sua conta
                </Text>
                <TextInput
                    style={styles.emailInput}
                    autoCompleteType="email"
                    keyboardType="email-address"
                    placeholder="Digite seu e-mail"
                    placeholderTextColor="#FFF"
                    autoCapitalize="none"
                    onChange={(event) => {
                        setEmail(event.nativeEvent.text)
                        setErrorMessage('')
                    }}
                />
                <TextInput
                    style={styles.passwordInput}
                    autoCompleteType="password"
                    placeholder="Digite sua senha"
                    placeholderTextColor="#FFF"
                    secureTextEntry
                    onChange={(event) => {
                        setPassword(event.nativeEvent.text)
                        setErrorMessage('')
                    }}
                />
                <View style={styles.forgotPasswordContainer}>
                    <TouchableOpacity
                        disabled={loading}
                        onPress={handleForgotPassword}
                        activeOpacity={0.5}
                        style={styles.forgotPasswordButton}
                    >
                        <Text style={styles.forgotPasswordText}>Esqueci a minha senha?</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.errorContainer}>
                    <Text style={styles.errorMessage}>
                        {errorMessage}
                    </Text>
                </View>
                <RectButton
                    enabled={!loading}
                    onPress={handleEmailSignIn}
                    style={styles.signInButton}
                >
                    <Text style={styles.signInButtonText}>Entrar</Text>
                </RectButton>
                <TouchableOpacity
                    disabled={loading}
                    onPress={handleNavigationToSignup}
                    activeOpacity={0.5}
                    style={styles.createAccountButton}
                >
                    <Text style={styles.createAccountText}>Criar uma conta</Text>
                </TouchableOpacity>
            </View>
            <Animated.View style={[styles.footerContainer, { height: footerAnim }]}>
                <Text style={styles.footerText}>
                    Você também pode
                    {'\n'}
                    conectar-se com seu Facebook
                </Text>
                <RectButton enabled={!loading} onPress={authWithFacebook} style={styles.facebookButton}>
                    <Text style={styles.buttonText}>Conectar-se com o Facebook</Text>
                </RectButton>
            </Animated.View>
        </SafeAreaView>
    )
}
