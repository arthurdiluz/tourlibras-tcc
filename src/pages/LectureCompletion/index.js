import React, { useEffect, useRef, useState } from 'react'
import { Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler';

import { AntDesign, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'

import { useAuth } from '../../context/auth'
import { useTheme } from '../../context/theme';

import styles from './styles'
import Header from '../../components/Header'
import Database from '../../services/Database'

function LectureCompletion({ route: { params: { answers, lectureId, levelId }}}) {
    const { theme } = useTheme()
    const navigation = useNavigation()
    const [correctAnswersCount, setCorrectAnswersCount] = useState(0)
    const [earnedExperience, setEarnedExperience] = useState(undefined)
    const [earnedMoney, setEarnedMoney] = useState(undefined)
    const { user } = useAuth()

    const componentIsMounted = useRef(true)
    useEffect(() => {
        let correctAnswers = 0
        answers.forEach((value) => {
            if (value === true) {
                correctAnswers++
            }
        })
        
        if(componentIsMounted.current) {
            setCorrectAnswersCount(correctAnswers)
        }
        
        const correctAnswerPercentage = correctAnswers / answers.length
        
        if(correctAnswerPercentage >= 0.7) {
            getEarnedInfo()
            handleFirebaseExperienceProgressPost()
            handleFirebaseMoneyProgressPost()
            handleFirebaseUserProgressPost()

            handleLectureCompletionBadgeUnlock()
        }

        return () => {
            componentIsMounted.current = false
        }
    }, [])

    useEffect(() => {
        navigation.addListener('beforeRemove', (e) => {
            //Prevents user from returning to Question page
            e.preventDefault();
        })
    }, [navigation]);

    function handleNavigationToLectures() {
        navigation.navigate('Lectures')
    }

    function handleFirebaseExperienceProgressPost() {
        Database.storeExperienceProgressOnDb(user, lectureId, levelId)
    }
    
    function handleFirebaseMoneyProgressPost() {
        Database.storeMoneyProgressOnDb(user, lectureId, levelId)
    }

    function handleFirebaseUserProgressPost() {
        Database.storeUserProgressOnDb(user, lectureId, levelId)
    }

    async function handleLectureCompletionBadgeUnlock(){
        const lectureHasBeenFinished = await Database.checkIfItsTheLastLevel(lectureId, levelId)
        
        if(lectureHasBeenFinished) {
            await Database.unlocksLectureBadge(user, lectureId)
        }
    }

    function getEarnedInfo() {
        Database.getLectureCompletionEarnedExperience(lectureId, levelId).then((experience) => {
            if(componentIsMounted.current) {
                setEarnedExperience(experience)
            }
        })
        Database.getLectureCompletionEarnedMoney(lectureId, levelId).then((money) => {
            if(componentIsMounted.current) {
                setEarnedMoney(money)
            }
        })
    }

    return(
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Header
                headerCenter={(
                    <View style={styles.questionsAnswers}>
                        {answers.map((answer, answerIndex) => {
                            if (answer === true) {
                                return(
                                    <View
                                        key={answerIndex}
                                        style={[
                                            styles.correctAnswer,
                                            {
                                                borderColor: theme.colors.answerIndicatorBorder,
                                                backgroundColor: theme.colors.correctAnswerIndicatorBackground
                                            }
                                        ]}
                                    />
                                )
                            } else if (answer === false) {
                                return(
                                    <View
                                        key={answerIndex}
                                        style={[
                                            styles.incorrectAnswer,
                                            {
                                                borderColor: theme.colors.answerIndicatorBorder,
                                                backgroundColor: theme.colors.incorrectAnswerIndicatorBackground
                                            }
                                        ]}
                                    />
                                )
                            } else {
                                return (
                                    <View
                                        key={answerIndex}
                                        style={[
                                            styles.undefinedAnswer,
                                            {
                                                borderColor: theme.colors.answerIndicatorBorder,
                                                backgroundColor: theme.colors.undefinedAnswerIndicatorBackground
                                            }
                                        ]}
                                    />
                                )
                            }
                        })}
                    </View>
                )}
            />
            <View style={styles.mainContainer}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <View
                        style ={[
                            styles.iconContainer,
                            {
                                backgroundColor: theme.colors.lectureCompletionIconBackground
                            }
                        ]}
                    >
                        <MaterialCommunityIcons name="trophy" size={60} color={theme.colors.lectureCompletionIcon} />
                    </View>
                    <View style={styles.resultContainer}>
                        <Text style={[styles.text, { color: theme.colors.lightText }]}>Você acertou</Text>
                        <Text style={[styles.result, { color: theme.colors.strongText }]}>{`${correctAnswersCount}/${answers.length}`}</Text>
                        <Text style={[styles.text, { color: theme.colors.lightText }]}>questões!</Text>
                    </View>
                    {
                        earnedExperience !== undefined && earnedMoney !== undefined && (
                            <View style={styles.earnedInfoContainer}>
                                <View style={styles.earnedInfoGroup}>
                                    <Text style={[styles.earnedExperience, { color: theme.colors.lightText }]}>{`+${earnedExperience}`}</Text>
                                    <AntDesign name="star" size={25} color={theme.colors.profileExperienceIcon} />
                                </View>
                                <View style={styles.earnedInfoGroup}>
                                    <Text style={[styles.earnedMoney, { color: theme.colors.lightText }]}>{`+${earnedMoney}`}</Text>
                                    <MaterialIcons name="attach-money" size={25} color={theme.colors.profileMoneyIcon} />
                                </View>
                            </View>
                        )
                    }
                </View>
                <RectButton rippleColor={theme.colors.primaryButtonRipple} onPress={handleNavigationToLectures} style={[styles.button, { backgroundColor: theme.colors.primaryButtonBackground }]}>
                    <Text style={[styles.buttonText, { color: theme.colors.primaryButtonText }]}>Voltar para as aulas</Text>
                </RectButton>
            </View>
        </View>
    )
}

export default LectureCompletion