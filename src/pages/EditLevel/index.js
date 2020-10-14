import React, { useEffect, useState } from 'react'
import { View, Text, TextInput } from 'react-native'
import { RectButton, ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

// https://goshakkk.name/array-form-inputs/

import { FontAwesome } from '@expo/vector-icons'
import { useLectureRegister } from '../../context/lectureRegister'
import Header from '../../components/Header'

import { WHITE_COLOR } from '../../../styles.global'
import styles from './styles'

function EditLevel({ route: { params: { levelId } } }) {
    const {
        levels, addNewQuestion, removeQuestion, changeQuestionField, changeLevelField
    } = useLectureRegister()
    const navigation = useNavigation()
    const [experience, setExperience] = useState('')

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
                            onChange={changeLevelField(levelId, 'experience')}
                            value={levels[levelId].experience}
                        />
                </View>
                <View style={styles.questionsContainer}>
                        <Text style={styles.questionsContainerTitle}>Exercícios do nível {levelId + 1}</Text>
                    {levels[levelId].questions.map((question, questionId) => (
                        <View
                            key={questionId}
                            style={styles.questionContent}
                        >
                            <Text style={styles.questionTitle}>{`Exercício ${questionId + 1}`}</Text>
                            <Text style={styles.mediaText}>Mídia</Text>
                            <Text style={styles.descriptionText}>Enunciado</Text>
                            <TextInput
                                style={styles.descriptionInput}
                                placeholder="Digite o enunciado do exercício"
                                placeholderTextColor="rgba(0, 0, 0, 0.4)"
                                onChange={changeQuestionField(levelId, questionId, 'description')}
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
