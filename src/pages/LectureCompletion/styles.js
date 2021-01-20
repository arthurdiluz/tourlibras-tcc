import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1
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
        marginHorizontal: 2
    },

    incorrectAnswer: {
        height: 15,
        width: 15,
        borderRadius: 10,
        borderWidth: 2,
        marginHorizontal: 2
    },

    undefinedAnswer: {
        height: 15,
        width: 15,
        borderRadius: 10,
        borderWidth: 2,
        marginHorizontal: 2
    },
    
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    
    iconContainer: {
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
        textAlign: 'center',
        textAlignVertical: 'center'
    },

    result: {
        fontSize: 80,
        fontFamily: 'Poppins_700Bold',
        textAlign: 'center',
        textAlignVertical: 'center'
    },

    earnedInfoContainer: {
        alignItems: 'center',
        marginTop: 20
    },

    earnedInfoGroup: {
        flexDirection: 'row'
    },

    earnedExperience: {
        fontSize: 18,
        fontFamily: 'Poppins_600SemiBold',
        marginRight: 5
    },

    earnedMoney: {
        fontSize: 18,
        fontFamily: 'Poppins_600SemiBold',
        marginRight: 5
    },

    button: {
        paddingVertical: 20,
        paddingHorizontal: 40,
        marginBottom: 30,
        borderRadius: 50
    },

    buttonText: {
        fontSize: 18,
        fontFamily: 'Poppins_600SemiBold'
    }
})

export default styles