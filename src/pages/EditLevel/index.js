import React, { useEffect, useState } from 'react'
import { Image, Button, View, Text, TextInput } from 'react-native'
import { BorderlessButton, RectButton, ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'


// https://goshakkk.name/array-form-inputs/

import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import { useLectureRegister } from '../../context/lectureRegister'
import Header from '../../components/Header'

import { DARK_GRAY_COLOR, DIVISION_COLOR, LIGHT_GRAY_COLOR, WHITE_COLOR } from '../../../styles.global'
import styles from './styles'

function EditLevel({ route: { params: { levelId } } }) {
    const {
        levels, addNewQuestion, removeQuestion, changeQuestionField, changeLevelField
    } = useLectureRegister()
    const navigation = useNavigation()

    useEffect(() => {
        // (async () => {
        //     console.log('tentando pegar permissão')
        //     const { status } = await ImagePicker.requestCameraRollPermissionsAsync()
        //     if (status !== 'granted') {
        //         alert('Sorry, we need camera roll permissions to make this work!')
        //     }
        // })()
    }, [])

    useEffect(() => {
        console.log(levels)
    }, [levels])

    function handleAddQuestion(levelId) {
        addNewQuestion(levelId)
    }

    function handleRemoveQuestion(levelId, questionId) {
        removeQuestion(levelId, questionId)
    }

    function handleNavigationToQuestion(levelId, questionId) {
        navigation.navigate('EditQuestion', {
            levelId,
            questionId
        })
    }

    function handleGoBack() {
        navigation.goBack()
    }

    async function pickImage(levelId, questionId, fieldName) {

        const { status } = await ImagePicker.requestCameraRollPermissionsAsync()
        if (status !== 'granted') {
            alert('Sinto muito, precisamos dessas permissões para esse recurso funcionar!')
            return
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 1,
        })
    
        if (!result.cancelled) {
            changeQuestionField(levelId, questionId, fieldName, result.uri)
        }
    }

    return (
        <View style={styles.container}>
            <Header
                title={`Nível ${levelId + 1}`}
                headerRight={(
                    <RectButton
                        onPress={handleGoBack}
                        style={styles.okButton}
                    >
                        <Text style={styles.okButtonText}>OK</Text>
                    </RectButton>
                )}
            />
            <ScrollView>
                <View style={styles.levelContainer}>
                    <Text style={styles.experienceText}>Experiência</Text>
                        <TextInput
                            style={styles.experienceInput}
                            keyboardType="number-pad"
                            placeholder="Digite a quantidade de XP ao completar"
                            placeholderTextColor="rgba(0, 0, 0, 0.4)"
                            onChange={(event) => changeLevelField(levelId, 'experience', event.nativeEvent.text)}
                            value={levels[levelId].experience.toString()}
                        />
                </View>
                <View style={styles.questionsContainer}>
                        <Text style={styles.questionsContainerTitle}>Exercícios</Text>
                    {levels[levelId].questions.map((question, questionId) => (
                        <View
                            key={questionId}
                            style={styles.questionContent}
                        >
                            <Text style={styles.questionTitle}>{`Exercício ${questionId + 1}`}</Text>
                            <Text style={styles.mediaText}>Mídia</Text>
                            {question.media ? (
                                <TouchableOpacity style={styles.pickedImageButton} onPress={() => pickImage(levelId, questionId, 'media')}>
                                        <Image source={{ uri: question.media }} style={{ width: 200, height: 200 }} />
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity style={styles.imagePickerButton} onPress={() => pickImage(levelId, questionId, 'media')}>
                                        <FontAwesome5 name="camera" size={24} color={LIGHT_GRAY_COLOR} />
                                </TouchableOpacity>
                            )}
                            <Text style={styles.descriptionText}>Enunciado</Text>
                            <TextInput
                                style={styles.descriptionInput}
                                placeholder="Digite o enunciado do exercício"
                                placeholderTextColor="rgba(0, 0, 0, 0.4)"
                                onChange={(event) => changeQuestionField(levelId, questionId, 'description', event.nativeEvent.text)}
                                value={levels[levelId].questions[questionId].description}
                            />

                            <View style={styles.levelButtonsContainer}>
                                <RectButton
                                    style={styles.editButton}
                                    onPress={() => handleNavigationToQuestion(levelId, questionId)}
                                >
                                    <Text style={styles.editButtonText}>EDITAR</Text>
                                </RectButton>
                                <RectButton
                                    style={styles.deleteButton}
                                    onPress={() => handleRemoveQuestion(levelId, questionId)}
                                >
                                    <Text style={styles.deleteButtonText}>EXCLUIR</Text>
                                </RectButton>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
            <RectButton onPress={() => handleAddQuestion(levelId)} style={styles.addQuestionButton}>
                <FontAwesome name="plus" size={24} color={WHITE_COLOR} />
            </RectButton>
        </View>
    )
}

export default EditLevel
