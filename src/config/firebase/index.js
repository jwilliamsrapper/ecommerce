import firebase from 'firebase'
import 'firebase/firestore'


  var firebaseConfig = {
    apiKey: "AIzaSyCQImoY0FVuWaRnhj4NxwkwGjqVoxG0IJc",
    authDomain: "modeapp-72a71.firebaseapp.com",
    databaseURL: "https://modeapp-72a71.firebaseio.com",
    projectId: "modeapp-72a71",
    storageBucket: "modeapp-72a71.appspot.com",
    messagingSenderId: "52068144236",
    appId: "1:52068144236:web:518709828948a83d1c3449",
    measurementId: "G-T4GYXX9989"

  };

  // this code is remove for the only pupose of ipad
  // Initialize Firebase
  // if (!firebase.apps.length) {
  //   firebase.initializeApp(firebaseConfig);
  // }
  // code ends here
  
  firebase.initializeApp(firebaseConfig);

  export default firebase;