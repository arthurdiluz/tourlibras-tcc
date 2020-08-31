import { StyleSheet } from 'react-native'

import Constants from 'expo-constants'

const DIVISION_COLOR = 'rgba(0, 0, 0, 0.1)'
export const MAIN_COLOR = '#00BFFF'

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight + 5,
        borderBottomWidth: 2,
        borderColor: DIVISION_COLOR,
        flexDirection: 'row',
        height: 82
    },

    headerLeft: {
        flex: 1,
        height: '100%',
        marginHorizontal: 15,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },

    title: {
        fontSize: 22,
        fontFamily: 'Poppins_600SemiBold',
        color: MAIN_COLOR,
        textAlignVertical: 'center',
        transform: [{ translateY: 2 }]
    },

    headerRight: {
        flex: 1,
        height: '100%',
        marginHorizontal: 15,
        alignItems: 'flex-end',
        justifyContent: 'center'
    }
})

export default styles
