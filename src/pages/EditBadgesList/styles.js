import { StyleSheet } from 'react-native'

import { WHITE_COLOR, LIGHT_GRAY_COLOR, DARK_GRAY_COLOR } from '../../../styles.global'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE_COLOR
    },

    emptyBadgesText: {
        fontSize: 16,
        fontFamily: 'Poppins_700Bold',
        color: LIGHT_GRAY_COLOR,
        textAlign: 'center',
        padding: 15
    },
    
    badgesContainer: {
        paddingVertical: 10,
        paddingHorizontal: 25
    },

    badgeView: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: 12,
        flexWrap: "wrap"
    },

    badgeInfo: {
        width: 99,
        margin: 10,
        marginBottom: 10
    },

    badgeButtonContainer: {
        borderRadius: 15,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: DARK_GRAY_COLOR,
        borderBottomWidth: 4,
        borderRightWidth: 4
    },

    badgeButton: {
        width: 99,
        height: 155,
        backgroundColor: 'rgba(0, 0, 0, 0.2)'
    },

    badgeButtonImage: {
        width: '100%',
        height: '100%'
    },

    badgeText: {
        fontSize: 18,
        fontFamily: 'Poppins_600SemiBold',
        color: DARK_GRAY_COLOR,
        textAlign: 'center',
        marginTop: 8
    },
    
})

export default styles