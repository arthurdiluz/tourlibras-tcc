import { StyleSheet } from 'react-native'

import { WHITE_COLOR, DARK_GRAY_COLOR, DIVISION_COLOR, LIGHT_GRAY_COLOR, GREEN_COLOR, RED_COLOR, SECONDARY_DIVISION_COLOR } from '../../../styles.global'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE_COLOR
    },

    questionsAnswers: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },

    correctAnswer: {
        height: 15,
        width: 15,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: SECONDARY_DIVISION_COLOR,
        backgroundColor: GREEN_COLOR,
        marginHorizontal: 2
    },

    incorrectAnswer: {
        height: 15,
        width: 15,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: SECONDARY_DIVISION_COLOR,
        backgroundColor: RED_COLOR,
        marginHorizontal: 2
    },

    undefinedAnswer: {
        height: 15,
        width: 15,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: SECONDARY_DIVISION_COLOR,
        backgroundColor: DIVISION_COLOR,
        marginHorizontal: 2
    },

    questionsCounter: {
        fontSize: 15,
        fontFamily: 'Poppins_700Bold',
        color: LIGHT_GRAY_COLOR,
    },

    questionContainer: {
        alignItems: 'center',
        marginTop: 15,
        marginHorizontal: 25
    },

    questionMedia: {
        width: 200,
        height: 200,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: DARK_GRAY_COLOR,
        marginBottom: 10
    },

    questionDescription: {
        fontSize: 21,
        fontFamily: 'Poppins_700Bold',
        color: DARK_GRAY_COLOR,
        marginBottom: 12,
        textAlign: 'center'
    },

    optionsContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 12,
        marginBottom: 15,
        marginHorizontal: 25,
    },

    optionButton: {
        width: 145,
        minHeight: 173,
        padding: 15,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: DIVISION_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 4
    },

    optionMedia: {
        height: 80,
        width: 80,
        borderRadius: 10
    },

    optionDescription: {
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
        color: LIGHT_GRAY_COLOR,
        marginTop: 10,
        textAlign: 'center'
    }
})

export default styles