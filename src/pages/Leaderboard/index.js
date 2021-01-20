import React, { useEffect, useState } from 'react'
import { View, ScrollView, Text, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import MultipleOptionsButton from '../../components/MultipleOptionsButton'

import styles from './styles'
import { FontAwesome } from '@expo/vector-icons'

import Header from '../../components/Header'
import Database from '../../services/Database'

import { useAuth } from '../../context/auth'
import { useTheme } from '../../context/theme'

function Leaderboard() {
    const navigation = useNavigation()
    const { theme } = useTheme()
    const [availableFilters, setAvailableFilters] = useState([{
        filter: 'experience',
        description: 'Experiência',
        symbol: 'XP'
    }, {
        filter: 'money',
        description: 'Dinheiro',
        symbol: '$'
    }])
    const [selectedFilterIndex, setSelectedFilterIndex] = useState(0)
    const [leaderboard, setLeaderboard] = useState([])
    const { user: authenticatedUser } = useAuth()

    useEffect(() => {
        Database.getLeaderboard(availableFilters[selectedFilterIndex].filter).then((response) => {
            setLeaderboard(response)
        })
    }, [selectedFilterIndex])

    function onFilterChange(selectedFilterIndex) {
        setSelectedFilterIndex(selectedFilterIndex)
    }

    function getFiltersDescription() {
        const availableFiltersDescription = availableFilters.map((filterObject) => {
            return filterObject.description
        })
        return availableFiltersDescription
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Header
                title="Placar"
            />
            <ScrollView>
                <View style={[styles.leaderboardContainer, { borderColor: theme.colors.division }]}>
                    <View style={[styles.filtersContainer, { borderColor: theme.colors.division }]}>
                        <Text style={[styles.filtersTitle, { color: theme.colors.lightText }]}>Filtrar por:</Text>
                        <View style={styles.filterButtonsContainer}>
                            <MultipleOptionsButton
                                options={getFiltersDescription()}
                                callback={onFilterChange}
                            />
                        </View>
                    </View>
                    <View>
                        {leaderboard.length == 0 && (
                            <Text style={[styles.emptyLeaderboardText, { color: theme.colors.lightText }]}>Não foi encontrado nenhum usuário no placar :(</Text>
                        )}
                        {leaderboard.map((user, userPosition) => (
                            <TouchableOpacity
                                key={userPosition}
                                activeOpacity={0.5}
                                disabled={user.key == authenticatedUser.uid}
                                onPress={() => {
                                    const userId = user.key
                                    navigation.navigate('ViewUserProfile', { userId })
                                }}
                                style={[
                                    styles.anotherUserButtonDefault,
                                    userPosition !== 0 && [styles.anotherUserButtonWithTopBorder, { borderColor: theme.colors.secondaryDivision }],
                                    userPosition == leaderboard.length - 1 && styles.lastUserButton,
                                    user.key == authenticatedUser.uid && [styles.authenticatedUserContainer, { backgroundColor: theme.colors.main }]
                                ]}
                            >
                                <View style={styles.userPositionContainer}>
                                    <Text
                                        style={[
                                            styles.userPositionText,
                                            {
                                                color: theme.colors.strongText
                                            },
                                            user.key == authenticatedUser.uid && {
                                                color:theme.colors.white
                                            }
                                        ]}
                                    >
                                        {userPosition + 1}
                                    </Text>
                                </View>
                                <View style={styles.userInfoContainer}>
                                    <View style={styles.userInfoGroup}>
                                        {user.info.avatar ? (
                                            <Image source={{ uri: user.info.avatar }} style={styles.userAvatar} />
                                        ) : (
                                            <FontAwesome
                                                name="user-circle"
                                                size={50}
                                                color={user.key == authenticatedUser.uid ? (
                                                    theme.colors.strongDefaultProfileIcon
                                                ) : (
                                                    theme.colors.lightDefaultProfileIcon
                                                )} />
                                        )}
                                        <Text
                                            style={[
                                                styles.userNameText,
                                                { color: theme.colors.lightText },
                                                user.key == authenticatedUser.uid && {
                                                    color: theme.colors.white
                                                }
                                            ]}
                                        >{user.info.name}</Text>
                                    </View>
                                    <Text
                                        style={[
                                            styles.userFilterValueText,
                                            {
                                                color: theme.colors.strongText
                                            },
                                            user.key == authenticatedUser.uid && {
                                                color: theme.colors.white
                                            }
                                        ]}
                                    >
                                        {`${user.info[availableFilters[selectedFilterIndex].filter]} ${availableFilters[selectedFilterIndex].symbol}`}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default Leaderboard
