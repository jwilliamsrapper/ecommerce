import firebase from '../index'



const signout = () =>{   
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        console.log("Success")
       
    }).catch(function(error) {
        console.log(error)
    // An error happened.
});
}


export default signout