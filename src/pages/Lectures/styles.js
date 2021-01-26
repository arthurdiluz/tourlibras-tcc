import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    emptyLecturesText: {
        fontSize: 16,
        fontFamily: 'Poppins_700Bold',
        textAlign: 'center',
        padding: 15
    },

    lecturesContainer: {
        paddingVertical: 10,
        paddingHorizontal: 30
    },

    lectureView: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: 12,
        flexWrap: 'wrap'
    },

    lectureGroup: {
        width: 140,
        alignItems: 'center'
    },

    lectureText: {
        fontSize: 18,
        fontFamily: 'Poppins_600SemiBold',
        textAlign: 'center',
        marginTop: 8
    },

    modalContent: {
        alignItems: 'center',
        padding: 20,
        borderWidth: 2,
        borderRadius: 20
    },

    modalTitle: {
        fontSize: 20,
        fontFamily: 'Poppins_700Bold'
    },

    modalButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20
    },

    modalPrimaryButton: {
        padding: 10,
        width: 90,
        borderRadius: 15,
        marginRight: 20
    },

    modalPrimaryButtonText: {
        fontSize: 18,
        fontFamily: 'Poppins_600SemiBold',
        textAlign: 'center'
    },

    modalSecondaryButton: {
        padding: 10,
        width: 90,
        borderRadius: 15,
        marginLeft: 20
    },

    modalSecondaryButtonText: {
        fontSize: 18,
        fontFamily: 'Poppins_600SemiBold',
        textAlign: 'center'
    }
})

export default styles
