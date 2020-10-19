import { StyleSheet } from 'react-native'

import { WHITE_COLOR, MAIN_COLOR } from '../../../styles.global'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE_COLOR
    },

    saveButton: {
        paddingHorizontal: 5,
        height: '100%',
        justifyContent: 'center'
    },

    saveButtonText: {
        fontSize: 16,
        fontFamily: 'Poppins_600SemiBold',
        color: MAIN_COLOR,
        textAlignVertical: 'center',
        transform: [{ translateY: 2 }]
    },
})

export default styles
