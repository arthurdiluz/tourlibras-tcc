import { StyleSheet } from 'react-native'

const mainColor = '#00BFFF'
const secondaryColor = '#33658A'
const white = '#FFF'

export const footerHeight = 115

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: mainColor
    },

    header: {
        alignItems: 'center'
    },

    headerText: {
        marginBottom: 14,
        fontSize: 23,
        fontFamily: 'Poppins_400Regular',
        color: white
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
        borderColor: white,
        marginBottom: 7,
        fontSize: 17,
        fontFamily: 'Poppins_400Regular',
        color: white
    },

    passwordInput: {
        width: '75%',
        textAlignVertical: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 2,
        borderRadius: 25,
        borderColor: white,
        marginBottom: 7,
        fontSize: 17,
        fontFamily: 'Poppins_400Regular',
        color: white
    },

    mainButton: {
        width: '75%',
        backgroundColor: white,
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 25
    },

    mainButtonText: {
        fontSize: 17,
        fontFamily: 'Poppins_400Regular',
        color: mainColor
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
        color: white
    },

    secondaryButton: {
        width: '75%',
        paddingVertical: 10,
        backgroundColor: secondaryColor,
        borderRadius: 25,
        alignItems: 'center'
    },

    buttonText: {
        color: white,
        fontSize: 15,
        fontFamily: 'Poppins_400Regular',
    }
})

export default styles
