import firebase from '../index';
import * as Facebook from "expo-facebook"


const facebookSignin =async()=>{


const appId = "1439610392836406";
const permissions = ['public_profile', 'email'];  // Permissions required, consult Facebook docs
  

const {
  type,
  token,
} = await Facebook.logInWithReadPermissionsAsync(
  appId,
  {permissions}
);
return new Promise(async(res,rej)=>{
    switch (type) {
      case 'success': {
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);  // Set persistent auth state
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        const facebookProfileData = await firebase.auth().signInAndRetrieveDataWithCredential(credential);  // Sign in with Facebook credential
        res(facebookProfileData)
        // Do something with Facebook profile data
        // OR you have subscribed to auth state change, authStateChange handler will process the profile data
        
        return Promise.resolve({type: 'success'});
      }
      case 'cancel': {
        return Promise.reject({type: 'cancel'});
      }
    }
})
}

export default facebookSignin