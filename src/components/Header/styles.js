import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

import { DIVISION_COLOR, MAIN_COLOR } from '../../../styles.global'

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight + 5,
        borderBottomWidth: 2,
        borderColor: DIVISION_COLOR,
        flexDirection: 'row',
        height: 82
    },

    headerLeft: {
        flex: 1,
        height: '100%',
        marginHorizontal: 15,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },

    title: {
        fontSize: 22,
        fontFamily: 'Poppins_600SemiBold',
        color: MAIN_COLOR,
        textAlignVertical: 'center',
        transform: [{ translateY: 2 }]
    },

    headerRight: {
        flex: 1,
        height: '100%',
        marginHorizontal: 15,
        alignItems: 'flex-end',
        justifyContent: 'center'
    }
})

export default styles
