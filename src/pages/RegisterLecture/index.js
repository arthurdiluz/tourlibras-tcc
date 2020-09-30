import React, { useState, useEffect } from 'react'
import {
    View, Text, TextInput
} from 'react-native'
import { RectButton, ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import { FontAwesome, Entypo } from '@expo/vector-icons'

import { useLectureRegister } from '../../context/lectureRegister'

import Header from '../../components/Header'
// import LessonForm from '../../components/LessonForm'

import { MAIN_COLOR, WHITE_COLOR } from '../../../styles.global'
import styles from './styles'

function RegisterLesson() {
    const {
        levels, addNewLevel, removeLevel, changeLevelName
    } = useLectureRegister()
    const navigation = useNavigation()
    const [name, setName] = useState('')
    const [experience, setExperience] = useState('')

    useEffect(() => {
        console.log(levels)
    }, [levels])

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

    function handleSave() {
        console.log('SALVAR')
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

                    <Text style={styles.experienceText}>Experiência</Text>
                    <TextInput
                        style={styles.experienceInput}
                        keyboardType="number-pad"
                        placeholder="Digite a quantidade de XP ao completar"
                        placeholderTextColor="rgba(0, 0, 0, 0.4)"
                        onChange={(event) => {
                            setExperience(event.nativeEvent.text)
                        }}
                    />
                </View>
                <View style={styles.levelContainer}>
                    <Text style={styles.levelContainerTitle}>Níveis da aula</Text>
                    {/* <FlatList
                    data={levels}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.toString()}
                /> */}
                    {levels.map((level, levelId) => (
                        <View key={levelId} style={styles.levelContent}>
                            <Text style={styles.levelText}>
                                Nível
                                {' '}
                                {levelId + 1}
                            </Text>
                            {/* <TextInput
                                placeholder={`Level #${levelId + 1} name`}
                                value={level.name}
                                onChange={changeLevelname(levelId)}
                            /> */}
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
