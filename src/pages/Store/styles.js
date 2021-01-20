import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    headerRightContainer: {
        flexDirection: 'row',
        height: '100%',
        alignItems: 'center'
    },

    headerRightText: {
        fontSize: 18,
        fontFamily: 'Poppins_600SemiBold',
        bottom: -2
    },

    scrollView: {
        alignItems: 'center',
        paddingVertical: 20
    },

    storeContainer: {
        alignItems: 'center',
        borderWidth: 2,
        maxWidth: '90%',
        borderRadius: 12
    },

    storeItemContainer: {
        flexDirection: 'row',
        marginHorizontal: 5,
        marginVertical: 5,
        alignItems: 'center',
        paddingVertical: 10
    },

    itemImage: {
        flex: 0.8,
        aspectRatio: 1,
        marginHorizontal: 10,
        borderRadius: 10
    },

    itemInfo: {
        flex: 2,
        marginHorizontal: 10
    },

    itemTitle: {
        fontSize: 20,
        fontFamily: 'Poppins_700Bold'
    },

    itemDescription: {
        fontSize: 14,
        fontFamily: 'Poppins_400Regular'
    },

    storeBuyButton: {
        marginTop: 5,
        padding: 10,
        paddingBottom: 6,
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 10
    },

    storeBuyButtonText: {
        fontSize: 20,
        fontFamily: 'Poppins_600SemiBold'
    },

    emptyStoreText: {
        padding: 10,
        fontFamily: 'Poppins_700Bold',
        fontSize: 18,
        textAlign: 'center'
    },

    purchasedText: {
        fontSize: 18,
        fontFamily: 'Poppins_700Bold'
    }
})

export default styles