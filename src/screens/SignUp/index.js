import React from 'react';
import { Text, View, TouchableOpacity, TextInput, ScrollView, Image, KeyboardAvoidingView, ActivityIndicator, Alert} from 'react-native';
import { signUp } from '../../config/firebase/Auth/signUpAuth'
import styles from './style'
import { checkAuth } from '../../config/firebase/Auth/signUpAuth'
import { saveUsers } from '../../config/firebase/Database/AuthDatabase'

export default class Login extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      login: true,
      create_account: false,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      bloodGroup: "please select",
      isReady: false,
      loading: false
    }
  }
  async componentDidMount() {
    this._isMounted = true;
    
  }



  handleSubmitSignUp = async () => {
    this.setState({loading: true})   
    const {email ,password, lastName} = this.state;
    const phone = '';
    signUp(email,password).then((res)=>{
      console.log('signup is==',res)
      if(res === 'false'){
        console.log("1st condition match")
        checkAuth().then((res)=>{
          console.log('check auth==',res)
          if(res !== false){
            console.log("third confitio")
            saveUsers(lastName, email, phone, res).then((res)=>{
              console.log("checking for third conditions")
              if(res === "sucess"){
                console.log("last contdition")
                alert("Your account is registered");
                this.setState({loading: false})
                this.props.navigation.goBack();
              }
            })
          }
        })
      }else{
        this.setState({loading: false})
        alert(res)
      }
    })
  }
  componentWillUnmount(){
    this._isMounted = false;
  }

  

  render() {
    const { email, password, firstName, lastName, loading } = this.state
    return (
      <KeyboardAvoidingView style={[styles.container]} behavior="padding" enabled>
        {!!loading && <View style={[styles.container, styles.horizontal]} >
          <ActivityIndicator size="large" color="white" />
          <Text>Login in...</Text>
        </View>}
        {!!!loading && <View>
          <Image source={require('../../../assets/mainLogo.png')} style={styles.image} />
        </View>}
        {!!!loading && <View style={styles.loginTextView}>
          <Text style={styles.loginText}>New Account</Text>
        </View>}
        {!!!loading && <View style={styles.textInputView}>
         
          <TextInput
            style={styles.textInput}
            underlineColorAndroid="transparent"
            placeholder="name"
            placeholderTextColor="grey"
            autoCapitalize="none"
            onChangeText={(text) => this.setState({ lastName: text })}
            value={this.state.lastName}
          />
          <TextInput
            style={styles.textInput}
            underlineColorAndroid="transparent"
            placeholder="Email"
            placeholderTextColor="grey"
            autoCapitalize="none"
            onChangeText={(text) => this.setState({ email: text })}
            value={this.state.email}
          />
          <TextInput
            style={styles.textInput}
            underlineColorAndroid="transparent"
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor="grey"
            autoCapitalize="none"
            onChangeText={(text) => this.setState({ password: text })}
            value={this.state.password}
          />
        
        </View>}

       {!!!loading && <TouchableOpacity style={styles.buttonView} 
       onPress={this.handleSubmitSignUp}>
          <Text style={styles.textColor} > Register </Text>
        </TouchableOpacity>}
        {!!!loading &&  <View style={styles.signUpView}>
          <Text style={styles.signText}>
            Not the first time?
          </Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} style={styles.signupButton}>
            <Text style={styles.textColor}>Login.</Text>
          </TouchableOpacity>
        </View>}

      </KeyboardAvoidingView>
    )

  }

}