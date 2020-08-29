import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Authorization from '../pages/Authorization'
import ForgotPassword from '../pages/ForgotPassword'

const AuthStack = createStackNavigator()

function AuthRoutes() {
    return (
        <AuthStack.Navigator headerMode="none">
            <AuthStack.Screen name="Authorization" component={Authorization} />
            <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
        </AuthStack.Navigator>
    )
}

export default AuthRoutes
