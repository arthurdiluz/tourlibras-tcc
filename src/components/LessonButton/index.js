import React from 'react'
import { View, Image, Text } from 'react-native'
import Svg, { Circle } from 'react-native-svg'

import { RectButton } from 'react-native-gesture-handler'
import styles from './styles'

function LessonButton({
    size, mainStrokeColor = '#777', secondaryStrokeColor = '#CCC', strokeWidth = 8, progress = 0, avatarUrl, level = 1, levelBackgroundColor = '#FF0000', levelTextColor = '#FFF', onPress
}) {
    const radius = (size - strokeWidth) / 2
    const circunference = 2 * radius * Math.PI
    const α = (1 - progress) * Math.PI * 2
    const strokeDashOffset = α * radius

    return (
        <Svg style={styles.progressBarSvg} width={size} height={size}>
            <Circle
                stroke={secondaryStrokeColor}
                strokeWidth={strokeWidth}
                fill="#FFF"
                cy="50%"
                cx="50%"
                r={(size - strokeWidth) / 2}
                strokeDasharray={`${circunference} ${circunference}`}
            />
            <Circle
                stroke={mainStrokeColor}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                cy="50%"
                cx="50%"
                r={(size - strokeWidth) / 2}
                strokeDasharray={`${circunference} ${circunference}`}
                strokeDashoffset={strokeDashOffset}
            />
            <RectButton onPress={onPress} style={styles.avatarContainer}>
                <Image
                    style={{
                        height: size - strokeWidth * 4,
                        width: size - strokeWidth * 4,
                        borderRadius: size / 2
                    }}
                    source={{ uri: avatarUrl }}
                />
                <View style={[
                    styles.levelContainer,
                    {
                        transform: [{ translateX: size / 3 }, { translateY: size / 3 }],
                        backgroundColor: levelBackgroundColor
                    }
                ]}
                >
                    <Text style={[styles.levelText, { color: levelTextColor }]}>{level}</Text>
                </View>
            </RectButton>
        </Svg>
    )
}

export default LessonButton
