import { StyleSheet } from 'react-native'

import { WHITE_COLOR, DARK_GRAY_COLOR } from '../../../styles.global'

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

    lecturesContainer: {
        paddingVertical: 10,
        paddingHorizontal: 25
    },

    lectureView: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: 12
    },

    lectureText: {
        fontSize: 18,
        fontFamily: 'Poppins_600SemiBold',
        color: DARK_GRAY_COLOR,
        textAlign: 'center',
        marginTop: 8
    }
})

export default styles
