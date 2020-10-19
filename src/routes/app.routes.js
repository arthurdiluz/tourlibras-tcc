import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import HomeTabs from './homeTabs.routes'
import EditProfile from '../pages/EditProfile'

const AppStack = createStackNavigator()

function AppRoutes() {

    return (
        <AppStack.Navigator headerMode="none">
            <AppStack.Screen name="Home" component={HomeTabs} />
            <AppStack.Screen name="EditProfile" component={EditProfile} />
            {/* Another person's profile page */}
            {/* Lesson page */}
        </AppStack.Navigator>
    )
}

export default AppRoutes
