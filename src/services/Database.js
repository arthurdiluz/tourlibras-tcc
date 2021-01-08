import { Firebase } from "../integrations/firebase"

export default class Database {
    static timestamp = Firebase.database.ServerValue.TIMESTAMP

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

    static async createUserDetailsOnDb(user) {
        Firebase.database().ref().child(`userDetails/${user.uid}`).set({
            name: user.displayName || 'Usuário',
            avatar: user.photoURL,
            signedUpAt: new Date().toISOString(),
            experience: 0,
            money: 0
        })
    }

    static async storeUserProgressOnDb(user, postObject) {
        Firebase.database().ref().child(`userProgress/${user.uid}`).push(postObject)
    }

    static async storeExperienceProgressOnDb(user, lectureId, levelId) {
        const currentExperience = await Firebase.database().ref(`userDetails/${user.uid}/experience`).once('value', (snapshot) => (snapshot))
        const gainedExperience = await Firebase.database().ref(`lectures/${lectureId}/levels/${levelId}/experience`).once('value', (snapshot) => (snapshot))

        const newExperience = Number(currentExperience.val()) + Number(gainedExperience.val())

        Firebase.database().ref().child(`userDetails/${user.uid}/experience`).set(newExperience)
    }

    static async checkIfExistUserDetail(userId) {
        const response = await Firebase.database().ref(`userDetails/${userId}`).once('value', (snapshot) => (snapshot))

        if(response.exists()) {
            return true
        } else {
            return false
        }
    }

    static async getUserDetails(userId) {
        const userDetails = await Firebase.database().ref(`userDetails/${userId}`).once('value', (snapshot) => (snapshot))
        return userDetails.val()
    }

    static async getUserBadges(userId) {
        const userBadges = await Firebase.database().ref(`earnedBadges/${userId}`).once('value', (snapshot) => (snapshot))
        return userBadges.val()
    }

    static async getLecturesList() {
        const lecturesList = await Firebase.database().ref(`lectures`).once('value', (snapshot) => (snapshot))
        return lecturesList.val()
    }

    static async insertLecture(lecture) {
        const lectureId = Firebase.database().ref().child('lectures').push(lecture).key
        return lectureId
    }

    static async cancelInsertLecture(lectureId) {
        Firebase.database().ref().child(`lectures/${lectureId}`).remove()
        console.log('deletada')
        // Firebase storage image uploads cant be reverted because we dont have uploadTask references
    }
}