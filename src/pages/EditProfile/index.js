import React, { useEffect, useState } from 'react'
import { View, Text, Image, TextInput } from 'react-native'
import { BorderlessButton, RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker'

import Header from '../../components/Header'
import { useAuth } from '../../context/auth';
import Database from '../../services/Database';

import { Feather, FontAwesome } from '@expo/vector-icons'; 
import { MAIN_COLOR, LIGHT_GRAY_COLOR } from '../../../styles.global';
import styles from './styles'


function EditProfile() {
    const navigation = useNavigation()
    const { user } = useAuth()
    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState('')

    useEffect(() => {
        Database.getUserDetailsOnce(user.uid).then((response) => {
            setName(response.name)
            setAvatar(response.avatar)
        })
    }, [])

    function handleGoBack() {
        navigation.goBack()
    }

    async function handleSave() {
        let pictureStoragePath = `users/${user.uid}/media/profile-picture.jpg`

        Database.updateProfileName(user, name)

        Database.uploadImage(avatar, pictureStoragePath, (downloadUrl) => {
            Database.updateProfilePicture(user, downloadUrl)
        })
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
            setAvatar(result.uri)
        }
    }

    return (
        <View style={styles.container}>
            <Header title="Editar perfil" headerLeft={(
                <BorderlessButton onPress={handleGoBack}>
                    <Feather name="arrow-left" size={26} color={MAIN_COLOR} />
                </BorderlessButton>
            )}/>
            <View style={styles.contentContainer}>
                <View style={styles.editProfileContainer}>
                    <View style={styles.imagePickerContainer}>
                        <TouchableOpacity  activeOpacity={0.5} onPress={pickImage}>
                            {
                                avatar == '' ? (
                                    <FontAwesome name="user-circle" size={200} color={LIGHT_GRAY_COLOR} />
                                    ) : (
                                    <Image source={{ uri: avatar }} style={styles.profileImage} />
                                )
                            }
                            <View style={styles.cameraIconContainer}>
                                <Feather name="camera" size={25} color="white" />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={styles.textInputLabel}>
                            Digite seu nome
                        </Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Digite o seu nome"
                            placeholderTextColor="rgba(0, 0, 0, 0.4)"
                            onChange={(event) => setName(event.nativeEvent.text)}
                            value={name}
                        />
                    </View>
                </View>
                <View>
                    <RectButton
                        onPress={handleSave}
                        style={styles.saveButton}
                        rippleColor="rgba(0, 0, 0, 0.2)"
                    >
                        <Text style={styles.saveButtonText}>Salvar</Text>
                    </RectButton>
                </View>
            </View>
        </View>
    )
}

export default EditProfile