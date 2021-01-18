import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView } from 'react-native'

import Database from '../../services/Database'
import Header from '../../components/Header'
import LectureButton from '../../components/LectureButton'

import styles from './styles'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../../context/auth'

function Lectures() {
    const navigation = useNavigation()
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
        <View style={styles.container}>
            <Header
                title="Aulas"
                // headerLeft={(
                //     <View style={styles.headerLeftContainer}>
                //         <AntDesign name="star" size={28} color="#FBD513" />
                //         <Text style={[styles.headerIconsText, styles.headerLeftIconText]}>
                //             3452
                //         </Text>
                //     </View>
                // )}
                // headerRight={(
                //     <View style={styles.headerRightContainer}>
                //         <MaterialIcons name="attach-money" size={28} color="#00D200" />
                //         <Text style={styles.headerIconsText}>
                //             3452
                //         </Text>
                //     </View>
                // )}
            />
            <ScrollView>
                <View style={styles.lecturesContainer}>
                    <View style={styles.lectureView}>
                        {loading ? (
                            <View>
                                <Text style={styles.emptyLecturesText}>Não há nenhuma aula cadastrada! :(</Text>
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
                                <Text style={styles.lectureText}>{lecturesList[lectureId].unlocked ? lecturesList[lectureId].name : 'Bloqueado'}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default Lectures
