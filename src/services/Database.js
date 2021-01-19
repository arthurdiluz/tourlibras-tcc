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
    
    static async updateProfileName(user, newName) {
        Firebase.database().ref().child(`userDetails/${user.uid}/name`).set(newName)
    }

    static async updateProfilePicture(user, newPhotoURL) {
        Firebase.database().ref().child(`userDetails/${user.uid}/avatar`).set(newPhotoURL)
    }

    static async createUserDetailsOnDb(user) {
        Firebase.database().ref().child(`userDetails/${user.uid}`).set({
            name: user.displayName || 'Usuário',
            avatar: user.photoURL || '',
            signedUpAt: new Date().toISOString(),
            experience: 0,
            money: 0
        })
    }

    static async createUserProgressOnDb(user) {
        const lecturesSnapshot = await Firebase.database().ref(`lectures`).once('value', (snapshot) => (snapshot))

        const lecturesId = Object.keys(lecturesSnapshot.val())
        const userProgress = {}

        lecturesId.forEach((lectureId) => {
            userProgress[lectureId] = {
                unlocked: false,
                completed: false,
                currentLevel: 0
            }
        })

        userProgress[lecturesId[0]].unlocked = true

        Firebase.database().ref().child(`userProgress/${user.uid}`).set(userProgress)
    }

    static async createUserBadgesOnDb(user) {
        const badgesSnapshot = await Firebase.database().ref(`badges`).once('value', (snapshot) => (snapshot))

        const badgesId = Object.keys(badgesSnapshot.val())
        const userBadges = {}

        badgesId.forEach((badgeId) => {
            userBadges[badgeId] = {
                achieved: false,
                quantity: 0
            }
        })

        Firebase.database().ref().child(`userBadges/${user.uid}`).set(userBadges)
    }

    static async storeUserQuestionHistoryOnDb(user, postObject) {
        Firebase.database().ref().child(`userQuestionHistory/${user.uid}`).push(postObject)
    }

    static async storeExperienceProgressOnDb(user, lectureId, levelId) {
        const currentExperience = await Firebase.database().ref(`userDetails/${user.uid}/experience`).once('value', (snapshot) => (snapshot))
        const gainedExperience = await Firebase.database().ref(`lectures/${lectureId}/levels/${levelId}/experience`).once('value', (snapshot) => (snapshot))

        const newExperience = Number(currentExperience.val()) + Number(gainedExperience.val())

        Firebase.database().ref().child(`userDetails/${user.uid}/experience`).set(newExperience)
    }

    static async storeUserProgressOnDb(user, lectureId, levelId) {
        const lectures = await Firebase.database().ref(`lectures`).once('value', (snapshot) => (snapshot))
        const currentLectureLevelsCount = lectures.val()[lectureId]['levels'].length
        const lecturesCount = Object.keys(lectures.val()).length

        // Checks if its the last level
        if(currentLectureLevelsCount == levelId + 1) {
            await Firebase.database().ref(`userProgress/${user.uid}/${lectureId}/completed`).set(true)
            // unlocks next lecture
            const lecturesArray = Object.entries(lectures.val())
            const currentLectureIndex = lecturesArray.findIndex((element) => element[0] == lectureId)

            if(currentLectureIndex < lecturesCount - 1) {
                const nextLevelIndex = currentLectureIndex + 1
                const nextLevelId = lecturesArray[nextLevelIndex][0]

                await Firebase.database().ref(`userProgress/${user.uid}/${nextLevelId}/unlocked`).set(true)
            }
        } else {
            // unlocks next level
            const currentLevel = await Firebase.database().ref(`userProgress/${user.uid}/${lectureId}/currentLevel`).once('value', (snapshot) => (snapshot))
            const newLevel = currentLevel.val() + 1

            await Firebase.database().ref(`userProgress/${user.uid}/${lectureId}/currentLevel`).set(newLevel)
        }
    }

    static async unlocksLectureBadge(user, lectureId) {
        const badgeIdSnapshot = await Firebase.database().ref(`lectures/${lectureId}/badge`).once('value', (snapshot) => (snapshot))
        const badgeId = badgeIdSnapshot.val()

        this.updateDbField(`userBadges/${user.uid}/${badgeId}`, 'achieved', true)
    }

    static async checkIfItsTheLastLevel(lectureId, levelId) {
        const lectures = await Firebase.database().ref(`lectures`).once('value', (snapshot) => (snapshot))
        const currentLectureLevelsCount = lectures.val()[lectureId]['levels'].length

        if(currentLectureLevelsCount == levelId + 1) {
            return true
        } else {
            return false
        }
    }

    static async checkIfUserAlreadyExists(userId) {
        const response = await Firebase.database().ref(`userDetails/${userId}`).once('value', (snapshot) => (snapshot))

        if(response.exists()) {
            return true
        } else {
            return false
        }
    }

    static async getUserDetails(userId, callback) {
        Firebase.database().ref(`userDetails/${userId}`).on('value', (snapshot) => callback(snapshot.val()))
    }

    static async getUserDetailsOnce(userId) {
        const userDetails = await Firebase.database().ref(`userDetails/${userId}`).once('value', (snapshot) => (snapshot))
        return userDetails.val()
    }

    static async getUserQuestionHistory(userId) {
        const userQuestionHistory = await Firebase.database().ref(`userQuestionHistory/${userId}`).once('value', (snapshot) => (snapshot))
        return userQuestionHistory.val()
    }

    static async getUserProgress(userId, callback) {
        Firebase.database().ref(`userProgress/${userId}`).on('value', (snapshot) => {
            callback(snapshot.val())
        })
    }

    static async getUserBadges(userId, callback) {
        Firebase.database().ref(`userBadges/${userId}`).on('value', (snapshot) => callback(snapshot.val()))
    }

    static async getBadgesList() {
        const badgesList = await Firebase.database().ref(`badges`).once('value', (snapshot) => (snapshot))
        return badgesList.val()
    }

    static async getLecturesList() {
        const lecturesList = await Firebase.database().ref(`lectures`).once('value', (snapshot) => (snapshot))
        return lecturesList.val()
    }

    static async getLecture(lectureId) {
        const lectureSnapshot = await Firebase.database().ref(`lectures/${lectureId}`).once('value', (snapshot) => (snapshot))
        return lectureSnapshot.val()
    }

    static async getBadge(badgeId) {
        const badgeSnapshot = await Firebase.database().ref(`badges/${badgeId}`).once('value', (snapshot) => (snapshot))
        return badgeSnapshot.val()
    }

    static async getLeaderboard(filter) {
        const leaderboard = []
        await Firebase.database().ref(`userDetails`).orderByChild(filter).limitToLast(10).once('value', (snapshot) => {
            snapshot.forEach((child) => {
                const user = {
                    key: child.ref.key,
                    info: child.val()
                }
                leaderboard.push(user)
            })
        })
        
        leaderboard.sort((a, b) => {
            return b['info'][filter] - a['info'][filter]
        })

        return leaderboard
    }

    static async insertLecture(lecture) {
        const lectureId = Firebase.database().ref().child('lectures').push(lecture).key
        return lectureId
    }

    static async insertBadge(badge) {
        const badgeId = Firebase.database().ref().child('badges').push(badge).key
        return badgeId
    }

    static async editLecture(lectureId, newLecture) {
        Firebase.database().ref(`lectures/${lectureId}`).set(newLecture)
    }

    static async editBadge(badgeId, newBadge) {
        Firebase.database().ref(`badges/${badgeId}`).set(newBadge)
    }

    static async cancelInsertLecture(lectureId) {
        Firebase.database().ref().child(`lectures/${lectureId}`).remove()
        console.log('deletada')
        // Firebase storage image uploads cant be reverted because we dont have uploadTask references
    }

    static async cancelInsertBadge(badgeId) {
        Firebase.database().ref().child(`badges/${badgeId}`).remove()
        console.log('deletada')
        // Firebase storage image uploads cant be reverted because we dont have uploadTask references
    }
}