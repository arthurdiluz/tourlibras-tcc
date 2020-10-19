import React, { useState } from 'react'
import {
    View, Text, TextInput
} from 'react-native'
import { RectButton, ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import { FontAwesome, Entypo } from '@expo/vector-icons'

import { useLectureRegister } from '../../context/lectureRegister'
import Database from '../../services/Database'

import getFileExtension from '../../utils/getFileExtension'
import Header from '../../components/Header'

import { MAIN_COLOR, WHITE_COLOR } from '../../../styles.global'
import styles from './styles'

function RegisterLesson() {
    const {
        levels, addNewLevel, removeLevel
    } = useLectureRegister()
    const navigation = useNavigation()
    const [name, setName] = useState('')

    function handleAddLevel() {
        addNewLevel()
    }

    function handleRemoveLevel(levelId) {
        removeLevel(levelId)
    }

    function handleNavigationToLevel(levelId) {
        navigation.navigate('EditLevel', {
            levelId
        })
    }

    function handleGoBack() {
        console.log('VOLTAR')
    }

    async function handleSave() {
        const lecture = { name, levels: levels }

        const lectureId = await Database.insertLecture(lecture)

            try {

                levels.forEach((level, levelId) => {
                    level.questions.forEach((question, questionId) => {
        
                        if (question.media === "") {
                            throw new Error('Image not found')
                        }

                        let imageId = `${levelId}-${questionId}`
                        let fileExtension = getFileExtension(question.media);
                        let fileName = `${imageId}.${fileExtension}`
                        let databasePath = `lectures/${lectureId}/media/questions/${fileName}`
                        
                        Database.uploadImage(question.media, databasePath, (downloadUrl) => {
                            Database.updateDbField(`lectures/${lectureId}/levels/${levelId}/questions/${questionId}`, 'media', downloadUrl)
                        })
        
                        question.options.forEach((option, optionId) => {
    
                            if (option.media === "") {
                                throw new Error('Image not found')
                            }
    
                            imageId = `${levelId}-${questionId}-${optionId}`
                            fileExtension = getFileExtension(option.media);
                            fileName = `${imageId}.${fileExtension}`
                            databasePath = `lectures/${lectureId}/media/options/${fileName}`

                            Database.uploadImage(option.media, databasePath, (downloadUrl) => {
                                Database.updateDbField(`lectures/${lectureId}/levels/${levelId}/questions/${questionId}/options/${optionId}`, 'media', downloadUrl)
                            })
                        })
                    })          
                })
            } catch (error) {
                console.log(error)
                Database.cancelInsertLecture(lectureId)
                return
            }
    }

    return (
        <View style={styles.container}>
            <Header
                headerLeft={(
                    <RectButton
                        onPress={handleGoBack}
                        style={styles.cancelButton}
                    >
                        <Entypo name="cross" size={30} color={MAIN_COLOR} />
                    </RectButton>
                )}
                title="Cadastrar aula"
                headerRight={(
                    <RectButton
                        onPress={handleSave}
                        style={styles.saveButton}
                    >
                        <Text style={styles.saveButtonText}>Salvar</Text>
                    </RectButton>
                )}
            />
            <ScrollView style={styles.scrollView}>
                <View style={styles.lectureContainer}>
                    <Text style={styles.nameText}>Tema/Categoria</Text>
                    <TextInput
                        style={styles.nameInput}
                        placeholder="Digite o tema da aula"
                        placeholderTextColor="rgba(0, 0, 0, 0.4)"
                        autoCapitalize="sentences"
                        onChange={(event) => {
                            setName(event.nativeEvent.text)
                        }}
                    />
                </View>
                <View style={styles.levelContainer}>
                    <Text style={styles.levelContainerTitle}>Níveis da aula</Text>
                    {levels.map((level, levelId) => (
                        <View key={levelId} style={styles.levelContent}>
                            <Text style={styles.levelText}>
                                Nível
                                {' '}
                                {levelId + 1}
                            </Text>
                            <View style={styles.levelButtonsContainer}>
                                <RectButton
                                    style={styles.editButton}
                                    onPress={() => handleNavigationToLevel(levelId)}
                                >
                                    <Text style={styles.editButtonText}>EDITAR</Text>
                                </RectButton>
                                <RectButton
                                    style={styles.deleteButton}
                                    onPress={() => handleRemoveLevel(levelId)}
                                >
                                    <Text style={styles.deleteButtonText}>EXCLUIR</Text>
                                </RectButton>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
            <RectButton onPress={handleAddLevel} style={styles.addLevelButton}>
                <FontAwesome name="plus" size={24} color={WHITE_COLOR} />
            </RectButton>
        </View>
    )
}

export default RegisterLesson
