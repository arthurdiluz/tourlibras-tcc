import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'

import { useTheme } from '../../context/theme'

import styles from './styles'

function MultipleOptionsButton({
    options = [],
    callback
}) {
    const { theme } = useTheme()
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(0)

    useEffect(() => {
        callback(selectedOptionIndex)
    }, [selectedOptionIndex])

    return(
        <View style={styles.container}>
            {options.map((option, optionId) => (
                <TouchableOpacity
                    key={optionId}
                    onPress={() => setSelectedOptionIndex(optionId)}
                    style={[
                        styles.centerButtons,
                        {
                            borderColor: theme.colors.division
                        },
                        optionId == 0 && styles.firstButton,
                        optionId == options.length - 1 && styles.lastButton,
                        selectedOptionIndex == optionId && [styles.selectedButton, {
                            backgroundColor: theme.colors.main,
                            borderColor: theme.colors.lightText
                        }]
                    ]}
                >
                    <Text
                        style={[
                            styles.defaultButtonText,
                            {
                                color: theme.colors.strongText
                            },
                            selectedOptionIndex == optionId && [styles.selectedButtonText, { color: theme.colors.white }]
                        ]}
                    >
                        {option}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

export default MultipleOptionsButton