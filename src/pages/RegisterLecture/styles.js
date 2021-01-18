import { StyleSheet } from 'react-native'

import {
    DIVISION_COLOR, DARK_GRAY_COLOR, MAIN_COLOR, WHITE_COLOR, RED_COLOR, BLACK_COLOR
} from '../../../styles.global'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: WHITE_COLOR
    },

    cancelButton: {
        paddingHorizontal: 5,
        height: '100%',
        justifyContent: 'center'
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

    scrollView: {
        width: '100%'
    },

    lectureContainer: {
        width: '100%',
        padding: 20,
        paddingBottom: 30,
        borderBottomWidth: 2,
        borderColor: DIVISION_COLOR
    },

    imagePickerContainer: {
        marginBottom: 20
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

    selectedImage: {
        width: 100,
        height: 100
    },

    nameText: {
        fontSize: 20,
        fontFamily: 'Poppins_600SemiBold',
        color: DARK_GRAY_COLOR,
        marginLeft: 10
    },

    nameInput: {
        borderWidth: 2,
        borderBottomWidth: 4,
        borderColor: DIVISION_COLOR,
        borderRadius: 12,
        paddingVertical: 8,
        paddingHorizontal: 20,
        marginBottom: 20,
        marginTop: 10
    },

    badgePickerText: {
        fontSize: 20,
        fontFamily: 'Poppins_600SemiBold',
        color: DARK_GRAY_COLOR,
        marginLeft: 10
    },

    badgePickerContainer: {
        marginTop: 10,
        marginBottom: 20,
        borderWidth: 2,
        borderBottomWidth: 4,
        borderColor: DIVISION_COLOR,
        borderRadius: 12,
        paddingLeft: 10
    },

    levelContainer: {
        width: '100%',
        padding: 20
    },

    levelContainerTitle: {
        fontSize: 20,
        fontFamily: 'Poppins_600SemiBold',
        color: DARK_GRAY_COLOR,
        marginLeft: 10
    },

    levelContent: {
        padding: 20,
        paddingBottom: 10,
        marginTop: 20,
        borderWidth: 2,
        borderBottomWidth: 4,
        borderColor: DIVISION_COLOR,
        borderRadius: 12
    },

    levelText: {
        fontSize: 18,
        fontFamily: 'Poppins_600SemiBold',
        color: DARK_GRAY_COLOR
    },

    levelButtonsContainer: {
        flexDirection: 'row'
    },

    editButton: {
        marginRight: 30,
        padding: 5
    },

    deleteButton: {
        padding: 5
    },

    editButtonText: {
        fontSize: 15,
        fontFamily: 'Poppins_600SemiBold',
        color: MAIN_COLOR
    },

    deleteButtonText: {
        fontSize: 15,
        fontFamily: 'Poppins_600SemiBold',
        color: RED_COLOR
    },

    addLevelButton: {
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
