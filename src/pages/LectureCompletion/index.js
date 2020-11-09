import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler';

import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import styles from './styles'
import Header from '../../components/Header'

function LectureCompletion({ route: { params: { answers }}}) {
    const navigation = useNavigation()
    const [correctAnswersCount, setCorrectAnswersCount] = useState(0)

    useEffect(() => {
        let correctAnswers = 0
        answers.forEach((value) => {
            if (value === true) {
                correctAnswers++
            }
        })
        setCorrectAnswersCount(correctAnswers)
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

    return(
        <View style={styles.container}>
            <Header
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
            <View style={styles.mainContainer}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <View style ={styles.iconContainer}>
                        <MaterialCommunityIcons name="trophy" size={60} color="yellow" />
                    </View>
                    <View style={styles.resultContainer}>
                        <Text style={styles.text}>Você acertou</Text>
                        <Text style={styles.result}>{`${correctAnswersCount}/${answers.length}`}</Text>
                        <Text style={styles.text}>questões!</Text>
                    </View>
                </View>
                <RectButton onPress={handleNavigationToLectures} style={styles.button}>
                    <Text style={styles.buttonText}>Voltar para as aulas</Text>
                </RectButton>
            </View>
        </View>
    )
}

export default LectureCompletion