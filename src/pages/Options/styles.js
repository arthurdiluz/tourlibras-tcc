import { StyleSheet } from 'react-native'

import { WHITE_COLOR, RED_COLOR } from '../../../styles.global'

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
