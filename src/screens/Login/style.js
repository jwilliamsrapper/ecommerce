import { StyleSheet, } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
    },
    loginTextView:{
      marginBottom: '7%',
      marginRight: 1
    },
    loginText:{
      color: 'white',
      fontSize: 32,
      fontWeight: "900"
    },
    textInput:{
      padding: 4,
      borderBottomColor: 'grey',
      borderBottomWidth: 1,
      marginBottom: '10%',
      color: 'white'
    },
    textInputView:{
      width: '70%',
      marginBottom: '5%',
    },
    buttonView:{
      backgroundColor: 'gray',
      width: '50%',
      height: '8%',
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      // marginBottom: '20%'
    },
    textColor:{
      color: 'white',
    },
    signText:{
      color: 'grey',
    },
    signUpView:{
      flex: 0.2,
      marginTop: '3%',
      flexDirection: 'row'
    },
    signupButton:{
      paddingLeft: 4,
      fontSize: 17
    },

    homeButton: {
     // paddingTop: 10,
      fontSize: 17,
     // alignItems: 'center',
      justifyContent: 'center'

    },

    image:{
      width: 100,
      height: 100,
    },
    pickerContainer:{
      width: '100%',
      borderBottomColor: 'grey',
      color: 'white',
    },
    pickerLabel:{
      backgroundColor: '#454957',
    },
    nameCardContainer: {
      borderBottomWidth: 1,
      borderBottomColor: 'grey',
      width: '100%',
      height: 50,
      marginTop: 10,
  },
  profileImage: {
      resizeMode: 'contain',
      width: 40,
      height: 40,
      borderRadius: 80 / 2,
      overflow: "hidden",
      paddingBottom: 10,
  },
  imageContainer: {
      marginLeft: 10,
      flexDirection: 'row'
  },
  name:{
      marginTop: 3,
      marginLeft: 15,
  },
  Edit:{
      marginLeft: 15,
      color: 'grey'
  },
  listContainer:{
      marginTop: 10,
      height: 50,
  }

  });

  export default styles;