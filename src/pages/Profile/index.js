import React from 'react'
import {
    View, Text, Image, ScrollView
} from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { useAuth } from '../../context/auth'
import Header from '../../components/Header'

import styles from './styles'

function Profile() {
    const { signOut } = useAuth()

    function handleSignOut() {
        signOut()
    }

    return (
        <View style={styles.container}>
            <Header title="Perfil" />

            <ScrollView>
                <View style={styles.profileInfo}>
                    <View style={styles.basicInfo}>
                        <Text style={styles.name}>Gabriel Haruki Gomes Satô</Text>
                        <Text style={styles.date}>Começou em Fevereiro de 2018</Text>
                    </View>
                    <View style={styles.profileImageContainer}>
                        <Image style={styles.profileImage} source={{ uri: 'https://avatars2.githubusercontent.com/u/37125288?s=400&u=927021726c60d62b02e7d0db0e25ed3ea940e64a&v=4' }} />
                    </View>
                </View>

                <View style={styles.statisticsContainer}>
                    <Text style={styles.statisticsText}>Estatísticas</Text>
                    <View style={styles.statisticsContent}>
                        <View style={styles.experienceContainer}>
                            <AntDesign style={styles.experienceIcon} name="star" size={30} color="#FBD513" />
                            <View style={styles.experienceInfo}>
                                <Text style={styles.experienceTitle}>7678</Text>
                                <Text style={styles.experienceDescription}>Experiência</Text>
                            </View>
                        </View>
                        <View style={styles.moneyContainer}>
                            <MaterialIcons name="attach-money" size={30} color="#00D200" />
                            <View style={styles.moneyInfo}>
                                <Text style={styles.moneyTitle}>7678</Text>
                                <Text style={styles.moneyDescription}>Dinheiro</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.badgesContainer}>
                    <Text style={styles.badgesText}>Medalhas</Text>
                    <View style={styles.badgesContent}>
                        <View style={[styles.badgeContainer, styles.badgeBottomDivision]}>
                            <View style={styles.badgeInfo}>
                                <Text style={styles.badgeTitle}>Wildfire</Text>
                                <Text style={styles.badgeDescription}>Reach a 30 day streak</Text>
                            </View>
                        </View>

                        <View style={[styles.badgeContainer, styles.badgeBottomDivision]}>
                            <View style={styles.badgeInfo}>
                                <Text style={styles.badgeTitle}>Wildfire</Text>
                                <Text style={styles.badgeDescription}>Reach a 30 day streak</Text>
                            </View>
                        </View>

                        <View style={[styles.badgeContainer, styles.badgeBottomDivision]}>
                            <View style={styles.badgeInfo}>
                                <Text style={styles.badgeTitle}>Wildfire</Text>
                                <Text style={styles.badgeDescription}>Reach a 30 day streak</Text>
                            </View>
                        </View>

                        <View style={[styles.badgeContainer, styles.badgeBottomDivision]}>
                            <View style={styles.badgeInfo}>
                                <Text style={styles.badgeTitle}>Wildfire</Text>
                                <Text style={styles.badgeDescription}>Reach a 30 day streak</Text>
                            </View>
                        </View>

                        <View style={[styles.badgeContainer, styles.badgeBottomDivision]}>
                            <View style={styles.badgeInfo}>
                                <Text style={styles.badgeTitle}>Wildfire</Text>
                                <Text style={styles.badgeDescription}>Reach a 30 day streak</Text>
                            </View>
                        </View>

                        <View style={styles.badgeContainer}>
                            <View style={styles.badgeInfo}>
                                <Text style={styles.badgeTitle}>Wildfire</Text>
                                <Text style={styles.badgeDescription}>Reach a 30 day streak</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* <RectButton onPress={handleSignOut} title="Sign Out">
                <Text>Logout</Text>
            </RectButton> */}
        </View>
    )
}

export default Profile
