import * as firebase from 'firebase'

import { config } from '../config'

firebase.initializeApp(config.firebase)

export const Firebase = firebase
export const FirebaseDatabase = firebase.database()
export const FirebaseStorage = firebase.storage()
