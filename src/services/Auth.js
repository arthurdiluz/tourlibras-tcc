import * as Facebook from 'expo-facebook'

import { config } from '../config'
import { Firebase } from '../integrations/firebase'

export default class AuthService {
    static async loginWithFacebook() {
        await Facebook.initializeAsync(config.facebook.appId)
        const { type, token } = await Facebook.logInWithReadPermissionsAsync(
            config.facebook.appId,
            { permissions: ['public_profile'] },
        )

        if (type === 'success' && token) {
            // Build Firebase credential with the Facebook access token.
            const credential = Firebase.auth.FacebookAuthProvider.credential(token)

            // Sign in with credential from the Facebook user.
            await Firebase
                .auth()
                .signInWithCredential(credential)
        }
    }

    static async signOut() {
        return Firebase.auth().signOut()
    }

    /**
     * Register a subscription callback for changes of the currently authenticated user
     *
     * @param callback Called with the current authenticated user as first argument
     */
    static subscribeAuthChange(callback) {
        Firebase.auth().onAuthStateChanged(callback)
    }
}
