import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Profile from '../pages/Profile'

const AppStack = createStackNavigator()

function AppRoutes() {
    return (
        <AppStack.Navigator>
            <AppStack.Screen name="Profile" component={Profile} />
        </AppStack.Navigator>
    )
}

export default AppRoutes
