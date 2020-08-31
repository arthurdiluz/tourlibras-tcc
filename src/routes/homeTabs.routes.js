import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Profile from '../pages/Profile'
import Lessons from '../pages/Lessons'

const AppTabs = createBottomTabNavigator()

function HomeTabs() {
    return (
        <AppTabs.Navigator>
            <AppTabs.Screen name="Profile" component={Profile} />
            <AppTabs.Screen name="Lessons" component={Lessons} />
        </AppTabs.Navigator>
    )
}

export default HomeTabs
