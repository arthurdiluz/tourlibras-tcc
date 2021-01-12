import { StyleSheet } from 'react-native'

import { MAIN_COLOR, WHITE_COLOR, DIVISION_COLOR, DARK_GRAY_COLOR } from '../../../styles.global'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE_COLOR
    },

    contentContainer: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 20
    },

    editProfileContainer: {
        flex: 1,
        justifyContent: 'space-evenly'
    },

    imagePickerContainer: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        borderRadius: 100,
        borderWidth: 2,
        borderColor: DIVISION_COLOR
    },

    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 100
    },

    cameraIconContainer: {
        backgroundColor: MAIN_COLOR,
        height: 40,
        width: 40,
        position: 'absolute',
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 10,
        right: 10,
        borderRadius: 20
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

    saveButton: {
        width: '100%',
        backgroundColor: MAIN_COLOR,
        borderRadius: 12,
        padding: 7,
        bottom: 20,
        alignItems: 'center'
    },

    saveButtonText: {
        fontSize: 18,
        fontFamily: 'Poppins_600SemiBold',
        color: WHITE_COLOR
    }
})

export default styles
