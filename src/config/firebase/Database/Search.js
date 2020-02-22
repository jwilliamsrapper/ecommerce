import firebase from '../index'
import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

var db = firebase.firestore();

const searcher = async (key) => {
    console.log("search func")
    let docId;
  let docData
  let abc = [];
  // console.log(uid)
  await db.collection("product").where("search", "array-contains", key).limit(10).get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      // doc.data() is never undefined for query doc snapshots
      docId = doc.id;
      console.log("data found")
      docData = doc.data();
      // console.log(doc.data())
      abc.push({ docId, docData });
    });
  });
  // console.log('abc===========>', abc)
  return abc
  } 

export default searcher;