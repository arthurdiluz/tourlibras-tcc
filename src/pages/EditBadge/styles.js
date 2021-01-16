import { StyleSheet } from 'react-native'

import { WHITE_COLOR, MAIN_COLOR, DIVISION_COLOR, DARK_GRAY_COLOR } from '../../../styles.global'

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: WHITE_COLOR
    },
    
    saveButton: {
        paddingHorizontal: 5,
        height: '100%',
        justifyContent: 'center'
    },
        
    saveButtonText: {
        fontSize: 14,
        fontFamily: 'Poppins_600SemiBold',
        color: MAIN_COLOR,
        textAlignVertical: 'center',
        transform: [{ translateY: 2 }]
    },

    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: 20,
        width: '100%',
        overflow: 'hidden'
    },

    image: {
        height: 400,
        width: 400,
    },

    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 30,
    },

    textInputLabel: {
        fontSize: 20,
        fontFamily: 'Poppins_600SemiBold',
        color: DARK_GRAY_COLOR,
        marginLeft: 10
    },

    textInput: {
        borderWidth: 2,
        borderBottomWidth: 4,
        borderColor: DIVISION_COLOR,
        borderRadius: 12,
        paddingVertical: 8,
        paddingHorizontal: 20,
        marginBottom: 20,
        marginTop: 10
    },

    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15
    },

    checkboxInputLabel: {
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
        color: DARK_GRAY_COLOR,
        marginLeft: 10,
        marginRight: 10
    },

    imagePickerLabel: {
        fontSize: 20,
        fontFamily: 'Poppins_600SemiBold',
        color: DARK_GRAY_COLOR,
        textAlign: 'center',
        marginBottom: 10
    },

    touchableContainer: {
        width: 100,
        height: 100,
        alignSelf: 'center'
    },

    selectedImage: {
        width: 100,
        height: 100
    },

    pickedImageButton: {
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: DIVISION_COLOR,
        borderRadius: 100,
        marginBottom: 10,
        overflow: "hidden"
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
})

export default styles