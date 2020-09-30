import { StyleSheet } from 'react-native'

import {
    WHITE_COLOR, DIVISION_COLOR, DARK_GRAY_COLOR, LIGHT_GRAY_COLOR
} from '../../../styles.global'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE_COLOR
    },

    profileInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        borderBottomWidth: 2,
        borderColor: DIVISION_COLOR
    },

    basicInfo: {
        flex: 1,
        justifyContent: 'center',
        marginRight: 10
    },

    name: {
        fontSize: 22,
        fontFamily: 'Poppins_700Bold',
        color: DARK_GRAY_COLOR,
    },

    date: {
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
        color: LIGHT_GRAY_COLOR,
    },

    profileImageContainer: {
        justifyContent: 'center'
    },

    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50
    },

    statisticsContainer: {
        padding: 20
    },

    statisticsText: {
        fontSize: 21,
        fontFamily: 'Poppins_700Bold',
        color: DARK_GRAY_COLOR
    },

    statisticsContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },

    experienceContainer: {
        flex: 1,
        marginRight: 10,
        borderWidth: 2,
        borderColor: DIVISION_COLOR,
        borderRadius: 12,
        flexDirection: 'row',
        padding: 7
    },

    moneyContainer: {
        flex: 1,
        marginLeft: 10,
        borderWidth: 2,
        borderColor: DIVISION_COLOR,
        borderRadius: 12,
        flexDirection: 'row',
        padding: 7
    },

    experienceIcon: {
        marginRight: 8
    },

    experienceInfo: {
        flex: 1
    },

    moneyInfo: {
        flex: 1
    },

    experienceTitle: {
        fontSize: 20,
        fontFamily: 'Poppins_700Bold',
        color: DARK_GRAY_COLOR
    },

    moneyTitle: {
        fontSize: 20,
        fontFamily: 'Poppins_700Bold',
        color: DARK_GRAY_COLOR
    },

    experienceDescription: {
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
        color: LIGHT_GRAY_COLOR
    },

    moneyDescription: {
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
        color: LIGHT_GRAY_COLOR,
    },

    badgesContainer: {
        paddingHorizontal: 20,
        marginBottom: 20
    },

    badgesText: {
        fontSize: 21,
        fontFamily: 'Poppins_700Bold',
        color: DARK_GRAY_COLOR
    },

    badgesContent: {
        marginTop: 10,
        borderWidth: 2,
        borderColor: DIVISION_COLOR,
        borderRadius: 12
    },

    badgeContainer: {
        padding: 7
    },

    badgeBottomDivision: {
        borderBottomWidth: 2,
        borderColor: DIVISION_COLOR
    },

    badgeTitle: {
        fontSize: 20,
        fontFamily: 'Poppins_700Bold',
        color: DARK_GRAY_COLOR
    },

    badgeDescription: {
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
        color: LIGHT_GRAY_COLOR
    }
})

export default styles
