import firebase from 'firebase'
import 'firebase/firestore'


  var firebaseConfig = {
    apiKey: "AIzaSyB5LMX35h9k47VosBKpeqSZ0w_4ad3FKoE",
    authDomain: "ecoommerce-ecb3d.firebaseapp.com",
    databaseURL: "https://ecoommerce-ecb3d.firebaseio.com",
    projectId: "ecoommerce-ecb3d",
    storageBucket: "ecoommerce-ecb3d.appspot.com",
    messagingSenderId: "849046057279",
    appId: "1:849046057279:web:b070522e91fc4b024c238a",
    measurementId: "G-X01M2NCTGL"
  };
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

  export default firebase;