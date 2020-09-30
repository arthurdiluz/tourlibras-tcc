import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { LectureRegisterProvider } from '../context/lectureRegister'

import RegisterLecture from '../pages/RegisterLecture'
import EditLevel from '../pages/EditLevel'
import EditQuestion from '../pages/EditQuestion'

const DevStack = createStackNavigator()

function DevRoutes() {
    return (
        <LectureRegisterProvider>
            <DevStack.Navigator headerMode="none">
                <DevStack.Screen name="RegisterLecture" component={RegisterLecture} />
                <DevStack.Screen name="EditLevel" component={EditLevel} />
                <DevStack.Screen name="EditQuestion" component={EditQuestion} />
            </DevStack.Navigator>
        </LectureRegisterProvider>
    )
}

export default DevRoutes
