import { StyleSheet, } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      // justifyContent: 'center',
      marginTop: '5%'
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
      color: 'grey'
    },
    textInputView:{
      width: '70%',
      marginBottom: '5%',
    },
    buttonView:{
      backgroundColor: 'black',
      width: '50%',
      height: '8%',
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      // marginBottom: '20%'
    },
    textColor:{
      color: 'white',
      textAlignVertical: 'center',
      textAlign: 'center',
      alignSelf: 'center'
    },
    signText:{
      color: 'grey',
      height: 20
    },
    signUpView:{
      flex: 0.2,
      marginTop: '3%',
      flexDirection: 'row'
    },
    signupButton:{
      paddingLeft: 4,
      fontSize: 17,
      backgroundColor: 'black',
      width: '40%',
      alignSelf: 'center',
      height: 40,
      alignItems: 'center',
      alignContent: 'center',
      textAlign: 'center',
      marginTop: 30,
      textAlignVertical: 'center',
      borderRadius: 25,
      justifyContent: 'center'
    },
    image:{
      width: 100,
      height: 100
    },
    pickerContainer:{
      width: '100%',
      borderBottomColor: 'grey',
      color: 'white',
    },
    textHeader: {
      color: 'grey',
      fontSize: 11,
      marginLeft: 5
    }

  });

  export default styles;