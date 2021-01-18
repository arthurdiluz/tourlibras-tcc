import React, { useEffect, useRef, useState } from 'react'
import {
    View, Text, TextInput, Image
} from 'react-native'
import { RectButton, ScrollView, BorderlessButton, TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { Picker } from '@react-native-picker/picker';

import { FontAwesome, Feather, FontAwesome5 } from '@expo/vector-icons'

import { useLectureRegister } from '../../context/lectureRegister'
import Database from '../../services/Database'
import { useAuth } from '../../context/auth'

import getFileExtension from '../../utils/getFileExtension'
import Header from '../../components/Header'

import { MAIN_COLOR, WHITE_COLOR, LIGHT_GRAY_COLOR } from '../../../styles.global'
import styles from './styles'

function RegisterLecture() {
    const {
        levels, addNewLevel, removeLevel
    } = useLectureRegister()
    const navigation = useNavigation()
    const [media, setMedia] = useState('')
    const [name, setName] = useState('')
    const [badgesList, setBadgesList] = useState([{
        id: undefined,
        title: "Nenhuma"
    }])
    const [selectedBadgeId, setSelectedBadgeId] = useState(undefined)

    const componentIsMounted = useRef(true)
    useEffect(() => {
        Database.getBadgesList().then((response) => {
            if(componentIsMounted.current){
                
                const auxBadgesList = [...badgesList]
                Object.keys(response).forEach((badgeId, badgeIndex) => {
                    auxBadgesList.push({
                        id: badgeId,
                        title: response[badgeId].title
                    })
                })

                setBadgesList(auxBadgesList)
            }
        })

        return () => {
            componentIsMounted.current = false
        }
    }, [])

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
        navigation.goBack()
    }

    async function handleSave() {
        const lecture = { icon: media, name, badge: selectedBadgeId, levels: levels }

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
        
        handleGoBack()
    }

    async function pickImage() {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted') {
            alert('Sinto muito, precisamos dessas permissões para esse recurso funcionar!')
            return
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            allowsEditing: true,
            allowsMultipleSelection: false,
            aspect: [4, 4]
        })
    
        if (!result.cancelled) {
            setMedia(result.uri)
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
                    <View style={styles.imagePickerContainer}>
                        <Text style={styles.imagePickerLabel}>Mídia</Text>
                        {media ? (
                            <View style={styles.touchableContainer}>
                                <TouchableOpacity style={styles.pickedImageButton} onPress={() => pickImage()}>
                                        <Image source={{ uri: media }} style={styles.selectedImage} />
                                </TouchableOpacity>
                            </View>
                            ) : (
                            <View style={styles.touchableContainer}>
                                <TouchableOpacity style={styles.imagePickerButton} onPress={() => pickImage()}>
                                        <FontAwesome5 name="camera" size={24} color={LIGHT_GRAY_COLOR} />
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
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

                    <Text style={styles.badgePickerText}>Medalha ao completar a aula</Text>
                    <View style={styles.badgePickerContainer}>
                        <Picker
                            selectedValue={selectedBadgeId}
                            onValueChange={(itemValue) => {
                                setSelectedBadgeId(itemValue)
                            }}
                            prompt="Medalha ao completar a aula"
                            mode="dropdown"
                        >
                            {badgesList.map((badge, badgeIndex) => (
                                <Picker.Item
                                    key={badgeIndex}
                                    label={badge.title}
                                    value={badge.id}
                                />
                            ))}
                        </Picker>
                    </View>
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

export default RegisterLecture
