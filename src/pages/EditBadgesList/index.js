import React, { useEffect, useRef, useState } from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import Header from '../../components/Header'
import Database from '../../services/Database'

import { Feather } from '@expo/vector-icons'
import styles from './styles.js'
import { MAIN_COLOR } from '../../../styles.global'

function EditBadgesList() {
    const navigation = useNavigation()
    const [loading, setLoading] = useState(true)
    const [badgesList, setBadgesList] = useState({})

    const componentIsMounted = useRef(true)
    useEffect(() => {
        Database.getBadgesList().then((response) => {
            if(componentIsMounted.current) {
                setBadgesList(response)
                setLoading(false)
            }
        })

        return () => {
            componentIsMounted.current = false
        }
    }, [])

    function handleNavigationToEditBadge(badgeId) {
        navigation.navigate('EditBadge', {
            badgeId
        })
    }

    function handleGoBack() {
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <Header
                title="Editar medalha"
                headerLeft={(
                    <BorderlessButton onPress={handleGoBack}>
                        <Feather name="arrow-left" size={26} color={MAIN_COLOR} />
                    </BorderlessButton>
                )}
            />
            <ScrollView>
                <View style={styles.badgesContainer}>
                    <View style={styles.badgeView}>
                        {loading ? (
                            <View>
                                <Text style={styles.emptyBadgesText}>Não há nenhuma medalha cadastrada! :(</Text>
                            </View>
                        ) : Object.keys(badgesList).map((badgeId, badgeIndex) => (
                            <View style={styles.badgeInfo} key={badgeIndex}>
                                <View style={styles.badgeButtonContainer}>
                                    <RectButton
                                        style={styles.badgeButton}
                                        onPress={() => handleNavigationToEditBadge(badgeId)}
                                    >
                                        {
                                            badgesList[badgeId].media !== "" && <Image style={styles.badgeButtonImage} source={{ uri: badgesList[badgeId].media }} />
                                        }
                                    </RectButton>
                                </View>
                                <Text style={styles.badgeText}>{badgesList[badgeId].title}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default EditBadgesList