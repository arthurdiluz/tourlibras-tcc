import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import HomeTabs from './homeTabs.routes'
import Options from '../pages/Options'

const AppStack = createStackNavigator()

function AppRoutes() {
    return (
        <AppStack.Navigator headerMode="none">
            <AppStack.Screen name="Home" component={HomeTabs} />
            <AppStack.Screen name="Options" component={Options} />
            {/* Another person's profile page */}
            {/* Lesson page */}
        </AppStack.Navigator>
    )
}

export default AppRoutes
