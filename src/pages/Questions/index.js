import React, { useEffect, useState } from 'react'
import { Image, Text, View, ScrollView } from 'react-native'
import { BorderlessButton, TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { Video } from 'expo-av'

import { Feather } from '@expo/vector-icons'

import { useAuth } from '../../context/auth'
import { useTheme } from '../../context/theme'
import Database from '../../services/Database'

import Header from '../../components/Header'
import styles from './styles'

function Questions({ route: { params: { level, lectureId, levelId }}}) {
    const navigation = useNavigation()
    const { theme } = useTheme()
    const { user } = useAuth()
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answers, setAnswers] = useState([])
    const [levelFinished, setLevelFinished] = useState(false)

    useEffect(() => {
        const answers = []

        for(let i = 0; i < level.questions.length; i++) {
            answers.push(undefined)
        }

        setAnswers(answers)
    }, [])

    useEffect(() => {
        if(levelFinished) {
            handleFirebaseUserQuestionHistoryPost()
            handleNavigationToLectureCompletionPage()
        }
    }, [levelFinished])

    function handleGoBack() {
        navigation.goBack()
    }

    function handleButtonPress(optionIndex) {
        
        setAnswers((answers) => {
            const newAnswers = answers.map((answer, answerIndex) => {
                if (currentQuestion === answerIndex) {
                    const isCorrect = level.questions[currentQuestion].options[optionIndex].isCorrect
                    return isCorrect
                } else {
                    return answer
                }
            })
            return newAnswers
        })

        if(level.questions.length === currentQuestion + 1) {
            setLevelFinished(true)
        } else {
            setCurrentQuestion((currentQuestion) => (currentQuestion + 1))
        }
    }

    function handleNavigationToLectureCompletionPage() {
        navigation.navigate('LectureCompletion', { answers, lectureId, levelId })
    }

    function handleFirebaseUserQuestionHistoryPost() {
        for(let i = 0; i < answers.length; i++) {
            const questionId = i

            const postObject = {
                lectureId,
                levelId,
                questionId,
                //answerTime
                correctAnswer: answers[i],
                firebaseTimestamp: Database.timestamp,
                timestamp: new Date().toISOString()
            }

            Database.storeUserQuestionHistoryOnDb(user, postObject)
        }
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Header
                headerLeft={(
                    <BorderlessButton rippleColor={theme.colors.borderlessButtonRipple} onPress={handleGoBack}>
                        <Feather name="arrow-left" size={26} color={theme.colors.main} />
                    </BorderlessButton>
                )}
                headerRight={(
                    <Text
                        style={[styles.questionsCounter, { color: theme.colors.lightText }]}
                    >
                        {`${currentQuestion + 1}/${level.questions.length}`}
                    </Text>
                )}
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

            <ScrollView>
                    <View style={styles.questionContainer}>
                        <Text style={[styles.questionDescription, { color: theme.colors.strongText }]}>{level.questions[currentQuestion].description}</Text>
                        {level.questions[currentQuestion].mediaType === 'video' ? (
                            <Video
                                source={{ uri: level.questions[currentQuestion].media }}
                                isMuted={true}
                                resizeMode="cover"
                                shouldPlay
                                isLooping
                                style={[styles.questionVideo, { borderColor: theme.colors.questionMediaBorder }]}
                            />
                        ) : (
                            <Image
                                style={[styles.questionImage, { borderColor: theme.colors.questionMediaBorder }]}
                                source={{ uri: level.questions[currentQuestion].media }}
                            />
                        )}
                    </View>
                    <View style={styles.optionsContainer}>
                        {level.questions[currentQuestion].options.map((option, optionIndex) => (
                            <TouchableOpacity
                                key={optionIndex}
                                style={[styles.optionButton, { borderColor: theme.colors.division }]}
                                activeOpacity={0.6}
                                onPress={() => handleButtonPress(optionIndex)}
                            >
                                {option.media && (
                                    <Image
                                        style={styles.optionMedia}
                                        source={{ uri: option.media }}
                                    />
                                )}
                                <Text style={[styles.optionDescription, { color: theme.colors.lightText }]}>{option.text}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
            </ScrollView>
        </View>
    )
}

export default Questions