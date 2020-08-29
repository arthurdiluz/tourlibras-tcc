import { StyleSheet } from 'react-native'

const RED_COLOR = '#FF0000'
export const MAIN_COLOR = '#00BFFF'
export const SECONDARY_COLOR = 'rgba(51, 101, 138, 1)'
export const WHITE_COLOR = 'rgba(255, 255, 255, 1)'
export const FOOTER_HEIGHT = 115
export const ICON_SIZE = 150

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: MAIN_COLOR
    },

    header: {
        alignItems: 'center'
    },

    headerText: {
        marginBottom: 14,
        fontSize: 23,
        fontFamily: 'Poppins_400Regular',
        color: WHITE_COLOR,
        textAlign: 'center'
    },

    formContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between'
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

    passwordInput: {
        width: '75%',
        textAlignVertical: 'center',
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

    errorContainer: {
        width: '75%'
    },

    errorMessage: {
        fontSize: 13,
        color: RED_COLOR,
        textAlign: 'center',
        marginBottom: 7,
        fontFamily: 'Poppins_400Regular'
    },

    signInButton: {
        width: '75%',
        backgroundColor: WHITE_COLOR,
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 25
    },

    signInButtonText: {
        fontSize: 17,
        fontFamily: 'Poppins_400Regular',
        color: MAIN_COLOR
    },

    signUpButton: {
        width: '75%',
        backgroundColor: SECONDARY_COLOR,
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 25
    },

    signUpButtonText: {
        fontSize: 17,
        fontFamily: 'Poppins_400Regular',
        color: WHITE_COLOR
    },

    forgotPasswordButton: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginTop: 7
    },

    forgotPasswordText: {
        color: WHITE_COLOR,
        fontFamily: 'Poppins_400Regular',
    },

    footerContainer: {
        width: '100%',
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    footerText: {
        marginBottom: 14,
        fontSize: 18,
        fontFamily: 'Poppins_400Regular',
        color: WHITE_COLOR,
        textAlign: 'center'
    },

    facebookButton: {
        width: '75%',
        paddingVertical: 10,
        backgroundColor: SECONDARY_COLOR,
        borderRadius: 25,
        alignItems: 'center'
    },

    buttonText: {
        color: WHITE_COLOR,
        fontSize: 15,
        fontFamily: 'Poppins_400Regular',
    }
})

export default styles
