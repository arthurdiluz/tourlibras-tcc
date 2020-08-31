import React from 'react'
import { Text, View } from 'react-native'

import { FontAwesome } from '@expo/vector-icons'

import { BorderlessButton } from 'react-native-gesture-handler'
import styles from './styles'

function Header({ title }) {
    return (
        <View style={styles.container}>
            <View style={styles.headerLeft} />
            <Text style={styles.title}>
                {title}
            </Text>
            <View style={styles.headerRight}>
                <BorderlessButton>
                    <FontAwesome name="gear" size={28} color="#00BFFF" />
                </BorderlessButton>
            </View>
        </View>
    )
}

export default Header
