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




const saveEditUserData = async (name, phone, docId, picId) => {
    return new Promise(async (resolve, reject) => {
        await db.collection("users").doc(docId).update({
            name,
            phone,
            picId
        }).then(() => {
            resolve("sucess");
        }).catch((err) => {
            console.log(err)
        })
    })
}

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

const saveProduct = async (allData, uid, category,title, search ) => {
    return new Promise(async (resolve, reject) => {
        await db.collection("product").add({
            allData,
            uid,
            category,
            title,
            search,
            ver: '2.4'
        }).then(() => {
            resolve("sucess");
        }).catch((err) => {
            console.log(err)
        })
    })
}

const saveOrderInfo = async (uid, billingDetails, productId, storeId, salePrice, price, shippingCost, selectedColor, selectedSize) => {
    return new Promise(async (resolve, reject) => {
        await db.collection("orders").add({
            buyer: uid,
            billingDetails,
            productId,
            storeId,
            salePrice,
            price,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            shippingCost,
            selectedColor,
            selectedSize
        }).then(() => {
            resolve("sucess");
        }).catch((err) => {
            console.log(err)
        })
    })
}

const changeStatus = async (id) => {
    if (id) {
        await db.collection("orders").doc(id).update({
            status: "shiped"
        }).then(() => {
            console.log("success")
        }).catch((err) => {
            console.log(err)
        })
    }
}


const savePushToken = async (token) => {
    let tokens;
    await db.collection("tokens").where("token", "==", token).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.data())
            tokens = doc.data().token;
        });
    });
    console.log("checking token ==",tokens)
    if(!tokens){
        console.log("sending data")
        return new Promise(async (resolve, reject) => {
            await db.collection("tokens").add({
                token
            }).then(() => {
                resolve("sucess");
            }).catch((err) => {
                console.log(err)
            })
        })
    }else{
        console.log("not sending data")
    }
}


export {
    saveBillingInfo,
    saveTopBanner,
    saveDiscountOffer,
    saveInfoCategory,
    saveProduct,
    saveOrderInfo,
    changeStatus,
    saveEditUserData,
    savePushToken
}