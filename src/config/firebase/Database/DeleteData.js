import firebase from '../index';
import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
    if (message.indexOf('Setting a timer') <= -1) {
        _console.warn(message);
    }
};

const db = firebase.firestore();



const deleteData = async(coll, docId)=>{
    return new Promise(async(resolve,reject)=>{
        await db.collection(coll).doc(docId).delete().then(function() {
            console.log("Document successfully deleted!");
            resolve("sucsses")
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    })
}





 export {
    deleteData
 }