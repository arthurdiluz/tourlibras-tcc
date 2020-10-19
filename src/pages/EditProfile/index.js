import React from 'react'
import { View, Text } from 'react-native'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'; 

import Header from '../../components/Header'

import { MAIN_COLOR } from '../../../styles.global';
import styles from './styles'


function EditProfile() {
    const navigation = useNavigation()

    function handleGoBack() {
        navigation.goBack()
    }

    function handleSave() {
        
    }

    return (
        <View style={styles.container}>
            <Header title="Editar perfil" headerLeft={(
                <BorderlessButton onPress={handleGoBack}>
                    <Feather name="arrow-left" size={26} color={MAIN_COLOR} />
                </BorderlessButton>
            )} headerRight={(
                <RectButton
                    onPress={handleSave}
                    style={styles.saveButton}
                >
                    <Text style={styles.saveButtonText}>Salvar</Text>
                </RectButton>
            )} />
        </View>
    )
}

export default EditProfile