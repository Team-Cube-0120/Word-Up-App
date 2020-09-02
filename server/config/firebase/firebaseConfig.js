import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyDZ9W_ylzTckrcHB2GHfG1solSse4BPEMo",
    authDomain: "wordup-50b05.firebaseapp.com",
    databaseURL: "https://wordup-50b05.firebaseio.com",
    projectId: "wordup-50b05",
    storageBucket: "wordup-50b05.appspot.com",
    messagingSenderId: "737324073545",
    appId: "1:737324073545:web:5acb282a795c82c9bab598",
    measurementId: "G-CSD3MSZNRH"
};


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };