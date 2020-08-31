import React from 'react'
import { Text, View } from 'react-native'

import styles from './styles'

function Header({ title, headerLeft, headerRight }) {
    return (
        <View style={styles.container}>
            <View style={styles.headerLeft}>
                {headerLeft}
            </View>
            <Text style={styles.title}>
                {title}
            </Text>
            <View style={styles.headerRight}>
                {headerRight}
            </View>
        </View>
    )
}

export default Header
