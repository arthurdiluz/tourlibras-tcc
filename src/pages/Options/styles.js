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

    signOutButton: {
        padding: 7,
        borderRadius: 12,
        alignItems: 'center',
        backgroundColor: RED_COLOR
    },

    signOutText: {
        fontSize: 18,
        fontFamily: 'Poppins_600SemiBold',
        color: WHITE_COLOR
    }
})

export default styles
