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



const saveBillingInfo = async (state, city, zipcode, address, uid) => {
    let docId;
    return new Promise(async (resolve, reject) => {
        await db.collection('users').where("uid", "==", uid).get().then(function (querySnapshot) {
            querySnapshot.forEach(async function (doc) {
                // doc.data() is never undefined for query doc snapshots
                docId = doc.id;
            });
        }).then(async () => {
            console.log(docId)
            if (docId) {

                await db.collection("users").doc(docId).update({
                    state,
                    city,
                    zipcode,
                    address,
                    info: true
                }).then(() => {
                    console.log("success")
                    resolve("sucess")
                }).catch((err) => {
                    console.log(err)
                })
            }
        })
    })
}


const saveTopBanner = async (image, uid) => {
    return new Promise(async (resolve, reject) => {
        await db.collection("top_banner").add({
            image,
            uid,
        }).then(() => {
            resolve("sucess");
        }).catch((err) => {
            console.log(err)
        })
    })
}


const saveDiscountOffer = async (image, uid, text) => {
    return new Promise(async (resolve, reject) => {
        await db.collection("discount_offer").add({
            image,
            uid,
            text
        }).then(() => {
            resolve("sucess");
        }).catch((err) => {
            console.log(err)
        })
    })
}

const saveInfoCategory = async (image, uid, text) => {
    return new Promise(async (resolve, reject) => {
        await db.collection("categories").add({
            image,
            uid,
            text
        }).then(() => {
            resolve("sucess");
        }).catch((err) => {
            console.log(err)
        })
    })
}

const saveProduct = async (allData, uid) => {
    return new Promise(async (resolve, reject) => {
        await db.collection("product").add({
            allData,
            uid
        }).then(() => {
            resolve("sucess");
        }).catch((err) => {
            console.log(err)
        })
    })
}

const saveOrderInfo = async (uid,order,price)=>{
    return new Promise(async (resolve, reject) => {
        await db.collection("orders").add({
            uid,
            order,
            price,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        }).then(() => {
            resolve("sucess");
        }).catch((err) => {
            console.log(err)
        })
    })
}

export {
    saveBillingInfo,
    saveTopBanner,
    saveDiscountOffer,
    saveInfoCategory,
    saveProduct,
    saveOrderInfo
}