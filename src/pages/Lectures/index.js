import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView } from 'react-native'

import Database from '../../services/Database'
import Header from '../../components/Header'
import LectureButton from '../../components/LectureButton'

import styles from './styles'
import { useNavigation } from '@react-navigation/native'

function Lectures() {
    const navigation = useNavigation()
    const [lecturesList, setLecturesList] = useState({})

    useEffect(() => {
        Database.getLecturesList().then((response) => {
            setLecturesList(response)
        })
    }, [])
    
    function handleNavigationToQuestions(lectureId, levelId) {
        const level = lecturesList[lectureId].levels[levelId]

        navigation.navigate('Questions', { level, lectureId, levelId })
    }

    return (
        <View style={styles.container}>
            <Header
                title="Aulas"
                // headerLeft={(
                //     <View style={styles.headerLeftContainer}>
                //         <AntDesign name="star" size={28} color="#FBD513" />
                //         <Text style={[styles.headerIconsText, styles.headerLeftIconText]}>
                //             3452
                //         </Text>
                //     </View>
                // )}
                // headerRight={(
                //     <View style={styles.headerRightContainer}>
                //         <MaterialIcons name="attach-money" size={28} color="#00D200" />
                //         <Text style={styles.headerIconsText}>
                //             3452
                //         </Text>
                //     </View>
                // )}
            />
            <ScrollView>
                <View style={styles.lecturesContainer}>
                    <View style={styles.lectureView}>
                        {lecturesList ? Object.keys(lecturesList).map((lectureId, lectureIndex) => (
                            <View key={lectureIndex}>
                                <LectureButton
                                    size={100}
                                    avatarUrl={lecturesList[lectureId].icon}
                                    progress={1}
                                    level={0 + 1}
                                    onPress={() => handleNavigationToQuestions(lectureId, 0)}
                                />
                                <Text style={styles.lectureText}>{lecturesList[lectureId].name}</Text>
                            </View>
                        )) : (
                            <View>
                                <Text>Não há nenhuma aula cadastrada! :(</Text>
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default Lectures
