import React, { useState, useRef } from 'react'
import {
    View, TextInput, Text, SafeAreaView, Animated
} from 'react-native'
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'

import { useAuth } from '../../context/auth'

import {
    WHITE_COLOR, GREEN_COLOR, MAIN_COLOR, BLACK_COLOR
} from '../../../styles.global'
import styles from './styles'

function ForgotPassword() {
    const navigation = useNavigation()
    const { passwordReset } = useAuth()

    const [email, setEmail] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [buttonEnabled, setButtonEnabled] = useState(true)

    const buttonAnim = useRef(new Animated.Value(0)).current
    const AnimatedRectButton = Animated.createAnimatedComponent(RectButton)

    function successButtonAnim() {
        Animated.timing(buttonAnim, {
            duration: 200,
            toValue: 1,
            useNativeDriver: false
        }).start()
    }

    function returnToDefaultButtonAnim() {
        Animated.timing(buttonAnim, {
            duration: 200,
            toValue: 0,
            useNativeDriver: false
        }).start()
    }

    async function handleForgotPassword() {
        const error = await passwordReset(email)

        if (error) {
            setErrorMessage(error.toString(error))
        } else {
            successButtonAnim()
            setButtonEnabled(false)
        }
    }

    function handleGoBack() {
        navigation.goBack()
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.returnButton} onPress={handleGoBack}>
                <FontAwesome name="arrow-left" size={28} color="white" />
            </TouchableOpacity>

            <View style={styles.contentContainer}>

                <View style={styles.titleContainer}>
                    <FontAwesome5 name="key" size={65} color="white" />
                    <Text style={styles.title}>
                        Esqueceu a
                        {'\n'}
                        sua senha?
                    </Text>
                </View>

                <Text style={styles.description}>
                    Não se preocupe,
                    {'\n'}
                    te ajudaremos à recuperar :D
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
                        setButtonEnabled(true)
                        returnToDefaultButtonAnim()
                        setErrorMessage('')
                    }}
                />
                <AnimatedRectButton
                    onPress={buttonEnabled ? handleForgotPassword : () => {}}
                    style={[styles.button, {
                        backgroundColor: buttonAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [WHITE_COLOR, GREEN_COLOR],
                            extrapolate: 'clamp'
                        })
                    }]}
                    enabled={buttonEnabled}
                >
                    <Animated.Text style={[styles.buttonText, {
                        color: buttonAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [MAIN_COLOR, BLACK_COLOR],
                            extrapolate: 'clamp'
                        })
                    }]}
                    >
                        {buttonEnabled ? 'Recuperar senha' : 'Te enviamos um e-mail!'}

                    </Animated.Text>
                </AnimatedRectButton>
                <View style={styles.errorContainer}>
                    <Text style={styles.errorMessage}>
                        {errorMessage}
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ForgotPassword
