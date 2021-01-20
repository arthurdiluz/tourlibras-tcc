import React, { useEffect, useRef, useState } from 'react'
import { View, Text, TextInput, Image, KeyboardAvoidingView, Platform, SafeAreaView, Keyboard } from 'react-native'
import { BorderlessButton, RectButton, TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import CheckBox from '@react-native-community/checkbox';
import * as ImagePicker from 'expo-image-picker'

import { Feather, FontAwesome5 } from '@expo/vector-icons'

import Header from '../../components/Header'

import styles from './styles'
import { MAIN_COLOR, LIGHT_GRAY_COLOR } from '../../../styles.global'
import Database from '../../services/Database';

function EditBadge({ route: { params: { badgeId }}}) {
    const navigation = useNavigation()
    const [media, setMedia] = useState("")
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [cumulative, setCumulative] = useState(false)
    const [isKeyboardUp, setIsKeyboardUp] = useState(false)

    const componentIsMounted = useRef(true)
    useEffect(() => {
        const didShowListener = Keyboard.addListener('keyboardDidShow', () => setIsKeyboardUp(true))
        const didHideListener = Keyboard.addListener('keyboardDidHide', () => setIsKeyboardUp(false))

        Database.getBadge(badgeId).then((response) => {
            if(componentIsMounted.current) {
                setMedia(response.media)
                setTitle(response.title)
                setText(response.text)
                setCumulative(response.cumulative)
            }
        })

        return () => {
            didShowListener.remove()
            didHideListener.remove()
            componentIsMounted.current = false
        }
    }, [])

    async function handleSave() {
        await Database.editBadge(badgeId, {
            media,
            title,
            text,
            cumulative
        })

        try {
            if (media === "") {
                throw new Error('Image not found')
            }

            const databasePath = `badges/${badgeId}/media/icon.jpg`

            Database.uploadImage(media, databasePath, (downloadUrl) => {
                Database.updateDbField(`badges/${badgeId}`, 'media', downloadUrl)
            })
        } catch (error) {
            console.log(error)
            Database.cancelInsertBadge(badgeId)
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
            allowsMultipleSelection: false
        })
    
        if (!result.cancelled) {
            setMedia(result.uri)
        }
    }

    function handleGoBack() {
        navigation.goBack()
    }

    return (
        <View style={styles.mainContainer}>
            <Header
                headerLeft={(
                    <BorderlessButton onPress={handleGoBack}>
                        <Feather name="arrow-left" size={26} color={MAIN_COLOR} />
                    </BorderlessButton>
                )}
                title="Editar medalha"
                titleSize={18}
                headerRight={(
                    <RectButton
                        onPress={handleSave}
                        style={styles.saveButton}
                    >
                        <Text style={styles.saveButtonText}>Salvar</Text>
                    </RectButton>
                )}
            />
            <KeyboardAvoidingView
                behavior={Platform.Os == 'ios' ? 'padding' : 'height'}
                style={[styles.container, isKeyboardUp === false && { justifyContent: 'flex-start' }]}
            >
                <SafeAreaView>
                    <View style={styles.imagePickerContainer}>
                        <Text style={styles.imagePickerLabel}>Mídia</Text>
                        {media !== "" ? (
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
                    <Text style={styles.textInputLabel}>Título</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Digite o título da medalha"
                        placeholderTextColor="rgba(0, 0, 0, 0.4)"
                        autoCapitalize="sentences"
                        value={title}
                        onChange={(event) => {
                            setTitle(event.nativeEvent.text)
                        }}
                    />
                    <Text style={styles.textInputLabel}>Descrição</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Digite a descrição da medalha"
                        placeholderTextColor="rgba(0, 0, 0, 0.4)"
                        autoCapitalize="sentences"
                        value={text}
                        onChange={(event) => {
                            setText(event.nativeEvent.text)
                        }}
                    />
                    <View style={styles.checkboxContainer}>
                        <Text style={styles.checkboxInputLabel}>A medalha é cumulativa?</Text>
                        <CheckBox
                            value={cumulative}
                            onChange={(value) => setCumulative(value.nativeEvent.value)}
                        />
                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>
        </View>
    )
}

export default EditBadge