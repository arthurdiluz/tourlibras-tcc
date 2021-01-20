import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    leaderboardContainer: {
        flex: 1,
        borderWidth: 2,
        borderRadius: 12,
        margin: 20
    },

    filtersContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 2,
        padding: 7
    },

    filtersTitle: {
        fontFamily: 'Poppins_700Bold'
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
        fontSize: 14,
        textAlign: 'center'
    },

    anotherUserButtonDefault: {
        flexDirection: 'row',
        padding: 10,
        borderRadius: 50 
    },

    anotherUserButtonWithTopBorder: {
        borderTopWidth: 1
    },

    lastUserButton: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },

    authenticatedUserContainer: {
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
        fontSize: 14
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
        fontSize: 14
    },

    userFilterValueText: {
        alignSelf: 'center',
        fontFamily: 'Poppins_700Bold',
        fontSize: 14
    }
})

export default styles