import React from 'react'
import {
    View, Text, ScrollView, TextInput, Image
} from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'

import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import { useLectureRegister } from '../../context/lectureRegister'
import Header from '../../components/Header'

import { WHITE_COLOR, LIGHT_GRAY_COLOR } from '../../../styles.global'
import styles from './styles'

function EditQuestion({ route: { params: { levelId, questionId } } }) {
    const {
        levels, addNewOption, removeOption, changeOptionField
    } = useLectureRegister()
    const navigation = useNavigation()

    function handleRemoveOption(levelId, questionId, optionId) {
        removeOption(levelId, questionId, optionId)
    }

    function handleAddOption(levelId, questionId) {
        addNewOption(levelId, questionId)
    }

    function handleGoBack() {
        navigation.goBack()
    }

    async function pickImage(levelId, questionId, optionId, fieldName) {

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
            changeOptionField(levelId, questionId, optionId, fieldName, result.uri)
        }
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
                            {option.media ? (
                                <TouchableOpacity style={styles.pickedImageButton} onPress={() => pickImage(levelId, questionId, optionId, 'media')}>
                                        <Image source={{ uri: option.media }} style={{ width: 200, height: 200 }} />
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity style={styles.imagePickerButton} onPress={() => pickImage(levelId, questionId, optionId, 'media')}>
                                        <FontAwesome5 name="camera" size={24} color={LIGHT_GRAY_COLOR} />
                                </TouchableOpacity>
                            )}
                            <Text style={styles.textText}>Texto</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Digite o texto da alternativa"
                                placeholderTextColor="rgba(0, 0, 0, 0.4)"
                                onChange={(event) => changeOptionField(levelId, questionId, optionId, 'text', event.nativeEvent.text)}
                                value={levels[levelId].questions[questionId].options[optionId].text}
                            />
                            <View style={styles.isCorrectCheckboxContainer}>
                                <Text style={styles.isCorrectText}>É a alternativa correta?</Text>
                                <CheckBox
                                    disabled={false}
                                    value={levels[levelId].questions[questionId].options[optionId].isCorrect}
                                    onValueChange={(value) => changeOptionField(levelId, questionId, optionId, 'isCorrect', value)}
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
