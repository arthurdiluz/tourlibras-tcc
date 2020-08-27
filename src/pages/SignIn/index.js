import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import { useAuth } from '../../context/auth'

export default function SignIn() {
    const { signInWithFacebook } = useAuth()

    function handleSignIn() {
        signInWithFacebook()
    }

    return (
        <View>
            <TouchableOpacity onPress={handleSignIn}>
                <Text>SignIn page</Text>
            </TouchableOpacity>
        </View>
    )
}
