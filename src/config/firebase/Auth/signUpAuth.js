import firebase from '../index'


const signUp = async(email,password,name) =>{
    try{

        return new Promise(async(res,rej)=>{
            var errorCode = false;
           await firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
                // Handle Errors here.
                 errorCode = error.code;
                var errorMessage = error.message;
                res(errorCode)
                // ...
            })
           if(!errorCode){
               res('false')
           }
        }) 
    }catch(err){
        console.log(err)
    }
}


const checkAuth = async()=>{
    return new Promise (async(res, rej)=>{
        
         await firebase.auth().onAuthStateChanged(function(user) {
             if (user) {
               // User is signed in.
               res(user.uid)
             } else {
               // No user is signed in.
               res(false)
             }
           });
     })
 }
 


export {
    signUp,
    checkAuth
} ;