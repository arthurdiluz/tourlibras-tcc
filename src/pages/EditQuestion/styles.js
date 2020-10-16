import { StyleSheet } from 'react-native'

import {
    WHITE_COLOR, DIVISION_COLOR, DARK_GRAY_COLOR, MAIN_COLOR, RED_COLOR, BLACK_COLOR
} from '../../../styles.global'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE_COLOR
    },

    okButton: {
        height: '100%',
        justifyContent: 'center',
        paddingHorizontal: 10
    },

    okButtonText: {
        fontSize: 20,
        fontFamily: 'Poppins_600SemiBold',
        color: MAIN_COLOR,
        textAlignVertical: 'center',
        transform: [{ translateY: 2 }]
    },

    optionsContainer: {
        flex: 1,
        padding: 20,
        paddingTop: 5
    },

    optionContent: {
        padding: 20,
        marginTop: 20,
        borderWidth: 2,
        borderBottomWidth: 4,
        borderColor: DIVISION_COLOR,
        borderRadius: 12
    },

    optionTitle: {
        fontSize: 18,
        fontFamily: 'Poppins_600SemiBold',
        color: DARK_GRAY_COLOR,
        marginLeft: 10,
        marginBottom: 10
    },

    imagePickerButton: {
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: DIVISION_COLOR,
        borderRadius: 50,
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },

    pickedImageButton: {
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: DIVISION_COLOR,
        borderRadius: 100,
        marginBottom: 10,
        overflow: "hidden"
    },

    textText: {
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
        color: DARK_GRAY_COLOR,
        marginLeft: 10
    },

    textInput: {
        borderWidth: 2,
        borderColor: DIVISION_COLOR,
        borderRadius: 12,
        paddingVertical: 8,
        paddingHorizontal: 20
    },

    isCorrectCheckboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15
    },

    isCorrectText: {
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
        color: DARK_GRAY_COLOR,
        marginLeft: 10,
        marginRight: 10
    },

    mediaText: {
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
        color: DARK_GRAY_COLOR,
        marginLeft: 10
    },

    deleteButton: {
        marginTop: 15,
        padding: 5
    },

    deleteButtonText: {
        fontSize: 15,
        fontFamily: 'Poppins_600SemiBold',
        color: RED_COLOR
    },

    addOptionButton: {
        position: 'absolute',
        height: 60,
        width: 60,
        borderRadius: 90,
        backgroundColor: MAIN_COLOR,
        right: 0,
        bottom: 0,
        marginBottom: 20,
        marginRight: 20,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowColor: BLACK_COLOR,
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6
    }
})

export default styles
