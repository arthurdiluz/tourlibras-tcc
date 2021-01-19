import { StyleSheet } from 'react-native'

import { DIVISION_COLOR, MAIN_COLOR, LIGHT_GRAY_COLOR, DARK_GRAY_COLOR } from '../../../styles.global'

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },

    centerButtons: {
        padding: 7,
        borderWidth: 2,
        borderLeftWidth: 1,
        borderRightWidth: 1
    },

    firstButton: {
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderLeftWidth: 2
    },

    lastButton: {
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        borderRightWidth: 2
    },

    selectedButton: {
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderTopWidth: 0,
        borderBottomWidth: 0,
    },

    defaultButtonText: {
        fontFamily: 'Poppins_400Regular'
    },

    selectedButtonText: {
        fontSize: 14,
        transform: [{translateY: 2}]
    }
})

export default styles