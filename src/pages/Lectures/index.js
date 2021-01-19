import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import Database from '../../services/Database'
import Header from '../../components/Header'
import LectureButton from '../../components/LectureButton'

import styles from './styles'

import { useAuth } from '../../context/auth'
import { useTheme } from '../../context/theme'

function Lectures() {
    const navigation = useNavigation()
    const { theme } = useTheme()
    const [loading, setLoading] = useState(true)
    const [lecturesList, setLecturesList] = useState({})
    const { user } = useAuth()

    useEffect(() => {
        Database.getLecturesList().then((response) => {
            setLecturesList(response)
        })
        
        Database.getUserProgress(user.uid, (response) => {
            const lecturesId = Object.keys(response)

            setLecturesList(lecturesList => {
                const newLecturesList = Object.assign({}, lecturesList)
                    
                lecturesId.forEach((lectureId) => {
                    const currentLevel = response[lectureId].currentLevel
                    newLecturesList[lectureId]['currentLevel'] = currentLevel
                    newLecturesList[lectureId]['unlocked'] = response[lectureId].unlocked
                    newLecturesList[lectureId]['progress'] = calculateLectureProgress(currentLevel, 0, lecturesList[lectureId].levels.length, 0, 1)
                    newLecturesList[lectureId]['completed'] = response[lectureId].completed
                })
                return newLecturesList
            })
            setLoading(false)
        })
    }, [])
    
    function handleNavigationToQuestions(lectureId, levelId) {
        const level = lecturesList[lectureId].levels[levelId]

        navigation.navigate('Questions', { level, lectureId, levelId })
    }

    function calculateLectureProgress(currentLevel, inputMin, inputMax, outputMin, outputMax) {
        // If all levels are completed this formula doesn't work
        const progress = (currentLevel - inputMin) * (outputMax - outputMin) / (inputMax - inputMin) + outputMin
        return progress
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Header
                title="Aulas"
            />
            <ScrollView>
                <View style={styles.lecturesContainer}>
                    <View style={styles.lectureView}>
                        {loading ? (
                            <View>
                                <Text style={[styles.emptyLecturesText, { color: theme.colors.lightText }]}>Não há nenhuma aula cadastrada! :(</Text>
                            </View>
                        ) : Object.keys(lecturesList).map((lectureId, lectureIndex) => (
                            <View key={lectureIndex}>
                                <LectureButton
                                    size={100}
                                    avatarUrl={lecturesList[lectureId].icon}
                                    progress={lecturesList[lectureId].progress}
                                    level={lecturesList[lectureId].currentLevel + 1}
                                    onPress={() => handleNavigationToQuestions(lectureId, lecturesList[lectureId].currentLevel)}
                                    unlocked={lecturesList[lectureId].unlocked}
                                    completed={lecturesList[lectureId].completed}
                                />
                                <Text style={[styles.lectureText, { color: theme.colors.strongText }]}>{lecturesList[lectureId].unlocked ? lecturesList[lectureId].name : 'Bloqueado'}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default Lectures
