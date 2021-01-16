import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { LectureRegisterProvider } from '../context/lectureRegister'

import DevLanding from '../pages/DevLanding'
import RegisterLecture from '../pages/RegisterLecture'
import EditLevel from '../pages/EditLevel'
import EditQuestion from '../pages/EditQuestion'
import RegisterBadge from '../pages/RegisterBadge'
import EditLecturesList from '../pages/EditLecturesList'
import EditLecture from '../pages/EditLecture'

const DevStack = createStackNavigator()

function DevRoutes() {
    return (
        <LectureRegisterProvider>
            <DevStack.Navigator headerMode="none">
                <DevStack.Screen name="DevLanding" component={DevLanding} />
                <DevStack.Screen name="RegisterLecture" component={RegisterLecture} />
                <DevStack.Screen name="EditLevel" component={EditLevel} />
                <DevStack.Screen name="EditQuestion" component={EditQuestion} />
                <DevStack.Screen name="RegisterBadge" component={RegisterBadge} />
                <DevStack.Screen name="EditLecturesList" component={EditLecturesList} />
                <DevStack.Screen name="EditLecture" component={EditLecture} />
            </DevStack.Navigator>
        </LectureRegisterProvider>
    )
}

export default DevRoutes
