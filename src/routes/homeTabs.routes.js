import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Profile from '../pages/Profile'
import Lectures from '../pages/Lectures'
import Leaderboard from '../pages/Leaderboard'
import Store from '../pages/Store'
import Options from '../pages/Options'

import { useAuth } from '../context/auth'
import { useTheme } from '../context/theme'

import { SimpleLineIcons, Feather, MaterialIcons, AntDesign } from '@expo/vector-icons'
import { DIVISION_COLOR, MAIN_COLOR } from '../../styles.global'

const AppTabs = createBottomTabNavigator()

function HomeTabs() {
    const { user } = useAuth()
    const { theme } = useTheme()

    return (
        <AppTabs.Navigator
            tabBarOptions={{
                activeTintColor: theme.colors.tabIconActive,
                inactiveTintColor: theme.colors.tabIconInactive,
                activeBackgroundColor: theme.colors.tabButtonActiveBackground,
                inactiveBackgroundColor: theme.colors.tabButtonInactiveBackground,
                showLabel: false,
                style: {
                    borderTopColor: theme.colors.tabButtonDivision,
                    borderTopWidth: 2
                }
            }}
        >
            <AppTabs.Screen name="Profile" component={Profile} initialParams={{ userId: user.uid }} options={{ tabBarIcon: ({ color, focused }) => (
                <Feather name="user" size={focused ? 25 : 20} color={color} />
            ) }} />
            <AppTabs.Screen name="Lectures" component={Lectures} options={{ tabBarIcon: ({ color, focused }) => (
                <Feather name="book-open" size={focused ? 25 : 20} color={color} />
            ) }} />
            <AppTabs.Screen name="Leaderboard" component={Leaderboard} options={{ tabBarIcon: ({ color, focused }) => (
                <MaterialIcons name="leaderboard" size={focused ? 25 : 20} color={color} />
            ) }} />
            <AppTabs.Screen name="Store" component={Store} options={{ tabBarIcon: ({ color, focused }) => (
                <AntDesign name="shoppingcart" size={focused ? 25 : 20} color={color} />
            ) }} />
            <AppTabs.Screen name="Options" component={Options} options={{ tabBarIcon: ({ color, focused }) => (
                <SimpleLineIcons name="options" size={focused ? 25 : 20} color={color} />
            ) }} />
        </AppTabs.Navigator>
    )
}

export default HomeTabs
