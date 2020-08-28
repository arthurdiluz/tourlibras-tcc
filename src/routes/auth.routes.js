import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Authorization from '../pages/Authorization'

const AuthStack = createStackNavigator()

function AuthRoutes() {
    return (
        <AuthStack.Navigator headerMode="none">
            <AuthStack.Screen name="Authorization" component={Authorization} />
        </AuthStack.Navigator>
    )
}

export default AuthRoutes
