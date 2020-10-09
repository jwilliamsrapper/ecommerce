import React from 'react';
import { Text, View, TouchableOpacity, TextInput, ScrollView, Image, KeyboardAvoidingView, ActivityIndicator, Alert } from 'react-native';
import { signUp } from '../../config/firebase/Auth/signUpAuth'
import styles from './style'
import { checkAuth } from '../../config/firebase/Auth/signUpAuth'
import { saveUsers } from '../../config/firebase/Database/AuthDatabase'
import { CheckBox } from 'react-native-elements'

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
      loading: false,
      checked: false
    }
  }
  async componentDidMount() {
    this._isMounted = true;

  }



  handleSubmitSignUp = async () => {
    this.setState({ loading: true })
    const { email, password, lastName, checked } = this.state;
    const phone = '';
    signUp(email, password).then((res) => {
      console.log('signup is==', res)
      if (res === 'false') {
        console.log("1st condition match")
        checkAuth().then((res) => {
          console.log('check auth==', res)
          if (res !== false) {
            console.log("third condition")
            saveUsers(lastName, email, phone, res, checked).then((res) => {
              console.log("checking for third conditions")
              if (res === "sucess") {
                console.log("last contdition")
                Alert.alert('Congrats','You have signed up successfully');
                this.setState({ loading: false })
                this.props.navigation.navigate("Load");
              }
            })
          }
        })
      } else {
        this.setState({ loading: false })

        Alert.alert("Couldn't Sign up", res);

        
      }
    })
  }
  componentWillUnmount() {
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
          <Text style={styles.qText}>Are you a vendor?</Text>
          <CheckBox
            center
            title='Yes'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked={this.state.checked}
            onPress={() => this.setState({checked: !this.state.checked})}
            containerStyle={{backgroundColor: 'black'}}
          />
        </View>}

        {!!!loading && <TouchableOpacity style={styles.buttonView}
          onPress={this.handleSubmitSignUp}>
          <Text style={styles.textColor} > Sign Up </Text>
        </TouchableOpacity>}
        {!!!loading && <View style={styles.signUpView}>
          <Text style={styles.signText}>
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} style={styles.signupButton}>
            <Text style={styles.textColor}>Login. </Text>
          </TouchableOpacity>
          <Text style={styles.signText}> No?</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')} style={styles.signupButton}>
            <Text style={styles.textColor}>Go Home</Text>
          </TouchableOpacity>
        </View>}

      </KeyboardAvoidingView>
    )

  }

}