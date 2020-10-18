import React from 'react'
import { View, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import Header from '../../components/Header'
import LessonButton from '../../components/LessonButton'

import styles from './styles'

function Lessons() {
    return (
        <View style={styles.container}>
            <Header
                title="Exercícios"
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
                <View style={styles.lessonsContainer}>
                    <View style={styles.lessonView}>
                        <View>
                            <LessonButton
                                size={100}
                                avatarUrl="https://avatars2.githubusercontent.com/u/37125288?s=400&u=927021726c60d62b02e7d0db0e25ed3ea940e64a&v=4"
                                progress={1}
                                level={1}
                                onPress={() => {}}
                            />
                            <Text style={styles.lessonText}>Exercício 1</Text>
                        </View>
                        <View>
                            <LessonButton
                                size={100}
                                avatarUrl="https://avatars2.githubusercontent.com/u/37125288?s=400&u=927021726c60d62b02e7d0db0e25ed3ea940e64a&v=4"
                                progress={1}
                                level={1}
                                onPress={() => { }}
                            />
                            <Text style={styles.lessonText}>Exercício 2</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default Lessons
