import { StyleSheet } from 'react-native'

const WHITE_COLOR = '#FFF'
const LIGHT_GRAY_COLOR = '#828282'
const DARK_GRAY_COLOR = '#444442'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE_COLOR
    },

    // headerLeftContainer: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     width: '100%',
    //     justifyContent: 'flex-start'
    // },

    // headerRightContainer: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     width: '100%',
    //     justifyContent: 'flex-end'
    // },

    // headerIconsText: {
    //     fontSize: 20,
    //     fontFamily: 'Poppins_600SemiBold',
    //     color: '#00D200',
    //     transform: [{ translateY: 2 }]
    // },

    // headerLeftIconText: {
    //     marginLeft: 8
    // }

    lessonsContainer: {
        paddingVertical: 10
    },

    lessonView: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: 12
    },

    lessonText: {
        fontSize: 18,
        fontFamily: 'Poppins_600SemiBold',
        color: DARK_GRAY_COLOR,
        textAlign: 'center',
        marginTop: 8
    }
})

export default styles
