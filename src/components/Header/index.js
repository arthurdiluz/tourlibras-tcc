import React from 'react'
import { Text, View } from 'react-native'

import styles from './styles'

function Header({ title, headerLeft, headerRight, headerCenter }) {
    return (
        <View style={styles.container}>
            <View style={styles.headerLeft}>
                {headerLeft}
            </View>

            {(title && !headerCenter) && (
                <Text style={styles.title}>
                    {title}
                </Text>
            )}

            {(!title && headerCenter) && (
                <View>
                    {headerCenter}
                </View>
            )}

            <View style={styles.headerRight}>
                {headerRight}
            </View>
        </View>
    )
}

export default Header
