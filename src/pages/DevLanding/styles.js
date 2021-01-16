import { StyleSheet } from 'react-native'

import { DARK_GRAY_COLOR, MAIN_COLOR, RED_COLOR, WHITE_COLOR } from '../../../styles.global'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: MAIN_COLOR
    },

    pageTitle: {
        marginBottom: 50,
        fontSize: 23,
        fontFamily: 'Poppins_700Bold',
        color: WHITE_COLOR,
        textAlign: 'center'
    },

    registerLectureButton: {
        width: '100%',
        backgroundColor: WHITE_COLOR,
        borderRadius: 12,
        padding: 7,
        marginBottom: 10,
        alignItems: 'center'
    },

    registerLectureButtonText: {
        fontSize: 18,
        fontFamily: 'Poppins_600SemiBold',
        color: DARK_GRAY_COLOR
    },

    registerBadgeButton: {
        width: '100%',
        backgroundColor: WHITE_COLOR,
        borderRadius: 12,
        padding: 7,
        marginBottom: 10,
        alignItems: 'center'
    },

    registerBadgeButtonText: {
        fontSize: 18,
        fontFamily: 'Poppins_600SemiBold',
        color: DARK_GRAY_COLOR
    },

    logoutButton: {
        width: '100%',
        backgroundColor: RED_COLOR,
        borderRadius: 12,
        padding: 7,
        alignItems: 'center'
    },

    logoutButtonText: {
        fontSize: 18,
        fontFamily: 'Poppins_600SemiBold',
        color: WHITE_COLOR
    }
})

export default styles