import { StyleSheet } from 'react-native'

import { SECONDARY_DIVISION_COLOR, GREEN_COLOR, RED_COLOR, DIVISION_COLOR, WHITE_COLOR, DARK_GRAY_COLOR, LIGHT_GRAY_COLOR, MAIN_COLOR } from '../../../styles.global'

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
    
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    
    iconContainer: {
        backgroundColor: DARK_GRAY_COLOR,
        borderTopLeftRadius: 50,
        borderBottomRightRadius: 50,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },

    resultContainer: {
        marginTop: 40,
    },
    
    text: {
        fontSize: 30,
        fontFamily: 'Poppins_400Regular',
        color: LIGHT_GRAY_COLOR,
        textAlign: 'center',
        textAlignVertical: 'center'
    },

    result: {
        fontSize: 80,
        fontFamily: 'Poppins_700Bold',
        color: DARK_GRAY_COLOR,
        textAlign: 'center',
        textAlignVertical: 'center'
    },

    button: {
        backgroundColor: MAIN_COLOR,
        paddingVertical: 20,
        paddingHorizontal: 40,
        marginBottom: 30,
        borderRadius: 50
    },

    buttonText: {
        fontSize: 18,
        fontFamily: 'Poppins_600SemiBold',
        color: WHITE_COLOR
    }
})

export default styles