import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1
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
        borderWidth: 2
    },

    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 100
    },

    cameraIconContainer: {
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
        marginLeft: 10
    },

    textInput: {
        borderWidth: 2,
        borderBottomWidth: 4,
        borderRadius: 12,
        paddingVertical: 8,
        paddingHorizontal: 20,
        marginBottom: 20,
        marginTop: 10
    },

    saveButton: {
        width: '100%',
        borderRadius: 12,
        padding: 7,
        bottom: 20,
        alignItems: 'center'
    },

    saveButtonText: {
        fontSize: 18,
        fontFamily: 'Poppins_600SemiBold'
    }
})

export default styles
