import { StyleSheet } from 'react-native'

const WHITE_COLOR = '#FFF'

const styles = StyleSheet.create({
    progressBarSvg: {
        transform: [{ rotateZ: '45deg' }]
    },

    avatarContainer: {
        height: '100%',
        width: '100%',
        transform: [{ rotateZ: '-45deg' }],
        justifyContent: 'center',
        alignItems: 'center'
    },

    levelContainer: {
        position: 'absolute',
        height: 25,
        width: 25,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },

    levelText: {
        fontSize: 18,
        fontFamily: 'Poppins_600SemiBold',
        transform: [{ translateY: 2 }]
    }
})

export default styles
