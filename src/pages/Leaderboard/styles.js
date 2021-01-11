import { StyleSheet } from 'react-native'

import { WHITE_COLOR, DIVISION_COLOR, LIGHT_GRAY_COLOR, DARK_GRAY_COLOR, MAIN_COLOR } from '../../../styles.global'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE_COLOR
    },

    leaderboardContainer: {
        flex: 1,
        borderWidth: 2,
        borderColor: DIVISION_COLOR,
        borderRadius: 12,
        margin: 20
    },

    filtersContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderColor: DIVISION_COLOR,
        padding: 7
    },

    filtersTitle: {
        fontFamily: 'Poppins_700Bold',
        color: LIGHT_GRAY_COLOR
    },

    filterButtonsContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 5
    },

    emptyLeaderboardText: {
        padding: 10,
        fontFamily: 'Poppins_400Regular',
        color: LIGHT_GRAY_COLOR,
        fontSize: 14,
        textAlign: 'center'
    },

    anotherUserButtonDefault: {
        flexDirection: 'row',
        padding: 10,
        borderRadius: 50 
    },

    anotherUserButtonWithTopBorder: {
        borderTopWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.05)'
    },

    authenticatedUserContainer: {
        backgroundColor: MAIN_COLOR,
        borderRadius: 0,
        borderTopWidth: 0
    },

    userPositionContainer: {
        justifyContent: 'center',
        minWidth: 15,
        marginRight: 15,
        marginLeft: 5
    },

    userPositionText: {
        alignSelf: 'center',
        fontFamily: 'Poppins_700Bold',
        color: DARK_GRAY_COLOR,
        fontSize: 14
    },
    
    authenticatedUserPositionText: {
        color: WHITE_COLOR
    },

    userInfoContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between'
    },

    userInfoGroup: {
        flexDirection: 'row'
    },

    userAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25
    },

    userNameText: {
        alignSelf: 'center',
        marginLeft: 15,
        fontFamily: 'Poppins_400Regular',
        color: LIGHT_GRAY_COLOR,
        fontSize: 14
    },

    authenticatedUserNameText: {
        color: WHITE_COLOR
    },

    userFilterValueText: {
        alignSelf: 'center',
        fontFamily: 'Poppins_700Bold',
        color: DARK_GRAY_COLOR,
        fontSize: 14
    },

    authenticatedUserFilterValueText: {
        color: WHITE_COLOR
    }
})

export default styles