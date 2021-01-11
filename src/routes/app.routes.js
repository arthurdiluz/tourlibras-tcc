import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import HomeTabs from './homeTabs.routes'
import EditProfile from '../pages/EditProfile'
import Questions from '../pages/Questions'
import LectureCompletion from '../pages/LectureCompletion'
import Profile from '../pages/Profile'

const AppStack = createStackNavigator()

function AppRoutes() {

    return (
        <AppStack.Navigator headerMode="none">
            <AppStack.Screen name="Home" component={HomeTabs} />
            <AppStack.Screen name="EditProfile" component={EditProfile} />
            <AppStack.Screen name="Questions" component={Questions} />
            <AppStack.Screen name="LectureCompletion" component={LectureCompletion} />
            <AppStack.Screen name="ViewUserProfile" component={Profile} />
        </AppStack.Navigator>
    )
}

export default AppRoutes
