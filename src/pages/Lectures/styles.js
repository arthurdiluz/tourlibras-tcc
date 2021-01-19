import { StyleSheet } from 'react-native'

import { WHITE_COLOR, DARK_GRAY_COLOR, LIGHT_GRAY_COLOR } from '../../../styles.global'

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    emptyLecturesText: {
        fontSize: 16,
        fontFamily: 'Poppins_700Bold',
        textAlign: 'center',
        padding: 15
    },

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
        textAlign: 'center',
        marginTop: 8
    }
})

export default styles
