import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

const RED_COLOR = '#FF0000'
export const MAIN_COLOR = '#00BFFF'
export const WHITE_COLOR = 'rgba(255, 255, 255, 1)'
export const BLACK_COLOR = 'rgba(0, 0, 0, 1)'
export const GREEN_COLOR = 'rgba(30, 252, 30, 1)'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: MAIN_COLOR,
        paddingTop: Constants.statusBarHeight + 20
    },

    returnButton: {
        paddingLeft: 20
    },

    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    titleContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginBottom: 20
    },

    title: {
        fontSize: 23,
        fontFamily: 'Poppins_700Bold',
        color: WHITE_COLOR,
        textAlign: 'center'
    },

    description: {
        fontSize: 17,
        fontFamily: 'Poppins_400Regular',
        color: WHITE_COLOR,
        marginBottom: 40
    },

    emailInput: {
        width: '75%',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 2,
        borderRadius: 25,
        borderColor: WHITE_COLOR,
        marginBottom: 7,
        fontSize: 17,
        fontFamily: 'Poppins_400Regular',
        color: WHITE_COLOR
    },

    button: {
        width: '75%',
        backgroundColor: WHITE_COLOR,
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 25
    },

    buttonText: {
        fontSize: 17,
        fontFamily: 'Poppins_400Regular',
        color: MAIN_COLOR
    },

    errorContainer: {
        width: '75%'
    },

    errorMessage: {
        fontSize: 13,
        color: RED_COLOR,
        textAlign: 'center',
        marginTop: 7,
        fontFamily: 'Poppins_400Regular'
    },
})

export default styles
