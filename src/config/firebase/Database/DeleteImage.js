
import { YellowBox } from 'react-native';
import firebase from '../index'
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
    if (message.indexOf('Setting a timer') <= -1) {
        _console.warn(message);
    }
};

const deleteImage =async(uri, Imagename)=>{

    var imageToDelete = firebase.storage().refFromURL(uri)

    // Delete the file
    imageToDelete.delete().then(function() {
      // File deleted successfully
        console.log('succes image is deleted')
    }).catch(function(error) {
      // Uh-oh, an error occurred!
      console.log(error)
    });
    
    
  
}

  export default deleteImage