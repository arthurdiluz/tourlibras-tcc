import React from 'react'
import { View, Image, Text } from 'react-native'
import Svg, { Circle } from 'react-native-svg'
import { RectButton } from 'react-native-gesture-handler'

import { FontAwesome5, FontAwesome } from '@expo/vector-icons'; 
import styles from './styles'
import { DARK_GRAY_COLOR } from '../../../styles.global';

function LectureButton({
    size,
    mainStrokeColor = '#000099',
    secondaryStrokeColor = '#CCC',
    disabledStrokeColor = '#777',
    completedStrokeColor = '#f7f704',
    strokeWidth = 8,
    progress = 0,
    avatarUrl,
    level = 1,
    levelBackgroundColor = '#FF0000',
    levelTextColor = '#FFF',
    onPress,
    unlocked = true,
    completed = false,
    hideLevelContainer = false
}) {
    const enabled = unlocked && !completed

    if (completed) {
        mainStrokeColor = completedStrokeColor
        progress = 1
        levelBackgroundColor = completedStrokeColor
        levelTextColor = DARK_GRAY_COLOR
    }
    const radius = (size - strokeWidth) / 2
    const circunference = 2 * radius * Math.PI
    const α = (1 - progress) * Math.PI * 2
    const strokeDashOffset = α * radius


    return (
        <Svg style={styles.progressBarSvg} width={size} height={size}>
            <Circle
                stroke={unlocked ? secondaryStrokeColor : disabledStrokeColor}
                strokeWidth={strokeWidth}
                fill="#FFF"
                cy="50%"
                cx="50%"
                r={(size - strokeWidth) / 2}
                strokeDasharray={`${circunference} ${circunference}`}
            />
            <Circle
                stroke={unlocked ? mainStrokeColor : disabledStrokeColor}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                cy="50%"
                cx="50%"
                r={(size - strokeWidth) / 2}
                strokeDasharray={`${circunference} ${circunference}`}
                strokeDashoffset={strokeDashOffset}
            />
            <RectButton onPress={onPress} style={styles.avatarContainer} enabled={enabled}>  
                {avatarUrl ? (
                    <>
                        <Image
                            style={unlocked ? {
                                height: size - strokeWidth * 4,
                                width: size - strokeWidth * 4,
                                borderRadius: size / 2
                            } : {
                                display: 'none'
                            }}
                            source={{ uri: avatarUrl }}
                        />
                        <Image
                            style={completed ? {
                                height: size - strokeWidth * 4,
                                width: size - strokeWidth * 4,
                                borderRadius: size / 2,
                                position: 'absolute',
                                tintColor: completedStrokeColor,
                                opacity: 0.6
                            } : {
                                display: 'none'
                            }}
                            source={{ uri: avatarUrl }}
                        />
                        <FontAwesome name="lock" size={30} color={disabledStrokeColor} style={unlocked && { display: 'none' }} />
                    </>
                ) : (
                    <>
                        <FontAwesome5 name="book-reader" size={30} color={mainStrokeColor} style={!unlocked && { display: 'none' }} />
                        <FontAwesome name="lock" size={30} color={disabledStrokeColor} style={unlocked && { display: 'none' }} />
                    </>
                )}
                <View style={[
                    styles.levelContainer,
                    {
                        transform: [{ translateX: size / 3 }, { translateY: size / 3 }],
                    },
                    unlocked ? {
                        backgroundColor: levelBackgroundColor
                    } : {
                        opacity: 0
                    },
                    hideLevelContainer && { 
                        opacity: 0
                    }
                ]}
                >
                    <Text style={[styles.levelText, { color: levelTextColor }]}>{unlocked ? level : null}</Text>
                </View>
            </RectButton>
        </Svg>
    )
}

export default LectureButton
