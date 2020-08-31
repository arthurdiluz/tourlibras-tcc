import { StyleSheet } from 'react-native'

const WHITE_COLOR = '#FFF'
const RED_COLOR = '#FF0000'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE_COLOR
    },

    optionsContainer: {
        padding: 20
    },

    signOutContainer: {
        borderRadius: 12,
        backgroundColor: RED_COLOR
    },

    signOutButton: {
        padding: 7,
        alignItems: 'center'
    },

    signOutText: {
        fontSize: 18,
        fontFamily: 'Poppins_600SemiBold',
        color: WHITE_COLOR
    }
})

export default styles
