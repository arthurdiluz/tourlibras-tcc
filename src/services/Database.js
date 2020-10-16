import { Firebase } from "../integrations/firebase"

export default class DatabaseService {
    static async uploadImage(imageFile, databasePath, callback) {
        const storageRef = Firebase.storage().ref()

        try {
            const response = await fetch(imageFile);
            const blob = await response.blob();
    
            const uploadTask = storageRef.child(`${databasePath}`).put(blob);

            uploadTask.on('state_changed', (snapshot) => {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(databasePath + ' - Upload is ' + progress + '% done');
            }, (error) => {
                console.log("ERROR - ", error)
            }, () => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadUrl) => {
                    callback(downloadUrl)
                })
            });
        } catch (error) {
            console.log(error)
        }

    }

    static async updateDbField(path, field, value) {

        Firebase.database().ref(path).once('value', (snapshot) => {
            if(snapshot.exists()) {
                Firebase.database().ref().child(path).update({ [field]: value })
            }
        })
    }

    static async revertChanges(lectureId) {
        Firebase.database().ref().child(`lectures/${lectureId}`).remove()
        console.log('deletada')
        // Firebase storage image uploads cant be reverted because we dont have uploadTask references
    }

    static async insertLecture(lecture) {
        const lectureId = Firebase.database().ref().child('lectures').push(lecture).key
        return lectureId
    }

    /**
     * Register a subscription callback for changes of the currently authenticated user
     *
     * @param callback Called with the current authenticated user as first argument
     */
    // static subscribeAuthChange(callback) {
    //     Firebase.auth().onAuthStateChanged(callback)
    // }
}