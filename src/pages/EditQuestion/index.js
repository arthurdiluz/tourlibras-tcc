import React, { useEffect } from 'react'
import {
    View, Text, ScrollView, TextInput
} from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import { FontAwesome } from '@expo/vector-icons'
import { useLectureRegister } from '../../context/lectureRegister'
import Header from '../../components/Header'

import { WHITE_COLOR } from '../../../styles.global'
import styles from './styles'

function EditQuestion({ route: { params: { levelId, questionId } } }) {
    const {
        levels, addNewOption, removeOption, changeOptionField
    } = useLectureRegister()
    const navigation = useNavigation()

    useEffect(() => {
        console.log(levels)
    }, [levels])

    function handleRemoveOption(levelId, questionId, optionId) {
        removeOption(levelId, questionId, optionId)
    }

    function handleAddOption(levelId, questionId) {
        addNewOption(levelId, questionId)
    }

    function handleGoBack() {
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <Header
                title={`Exercício ${questionId + 1}`}
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
                <View style={styles.optionsContainer}>
                    {levels[levelId].questions[questionId].options.map((option, optionId) => (
                        <View
                            key={optionId}
                            style={styles.optionContent}
                        >
                            <Text style={styles.optionTitle}>{`Alternativa ${optionId + 1}`}</Text>
                            <Text style={styles.mediaText}>Mídia</Text>
                            <Text style={styles.textText}>Texto</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Digite o texto da alternativa"
                                placeholderTextColor="rgba(0, 0, 0, 0.4)"
                                onChange={changeOptionField(levelId, questionId, optionId, 'text')}
                                value={levels[levelId].questions[questionId].options[optionId].text}
                            />
                            <View style={styles.isCorrectCheckboxContainer}>
                                <Text style={styles.isCorrectText}>É a alternativa correta?</Text>
                                <CheckBox
                                    disabled={false}
                                    value={levels[levelId].questions[questionId].options[optionId].isCorrect}
                                    onValueChange={changeOptionField(levelId, questionId, optionId, 'isCorrect')}
                                />
                            </View>

                            <RectButton
                                style={styles.deleteButton}
                                onPress={() => handleRemoveOption(levelId, questionId, optionId)}
                            >
                                <Text style={styles.deleteButtonText}>EXCLUIR</Text>
                            </RectButton>
                        </View>
                    ))}
                </View>
            </ScrollView>
            <RectButton
                onPress={() => handleAddOption(levelId, questionId)}
                style={styles.addOptionButton}
            >
                <FontAwesome name="plus" size={24} color={WHITE_COLOR} />
            </RectButton>
        </View>
    )
}

export default EditQuestion
