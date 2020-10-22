import React, { useEffect, useState } from 'react'
import {
    View, Text, Image, ScrollView
} from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import { AntDesign, MaterialIcons, FontAwesome, FontAwesome5 } from '@expo/vector-icons'

import Header from '../../components/Header'
import Database from '../../services/Database'

import { LIGHT_GRAY_COLOR, MAIN_COLOR } from '../../../styles.global'
import styles from './styles'

function Profile({ route: { params: { userId } } }) {
    const navigation = useNavigation()
    const [userDetails, setUserDetails] = useState({})
    const [userBadges, setUserBadges] = useState({})

    useEffect(() => {
        Database.getUserDetails(userId).then((response) => {
            setUserDetails(response)
        })
        Database.getUserBadges(userId).then((response) => {
            setUserBadges(response)
        })
    }, [])

    useEffect(() => {
        // console.log(userBadges)
    }, [userBadges])

    function formatDate(dateString) {
        const date = new Date(dateString)

        const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril',
                        'Maio', 'Junho', 'Julho', 'Agosto',
                        'Setembro', 'Outubro', 'Novembro', 'Dezembro']

        const day = date.getUTCDate()
        const month = months[date.getUTCMonth()]
        const year = date.getUTCFullYear()

        const formattedDate = `${day} de ${month} de ${year}`
        return formattedDate
    }

    function handleNavigationToEditProfile() {
        navigation.navigate('EditProfile')
    }

    return (
        <View style={styles.container}>
            <Header
                title="Perfil"
                headerRight={(
                    <BorderlessButton onPress={handleNavigationToEditProfile}>
                        <FontAwesome5 name="edit" size={26} color={MAIN_COLOR} />
                    </BorderlessButton>
                )}
            />

            <ScrollView>
                <View style={styles.profileInfo}>
                    <View style={styles.basicInfo}>
                    <Text style={styles.name}>{userDetails ? userDetails.name : ''}</Text>
                        <Text style={styles.date}>{userDetails ? `Entrou em ${formatDate(userDetails.signedUpAt)}` : ''}</Text>
                    </View>
                    <View style={styles.profileImageContainer}>
                        {userDetails.avatar ? (
                                <Image style={styles.profileImage} source={{ uri: userDetails.avatar }} />
                            ) : (
                                <FontAwesome name="user-circle" size={100} color={LIGHT_GRAY_COLOR} />
                        )}
                    </View>
                </View>

                <View style={styles.statisticsContainer}>
                    <Text style={styles.statisticsText}>Estatísticas</Text>
                    <View style={styles.statisticsContent}>
                        <View style={styles.experienceContainer}>
                            <AntDesign style={styles.experienceIcon} name="star" size={30} color="#FBD513" />
                            <View style={styles.experienceInfo}>
                                <Text style={styles.experienceTitle}>{userDetails.experience}</Text>
                                <Text style={styles.experienceDescription}>Experiência</Text>
                            </View>
                        </View>
                        <View style={styles.moneyContainer}>
                            <MaterialIcons name="attach-money" size={30} color="#00D200" />
                            <View style={styles.moneyInfo}>
                                <Text style={styles.moneyTitle}>{userDetails.money}</Text>
                                <Text style={styles.moneyDescription}>Dinheiro</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.badgesContainer}>
                    <Text style={styles.badgesText}>Medalhas</Text>
                    <View style={styles.badgesContent}>
                        {userBadges ? (Object.keys(userBadges).map((badgeId, badgeIndex) => (
                            <View key={badgeIndex} style={badgeIndex <= Object.length - 1 ? [styles.badgeContainer, styles.badgeBottomDivision] : styles.badgeContainer}>
                                <View style={styles.badgeInfo}>
                                    <Text style={styles.badgeTitle}>{userBadges[badgeId].title}</Text>
                                    <Text style={styles.badgeDescription}>{userBadges[badgeId].text}</Text>
                                </View>
                            </View>
                        ))) : (
                            <View style={styles.badgeContainer}>
                                <View style={styles.badgeInfo}>
                                    <Text style={styles.emptyBadgeTitle}>Nenhuma medalha{'\n'} foi encontrada :(</Text>
                                </View>
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default Profile
