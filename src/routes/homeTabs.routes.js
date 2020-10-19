import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Profile from '../pages/Profile'
import Lessons from '../pages/Lessons'
import Options from '../pages/Options'

import { useAuth } from '../context/auth'

const AppTabs = createBottomTabNavigator()

function HomeTabs() {
    const { user } = useAuth()

    return (
        <AppTabs.Navigator>
            <AppTabs.Screen name="Profile" component={Profile} initialParams={{ userId: user.uid }} />
            <AppTabs.Screen name="Lessons" component={Lessons} />
            <AppTabs.Screen name="Options" component={Options} />
        </AppTabs.Navigator>
    )
}

export default HomeTabs
