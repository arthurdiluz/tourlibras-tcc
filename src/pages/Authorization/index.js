import React, {
    useEffect, useRef, useState, useCallback
} from 'react'
import {
    View, Text, TextInput, Keyboard, Animated, SafeAreaView, TouchableOpacity
} from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import { EvilIcons } from '@expo/vector-icons'
import { debounce } from 'lodash'
import { useAuth } from '../../context/auth'

import styles, {
    FOOTER_HEIGHT, MAIN_COLOR, SECONDARY_COLOR, WHITE_COLOR
} from './styles'

export default function Authorization() {
    const {
        authWithFacebook, checkIfEmailExists, signInWithEmail, signUpWithEmail
    } = useAuth()
    const navigation = useNavigation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [activateSignUpButton, setActivateSignUpButton] = useState(false)
    const [errorMessage, setErrorMessage] = useState(undefined)

    const footerAnim = useRef(new Animated.Value(FOOTER_HEIGHT)).current
    const buttonAnim = useRef(new Animated.Value(0)).current
    const AnimatedButton = Animated.createAnimatedComponent(RectButton)

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', keyboardDidShow)
        Keyboard.addListener('keyboardDidHide', keyboardDidHide)

        return function cleanup() {
            Keyboard.removeListener('keyboardDidShow', keyboardDidShow)
            Keyboard.removeListener('keyboardDidHide', keyboardDidHide)
        }
    }, []) /* eslint-disable-line react-hooks/exhaustive-deps */

    const delayedEmailQuery = useCallback(debounce(checkIfEmailExistsOnDatabase, 1000), [email]) /* eslint-disable-line */
    useEffect(() => {

        if (email !== '') {
            delayedEmailQuery()
        }

        return delayedEmailQuery.cancel
    }, [email, delayedEmailQuery])

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
            toValue: FOOTER_HEIGHT,
            useNativeDriver: false
        }).start()
    }

    async function checkIfEmailExistsOnDatabase() {
        let response
        try {
            response = await checkIfEmailExists(email)
        } catch (error) {
            setErrorMessage(error.toString(error))
            return
        }

        if (response === false) {
            Animated.timing(buttonAnim, {
                duration: 200,
                toValue: 1,
                useNativeDriver: false
            }).start()
            setActivateSignUpButton(true)
        } else {
            Animated.timing(buttonAnim, {
                duration: 200,
                toValue: 0,
                useNativeDriver: false
            }).start()
            setActivateSignUpButton(false)
        }
    }

    async function handleEmailSignIn() {
        const error = await signInWithEmail(email, password)

        if (error) {
            setErrorMessage(error.toString(error))
        }
    }

    async function handleEmailSignUp() {
        const error = await signUpWithEmail(email, password)

        if (error) {
            setErrorMessage(error.toString(error))
        }
    }

    async function handleForgotPassword() {
        navigation.navigate('ForgotPassword')
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <EvilIcons name="user" size={150} color="white" />
            </View>
            <View style={styles.formContainer}>
                <Text style={styles.headerText}>
                    Cadastre-se ou entre
                    {'\n'}
                    com a sua conta
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
                <View style={styles.errorContainer}>
                    <Text style={styles.errorMessage}>
                        {errorMessage}
                    </Text>
                </View>
                <AnimatedButton
                    onPress={activateSignUpButton ? handleEmailSignUp : handleEmailSignIn}
                    style={[
                        styles.signInButton,
                        {
                            backgroundColor: buttonAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [WHITE_COLOR, SECONDARY_COLOR]
                            })
                        }
                    ]}
                >
                    <Animated.Text style={[styles.signInButtonText, {
                        color: buttonAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [MAIN_COLOR, WHITE_COLOR]
                        })
                    }]}
                    >
                        { activateSignUpButton ? 'Criar conta' : 'Entrar'}
                    </Animated.Text>
                </AnimatedButton>
                <TouchableOpacity
                    onPress={handleForgotPassword}
                    activeOpacity={0.5}
                    style={styles.forgotPasswordButton}
                >
                    <Text style={styles.forgotPasswordText}>Esqueci a minha senha</Text>
                </TouchableOpacity>
            </View>
            <Animated.View style={[styles.footerContainer, { height: footerAnim }]}>
                <Text style={styles.footerText}>
                    Você também pode
                    {'\n'}
                    conectar-se com seu Facebook
                </Text>
                <RectButton onPress={authWithFacebook} style={styles.facebookButton}>
                    <Text style={styles.buttonText}>Conectar-se com o Facebook</Text>
                </RectButton>
            </Animated.View>
        </SafeAreaView>
    )
}
