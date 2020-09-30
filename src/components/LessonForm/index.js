import React from 'react'
import { View, TextInput } from 'react-native'

import styles from './styles'

function LessonForm() {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.nameInput}
                placeholder="Digite o tema da aula"
                placeholderTextColor="rgba(0, 0, 0, 0.4)"
                autoCapitalize="sentences"
                onChange={(event) => {
                    setName(event.nativeEvent.text)
                }}
            />
        </View>
    )
}

export default LessonForm
