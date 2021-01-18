import React, {
    useEffect, useRef, useState
} from 'react'
import {
    View, Text, TextInput, Keyboard, Animated, SafeAreaView
} from 'react-native'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import { EvilIcons, Feather } from '@expo/vector-icons'
import { useAuth } from '../../context/auth'

import styles, {
    FOOTER_HEIGHT, ICON_SIZE
} from './styles'
import { WHITE_COLOR } from '../../../styles.global'

export default function Signup() {
    const {
        authWithFacebook, signUpWithEmail
    } = useAuth()
    const navigation = useNavigation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(undefined)
    const [loading, setLoading] = useState(false)

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

    async function handleEmailSignUp() {
        navigation.addListener('beforeRemove', (e) => {
            //Prevents user from returning to Login page while trying to sign up
            e.preventDefault()
        })
        setLoading(true)

        const error = await signUpWithEmail(email, password)

        if (error) {
            setErrorMessage(error.toString(error))
            navigation.removeListener('beforeRemove')
            setLoading(false)
        }
    }

    function handleGoBack() {
        navigation.goBack()
    }

    return (
        <SafeAreaView style={styles.container}>
            <BorderlessButton style={{ position: 'absolute', left: 20, top: 50 }} onPress={handleGoBack}>
                <Feather name="arrow-left" size={35} color={WHITE_COLOR} />
            </BorderlessButton>
            <View style={styles.header}>
                <AnimatedEvilIcons name="user" style={{ fontSize: iconSizeAnim, opacity: iconOpacityAnim }} color="white" />
            </View>
            <View style={styles.formContainer}>
                <Text style={styles.headerText}>
                    Crie uma conta com
                    {'\n'}
                    seu email e senha
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
                    placeholder="Digite uma senha"
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
                <RectButton
                    enabled={!loading}
                    onPress={handleEmailSignUp}
                    style={styles.signUpButton}
                >
                    <Text style={styles.signUpButtonText}>Cadastrar-se</Text>
                </RectButton>
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
