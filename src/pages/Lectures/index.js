import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Modal from 'react-native-modal';

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
    const [isModalVisible, setModalVisible] = useState(false)
    const [modalSelectedLecture, setModalSelectedLecture] = useState("")
    const { user } = useAuth()

    useEffect(() => {
        Database.getLecturesList().then((response) => {
            setLecturesList(response)
        }).then(() => {
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

    function toggleModal() {
        setModalVisible((isModalVisible) => !isModalVisible)
    }

    function resetLecture() {
        Database.resetLecture(user, modalSelectedLecture)
        toggleModal()
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Header
                title="Aulas"
            />
            <ScrollView>
                <View style={styles.lecturesContainer}>
                    <View style={styles.lectureView}>

                        <View>
                            <Modal
                                isVisible={isModalVisible}
                                onBackdropPress={toggleModal}
                            >
                                <View style={[styles.modalContent, { backgroundColor: theme.colors.background, borderColor: theme.colors.division }]}>
                                    <Text style={[styles.modalTitle, { color: theme.colors.strongText }]}>Deseja reiniciar esta aula?</Text>
                                    <View style={styles.modalButtonsContainer}>
                                        <TouchableOpacity
                                            onPress={resetLecture}
                                            activeOpacity={0.6}
                                            style={[styles.modalPrimaryButton, { backgroundColor: theme.colors.main }]}
                                        >
                                            <Text style={[styles.modalPrimaryButtonText, { color: theme.colors.white }]}>SIM</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={toggleModal}
                                            activeOpacity={0.6}
                                            style={[styles.modalSecondaryButton, { backgroundColor: theme.colors.signOutButtonBackground }]}
                                        >
                                            <Text style={[styles.modalSecondaryButtonText, { color: theme.colors.white }]}>NÃO</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Modal>
                        </View>

                        {loading ? (
                            <View>
                                <Text style={[styles.emptyLecturesText, { color: theme.colors.lightText }]}>Não há nenhuma aula cadastrada! :(</Text>
                            </View>
                        ) : Object.keys(lecturesList).map((lectureId, lectureIndex) => (
                            <View key={lectureIndex} style={styles.lectureGroup}>
                                <LectureButton
                                    size={100}
                                    avatarUrl={lecturesList[lectureId].icon}
                                    progress={lecturesList[lectureId].progress}
                                    level={lecturesList[lectureId].currentLevel + 1}
                                    onPress={() => handleNavigationToQuestions(lectureId, lecturesList[lectureId].currentLevel)}
                                    onPressWhenCompleted={() => {
                                        toggleModal()
                                        setModalSelectedLecture(lectureId)
                                    }}
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
