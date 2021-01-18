import React, { useEffect, useRef, useState } from 'react'
import {
    View, Text, Image, ScrollView
} from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import { AntDesign, MaterialIcons, FontAwesome, FontAwesome5, Feather, MaterialCommunityIcons } from '@expo/vector-icons'

import Header from '../../components/Header'
import Database from '../../services/Database'
import { useAuth } from '../../context/auth'

import { LIGHT_GRAY_COLOR, MAIN_COLOR, RED_COLOR } from '../../../styles.global'
import styles from './styles'

function Profile({ route: { params: { userId } } }) {
    const navigation = useNavigation()
    const { user: authenticatedUser } = useAuth()
    const [userDetails, setUserDetails] = useState({})
    const [badgesList, setBadgesList] = useState({}) // List of available badges
    const [userBadges, setUserBadges] = useState({}) // Information about all available badges related to a respective user (eg, if it's already been achieved by that user)
    const [badgesToBeShown, setBadgesToBeShown] = useState([]) // Which badges to be shown on the screen

    const componentIsMounted = useRef(true)
    useEffect(() => {
        Database.getUserDetails(userId, (response) => {
            if(componentIsMounted.current) {
                setUserDetails(response)
            }
        })
        Database.getBadgesList().then((response) => {
            if(componentIsMounted.current) {
                setBadgesList(response)
            }
        })
        Database.getUserBadges(userId, (response) => {
            if(componentIsMounted.current) {
                setUserBadges(response)
            }
        })
        return () => {
            componentIsMounted.current = false
        }
    }, [])

    useEffect(() => {
        try {
            
            if(Object.keys(badgesList).length !== 0 && Object.keys(userBadges).length !== 0) {
                const badgesId = Object.keys(badgesList)
    
                const badgesAuxList = []

                
                badgesId.forEach((badgeId) => {
                    if(userBadges[badgeId]['achieved']) {
                        badgesAuxList.push({
                            ...badgesList[badgeId],
                            quantity: userBadges[badgeId]['quantity']
                        })
                    }
                })
    
                if(componentIsMounted.current) {
                    setBadgesToBeShown(badgesAuxList)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }, [badgesList, userBadges])

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

    function handleGoBack() {
        navigation.goBack()
    }

    function getFirstName() {
        if(userDetails.name == undefined) {
            return "Usuário"
        } else {
            return userDetails.name.split(" ")[0]
        }
    }

    return (
        <View style={styles.container}>
            <Header
                title={authenticatedUser.uid == userId ? 'Perfil' : `Perfil de ${getFirstName()}`}
                headerLeft={authenticatedUser.uid !== userId && (
                    <BorderlessButton onPress={handleGoBack}>
                        <Feather name="arrow-left" size={26} color={MAIN_COLOR} />
                    </BorderlessButton>
                )}
                headerRight={authenticatedUser.uid == userId && (
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
                        {badgesToBeShown.length !== 0 ? badgesToBeShown.map((badge, badgeIndex) => (
                            <View key={badgeIndex} style={badgeIndex < badgesToBeShown.length - 1 ? [styles.badgeContainer, styles.badgeBottomDivision] : styles.badgeContainer}>
                                {
                                    badge['media'] === "" ? (
                                        <View style={styles.badgeIconContainer}>
                                            <MaterialCommunityIcons name="trophy-award" size={50} color="#A0A000" />
                                            {
                                                badge['cumulative'] === true && (
                                                    <View style={styles.badgeQuantityIconContainer}>
                                                        <Text style={styles.badgeQuantityIconText}>{`x${badge['quantity']}`}</Text>
                                                    </View>
                                                )
                                            }
                                        </View>
                                    ) : (
                                        <View>
                                            <Image source={{ uri: badge['media'] }} style={styles.badgeImage} />
                                            {
                                                badge['cumulative'] === true && (
                                                    <View style={styles.badgeQuantityImageContainer}>
                                                        <Text style={styles.badgeQuantityImageText}>{`x${badge['quantity']}`}</Text>
                                                    </View>
                                                )
                                            }
                                        </View>
                                    )
                                }
                                <View style={styles.badgeInfo}>
                                    <Text style={styles.badgeTitle}>{badge.title}</Text>
                                    <Text style={styles.badgeDescription}>{badge.text}</Text>
                                </View>
                            </View>
                        )) : (
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
