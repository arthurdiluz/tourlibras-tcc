import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { BorderlessButton } from 'react-native-gesture-handler'

import Database from '../../services/Database'
import Header from '../../components/Header'
import LectureButton from '../../components/LectureButton'

import styles from './styles.js'
import { Feather } from '@expo/vector-icons'
import { MAIN_COLOR } from '../../../styles.global'

function EditLecturesList() {
    const navigation = useNavigation()
    const [loading, setLoading] = useState(true)
    const [lecturesList, setLecturesList] = useState({})

    const componentIsMounted = useRef(true)
    useEffect(() => {
        Database.getLecturesList().then((response) => {
            if(componentIsMounted.current) {
                setLecturesList(response)
                setLoading(false)
            }
        })
        return () => {
            componentIsMounted.current = false
        }
    }, [])

    function handleNavigationToEditLecture(lectureId) {
        navigation.navigate('EditLecture', {
            lectureId
        })
    }

    function handleGoBack() {
        navigation.goBack()
    }
    
    return (
        <View style={styles.container}>
            <Header
                title="Editar aula"
                headerLeft={(
                    <BorderlessButton onPress={handleGoBack}>
                        <Feather name="arrow-left" size={26} color={MAIN_COLOR} />
                    </BorderlessButton>
                )}
            />
            <ScrollView>
                <View style={styles.lecturesContainer}>
                    <View style={styles.lectureView}>
                        {loading ? (
                            <View>
                                <Text style={styles.emptyLecturesText}>Não há nenhuma aula cadastrada! :(</Text>
                            </View>
                        ) : Object.keys(lecturesList).map((lectureId, lectureIndex) => (
                            <View key={lectureIndex}>
                                <LectureButton
                                    size={100}
                                    avatarUrl={lecturesList[lectureId].icon}
                                    progress={1}
                                    onPress={() => handleNavigationToEditLecture(lectureId)}
                                    hideLevelContainer={true}
                                />
                                <Text style={styles.lectureText}>{lecturesList[lectureId].name}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default EditLecturesList