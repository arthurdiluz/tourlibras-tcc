import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Profile from '../pages/Profile'
import Lectures from '../pages/Lectures'
import Leaderboard from '../pages/Leaderboard'
import Options from '../pages/Options'

import { useAuth } from '../context/auth'

const AppTabs = createBottomTabNavigator()

function HomeTabs() {
    const { user } = useAuth()

    return (
        <AppTabs.Navigator>
            <AppTabs.Screen name="Profile" component={Profile} initialParams={{ userId: user.uid }} />
            <AppTabs.Screen name="Lectures" component={Lectures} />
            <AppTabs.Screen name="Leaderboard" component={Leaderboard} />
            <AppTabs.Screen name="Options" component={Options} />
        </AppTabs.Navigator>
    )
}

export default HomeTabs
