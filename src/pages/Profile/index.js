import React from 'react'
import { View, Text } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

import { useAuth } from '../../context/auth'

function Profile() {
    const { signOut } = useAuth()

    function handleSignOut() {
        signOut()
    }

    return (
        <View>
            <RectButton onPress={handleSignOut} title="Sign Out">
                <Text>Logout</Text>
            </RectButton>
        </View>
    )
}

export default Profile
