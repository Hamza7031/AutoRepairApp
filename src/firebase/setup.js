import firebase from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth'

const firebaseConfig = {
    // Place all the firebase configurations here
    apiKey: "AIzaSyC9f2VNCSQ-WdMN2IL6mP1HlVyeC5VKXMw",
    authDomain: "fyp-01-134181-020.firebaseapp.com",
    projectId: "fyp-01-134181-020",
    storageBucket: "fyp-01-134181-020.appspot.com",
    messagingSenderId: "396791455065",
    appId: "1:396791455065:web:b289a704ff152948d68048"
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export default () => {
    return { firebase, auth }
}