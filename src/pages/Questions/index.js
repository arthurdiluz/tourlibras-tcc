import React, { useEffect, useState } from 'react'
import { Image, Text, View, ScrollView } from 'react-native'
import { BorderlessButton, TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import { Feather } from '@expo/vector-icons'

import { useAuth } from '../../context/auth'
import Header from '../../components/Header'
import { MAIN_COLOR } from '../../../styles.global'
import styles from './styles'
import Database from '../../services/Database'

function Questions({ route: { params: { level, lectureId, levelId }}}) {
    const navigation = useNavigation()
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
            handleFirebaseUserProgressPost()
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

    function handleFirebaseUserProgressPost() {
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

            Database.storeUserProgressOnDb(user, postObject)
        }
    }

    return (
        <View style={styles.container}>
            <Header
                headerLeft={(
                    <BorderlessButton onPress={handleGoBack}>
                        <Feather name="arrow-left" size={26} color={MAIN_COLOR} />
                    </BorderlessButton>
                )}
                headerRight={(
                    <Text style={styles.questionsCounter}>{`${currentQuestion + 1}/${level.questions.length}`}</Text>
                )}
                headerCenter={(
                    <View style={styles.questionsAnswers}>
                        {answers.map((answer, answerIndex) => {
                            if (answer === true) {
                                return(
                                    <View key={answerIndex} style={styles.correctAnswer} />
                                )
                            } else if (answer === false) {
                                return(
                                    <View key={answerIndex} style={styles.incorrectAnswer} />
                                )
                            } else {
                                return (
                                    <View key={answerIndex} style={styles.undefinedAnswer} />
                                )
                            }
                        })}
                    </View>
                )}
            />

            <ScrollView>
                    <View style={styles.questionContainer}>
                        <Text style={styles.questionDescription}>{level.questions[currentQuestion].description}</Text>
                        <Image
                            style={styles.questionMedia}
                            source={{ uri: level.questions[currentQuestion].media }}
                        />
                    </View>
                    <View style={styles.optionsContainer}>
                        {level.questions[currentQuestion].options.map((option, optionIndex) => (
                            <TouchableOpacity
                                key={optionIndex}
                                style={styles.optionButton}
                                activeOpacity={0.6}
                                onPress={() => handleButtonPress(optionIndex)}
                            >
                                {option.media && (
                                    <Image
                                        style={styles.optionMedia}
                                        source={{ uri: option.media }}
                                    />
                                )}
                                <Text style={styles.optionDescription}>{option.text}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
            </ScrollView>
        </View>
    )
}

export default Questions