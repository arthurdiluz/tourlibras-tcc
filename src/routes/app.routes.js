import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import HomeTabs from './homeTabs.routes'

const AppStack = createStackNavigator()

function AppRoutes() {
    return (
        <AppStack.Navigator headerMode="none">
            <AppStack.Screen name="Home" component={HomeTabs} />
            {/* Another person's profile page */}
            {/* Configs page */}
            {/* Lesson page */}
        </AppStack.Navigator>
    )
}

export default AppRoutes
