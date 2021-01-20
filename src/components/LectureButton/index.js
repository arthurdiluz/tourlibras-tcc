import React from 'react'
import { View, Image, Text } from 'react-native'
import Svg, { Circle } from 'react-native-svg'
import { RectButton } from 'react-native-gesture-handler'

import { FontAwesome5, FontAwesome } from '@expo/vector-icons'; 
import styles from './styles'
import { useTheme } from '../../context/theme';

function LectureButton({
    size,
    strokeWidth = 8,
    progress = 0,
    avatarUrl,
    level = 1,
    onPress,
    unlocked = true,
    completed = false,
    hideLevelContainer = false
}) {
    const { theme } = useTheme()
    const enabled = unlocked && !completed

    if (completed) {
        progress = 1
    }
    const radius = (size - strokeWidth) / 2
    const circunference = 2 * radius * Math.PI
    const α = (1 - progress) * Math.PI * 2
    const strokeDashOffset = α * radius


    return (
        <Svg style={styles.progressBarSvg} width={size} height={size}>
            <Circle
                stroke={unlocked ? (
                    completed ? theme.colors.lectureButtonCompletedStroke : theme.colors.lectureButtonSecondaryStroke
                ) : (
                    theme.colors.lectureButtonDisabledStroke
                )}
                strokeWidth={strokeWidth}
                fill={theme.colors.background}
                cy="50%"
                cx="50%"
                r={(size - strokeWidth) / 2}
                strokeDasharray={`${circunference} ${circunference}`}
            />
            <Circle
                stroke={unlocked ? (
                    completed ? theme.colors.lectureButtonCompletedStroke : theme.colors.lectureButtonMainStroke
                ) : (
                    theme.colors.lectureButtonDisabledStroke
                )}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                cy="50%"
                cx="50%"
                r={(size - strokeWidth) / 2}
                strokeDasharray={`${circunference} ${circunference}`}
                strokeDashoffset={strokeDashOffset}
            />
            <RectButton rippleColor={theme.colors.lectureButtonRipple} onPress={onPress} style={styles.avatarContainer} enabled={enabled}>  
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
                            style={[
                                completed ? {
                                    height: size - strokeWidth * 4,
                                    width: size - strokeWidth * 4,
                                    borderRadius: size / 2,
                                    position: 'absolute',
                                    tintColor: theme.colors.lectureButtonCompletedStroke,
                                    opacity: 0.6
                                } : {
                                    display: 'none'
                                },
                                !unlocked && { opacity: 0 }
                            ]}
                            source={{ uri: avatarUrl }}
                        />
                        <FontAwesome name="lock" size={30} color={theme.colors.lectureButtonDisabledStroke} style={unlocked && { display: 'none' }} />
                    </>
                ) : (
                    <>
                        <FontAwesome5 name="book-reader" size={30} color={completed ? theme.colors.lectureButtonCompletedStroke : theme.colors.lectureButtonMainStroke} style={!unlocked && { display: 'none' }} />
                        <FontAwesome name="lock" size={30} color={theme.colors.lectureButtonDisabledStroke} style={unlocked && { display: 'none' }} />
                    </>
                )}
                <View style={[
                    styles.levelContainer,
                    {
                        transform: [{ translateX: size / 3 }, { translateY: size / 3 }],
                    },
                    unlocked ? {
                        backgroundColor: theme.colors.lectureButtonLevelBackground
                    } : {
                        opacity: 0
                    },
                    hideLevelContainer && { 
                        opacity: 0
                    },
                    completed && {
                        backgroundColor: theme.colors.lectureButtonCompletedStroke
                    }
                ]}
                >
                    <Text style={[styles.levelText, { color: theme.colors.lectureButtonLevelText }, completed && { color: theme.colors.lectureButtonCompletedLevelText }]}>{unlocked ? level : null}</Text>
                </View>
            </RectButton>
        </Svg>
    )
}

export default LectureButton
