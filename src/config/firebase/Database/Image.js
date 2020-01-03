
import { YellowBox } from 'react-native';
import firebase from '../index'
import _ from 'lodash';
import Constants from 'expo-constants';
import uuid from 'uuid';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
    if (message.indexOf('Setting a timer') <= -1) {
        _console.warn(message);
    }
};
var db = firebase.firestore();

const uploadImage =async(uri, Imagename)=>{


    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
  
    const ref = firebase
      .storage()
      .ref()
      .child(`${Imagename}${uuid.v4()}`);
    const snapshot = await ref.put(blob);
    // We're done with the blob, close and release it
    blob.close();
  
    return await snapshot.ref.getDownloadURL();
  
}

  export default uploadImage