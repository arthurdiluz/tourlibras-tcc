import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import { useAuth } from '../../context/auth'

function Profile() {
    const { signOut } = useAuth()

    function handleSignOut() {
        signOut()
    }

    return (
        <View>
            <TouchableOpacity onPress={handleSignOut}>
                <Text>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Profile
