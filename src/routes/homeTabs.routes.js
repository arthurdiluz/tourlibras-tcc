import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Profile from '../pages/Profile'
import Lectures from '../pages/Lectures'
import Leaderboard from '../pages/Leaderboard'
import Options from '../pages/Options'

import { useAuth } from '../context/auth'

import { SimpleLineIcons, Feather, MaterialIcons } from '@expo/vector-icons'
import { DIVISION_COLOR, MAIN_COLOR } from '../../styles.global'

const AppTabs = createBottomTabNavigator()

function HomeTabs() {
    const { user } = useAuth()

    return (
        <AppTabs.Navigator tabBarOptions={{ activeTintColor: MAIN_COLOR, inactiveTintColor: 'rgba(0, 0, 0, 0.5)', activeBackgroundColor: DIVISION_COLOR, showLabel: false }}>
            <AppTabs.Screen name="Profile" component={Profile} initialParams={{ userId: user.uid }} options={{ tabBarIcon: ({ color }) => (
                <Feather name="user" size={20} color={color} />
            ) }} />
            <AppTabs.Screen name="Lectures" component={Lectures} options={{ tabBarIcon: ({ color }) => (
                <Feather name="book-open" size={20} color={color} />
            ) }} />
            <AppTabs.Screen name="Leaderboard" component={Leaderboard} options={{ tabBarIcon: ({ color }) => (
                <MaterialIcons name="leaderboard" size={20} color={color} />
            ) }} />
            <AppTabs.Screen name="Options" component={Options} options={{ tabBarIcon: ({ color }) => (
                <SimpleLineIcons name="options" size={20} color={color} />
            ) }} />
        </AppTabs.Navigator>
    )
}

export default HomeTabs
