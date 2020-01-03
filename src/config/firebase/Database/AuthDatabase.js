import firebase from '../index';
import React from 'react';
import {AsyncStorage} from 'react-native';
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



const saveUsers = async(name, email,phone, uid)=>{
    return new Promise(async(resolve,reject)=>{
        await db.collection("users").add({
            name, 
            email,
            phone,
            uid
        }).then(()=>{
            resolve("sucess");
        }).catch((err)=>{
            console.log(err)
        })
    })
}


const getProfileData = async(uid)=>{
    let docId;
    let docData
    let abc = [];
    return new Promise(async(res)=>{
        await db.collection("users").where("uid", "==", uid).get().then((snap)=>{
            snap.forEach((data)=>{
                docId = data.id;
                docData = data.data();
                abc.push({ docId, docData });
            })
            res(abc);
        })
    })
}

export {
    saveUsers,
    getProfileData
}