import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'

import styles from './styles'

function MultipleOptionsButton({
    options = [],
    callback
}) {
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
                        optionId == 0 && styles.firstButton,
                        optionId == options.length - 1 && styles.lastButton,
                        selectedOptionIndex == optionId && styles.selectedButton
                    ]}
                >
                    <Text
                        style={[
                            styles.defaultButtonText,
                            selectedOptionIndex == optionId && styles.selectedButtonText
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