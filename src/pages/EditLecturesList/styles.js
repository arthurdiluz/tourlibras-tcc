import { StyleSheet } from 'react-native'

import { WHITE_COLOR, LIGHT_GRAY_COLOR, DARK_GRAY_COLOR } from '../../../styles.global'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE_COLOR
    },

    emptyLecturesText: {
        fontSize: 16,
        fontFamily: 'Poppins_700Bold',
        color: LIGHT_GRAY_COLOR,
        textAlign: 'center',
        padding: 15
    },
    
    lecturesContainer: {
        paddingVertical: 10,
        paddingHorizontal: 30
    },

    lectureView: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: 12,
        flexWrap: 'wrap'
    },

    lectureGroup: {
        width: 140,
        alignItems: 'center'
    },

    lectureText: {
        fontSize: 18,
        fontFamily: 'Poppins_600SemiBold',
        color: DARK_GRAY_COLOR,
        textAlign: 'center',
        marginTop: 8,
        marginBottom: 15
    }
})

export default styles