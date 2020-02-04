
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


const getDataForTopBanner = async (uid) => {
  let docId;
  let docData
  let abc = [];
  await db.collection("top_banner").get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      // doc.data() is never undefined for query doc snapshots
      docId = doc.id;
      docData = doc.data();
      abc.push({ docId, docData });
    });
  });
  // console.log('abc===========>', abc)
  return abc

}


const getDataForDiscounts = async (uid) => {
  let docId;
  let docData
  let abc = [];
  console.log(uid)
  await db.collection("discount_offer").get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      // doc.data() is never undefined for query doc snapshots
      docId = doc.id;
      docData = doc.data();
      abc.push({ docId, docData });
    });
  });
  // console.log('abc===========>', abc)
  return abc

}

const getDataAll = async (coll) => {
  let docId;
  let docData
  let abc = [];
  await db.collection(coll).get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      // doc.data() is never undefined for query doc snapshots
      docId = doc.id;
      docData = doc.data();
      abc.push({ docId, docData });
    });
  });
  // console.log('abc===========>', abc)
  return abc

}



const getDataProducts = async (uid) => {
  let docId;
  let docData
  let abc = [];
  uid.toString()
  // console.log(uid)
  await db.collection("product").where("uid", "==", uid).get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      // doc.data() is never undefined for query doc snapshots
      docId = doc.id;
      docData = doc.data();
      abc.push({ docId, docData });
    });
  });
  // console.log('abc===========>', abc)
  return abc

}



const getDataForProductsAll = async (coll, cat) => {
  let docId;
  let docData
  let abc = [];
  // console.log(uid)
  await db.collection(coll).where("category", "==", cat).get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      // doc.data() is never undefined for query doc snapshots
      docId = doc.id;
      docData = doc.data();
      abc.push({ docId, docData });
    });
  });
  // console.log('abc===========>', abc)
  return abc

}

const checkBillInfo = async (uid) => {
  let docId;
  return new Promise(async (resolve, reject) => {
    await db.collection('users').where("uid", "==", uid).get().then(function (querySnapshot) {
      querySnapshot.forEach(async function (doc) {
        // doc.data() is never undefined for query doc snapshots
        docId = doc.id;
        // console.log(doc.data())
        if (doc.data().info) {
          resolve(true)
        } else {
          resolve(false)
        }
      });
    })

  });
}

const getBillInfo = async (uid) => {
  let docId;
  return new Promise(async (resolve, reject) => {
    await db.collection('users').where("uid", "==", uid).get().then(function (querySnapshot) {
      querySnapshot.forEach(async function (doc) {
        // doc.data() is never undefined for query doc snapshots
        docId = doc.id;
        // console.log(doc.data())
        resolve({ data: doc.data(), docId: doc.id });
      });
    })

  });
}

const getOrders = async (uid) => {
  console.log("getting orders")
  let docId;
  let docData
  let abc = [];
  return new Promise(async (resolve, reject) => {
    await db.collection('orders').where("buyer", "==", uid).get().then(function (querySnapshot) {
      querySnapshot.forEach(async function (doc) {
        // doc.data() is never undefined for query doc snapshots
        docId = doc.id;
        docData = doc.data();
        abc.push({ docId, docData });
      });
      resolve(abc)
    })

  });
}

const geteDataForAdminProfileField = async (uid) => {
  let docId;
  let docData
  let abc = [];
  console.log(uid)
  await db.collection("users").where("uid", "==", uid).get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      // doc.data() is never undefined for query doc snapshots
      docId = doc.id;
      docData = doc.data();
      abc.push({ docId, docData });
    });
  });
  // console.log('abc===========>', abc)
  return abc

}

const getOrdersAdmin = async (uid) => {
  console.log("getting orders")
  let docId;
  let docData
  let abc = [];
  return new Promise(async (resolve, reject) => {
    await db.collection('orders').where("storeId", "==", uid).get().then(function (querySnapshot) {
      querySnapshot.forEach(async function (doc) {
        // doc.data() is never undefined for query doc snapshots
        docId = doc.id;
        docData = doc.data();
        abc.push({ docId, docData });
      });
      resolve(abc)
    })

  });
}


const getDataForAdminProduct = async (d) => {
  let docId;
  let docData
  let abc = [];

  await db.collection("product").doc(d).get().then(function (doc) {
    if (doc.exists) {
      // console.log("Document data:", doc.data());
      abc.push({docData: doc.data(), docId: doc.id})
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }).catch(function (error) {
    console.log("Error getting document:", error);
  });
  return abc

}


const getShipingCost = async () => {
  return new Promise((resolbve, reject)=>{
    db.collection("config").doc("shipingCost").get().then(function(doc) {
      if (doc.exists) {
          console.log("Document data:", doc.data());
          resolbve(doc.data().anything)
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });
  })
} 
export {
  getDataForTopBanner,
  getDataForDiscounts,
  getDataAll,
  getDataProducts,
  getDataForProductsAll,
  checkBillInfo,
  getBillInfo,
  getOrders,
  geteDataForAdminProfileField,
  getOrdersAdmin,
  getDataForAdminProduct,
  getShipingCost
}