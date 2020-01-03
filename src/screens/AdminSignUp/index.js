import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, AsyncStorage, Alert,   ActivityIndicator, KeyboardAvoidingView } from 'react-native'
import Styles from './style'
import Input from '../../components/Input/Input';
import { inputIconCOlor } from '../../config/themeColors'
import { signUp,checkAuth } from '../../config/firebase/Auth/signUpAuth'
import { Header } from 'react-navigation-stack';
import {saveUsers} from '../../config/firebase/Database/AuthDatabase'

export default class Signup extends React.Component {
    constructor() {
        super();
        this.state = {
            content: '',
            confirmPassword: '12345678',
            password: '12345678',
            userName: 'abc',
            email: 'abcaa@gmail.com',
            phone: '123',
            isConfirmPassword: false,
            isPassword: false,
            isUserName: false,
            isEmail: false,
            isPhone: false,
            loading: false
        }
    }

    handlePress = async () => {
        const { password,
            confirmPassword,
            userName,
            email,
            phone,
            isConfirmPassword,
            isPassword,
            isUserName,
            isEmail,
            isPhone
        } = this.state;
        this.setState({
            isConfirmPassword: false,
            isPassword: false,
            isUserName: false,
            isEmail: false,
            isPhone: false
        })
        console.log(confirmPassword, password, userName, email, phone)
        if (userName === '') {
            this.setState({ isUserName: true })
        }
        if (confirmPassword === '') {
            this.setState({ isConfirmPassword: true })
        }
        if (password === '') {
            this.setState({ isPassword: true })
        }
        if (email === '') {
            this.setState({ isEmail: true })
        }
        if (phone === '') {
            this.setState({ isPhone: true })
        }

        if (isUserName === false && isConfirmPassword === false && isPassword === false && isEmail === false && isPhone === false) {
            if (confirmPassword !== password) {
                Alert.alert(
                    'Password does not Match!',
                    'please enter the valid password',
                    [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                        },
                    ],
                    { cancelable: false },
                );
            } else {
                const res = await signUp(email, password);
                console.log(res)
                if (res === "auth/invalid-email") {
                    this.setState({ isEmail: true })
                }
                if (res === "auth/weak-password") {
                    this.setState({ isPassword: true })
                }
                if (res === "auth/email-already-in-use") {
                    this.setState({ isEmail: true })
                }

              if(res === 'false'){
                  this.setState({loading: true})
                const authRes = await checkAuth();
                await AsyncStorage.setItem('ui', authRes);
                await saveUsers(userName,email,phone,authRes);
                console.log(authRes)
                this.props.navigation.navigate("Home");
              }

            }
        }
    }

    render() {
        const { isConfirmPassword,
            isPassword,
            isUserName,
            isEmail,
            isPhone,
            loading
        } = this.state;
        return (
            <KeyboardAvoidingView
                style={Styles.container}
                behavior="padding"
                enabled
                keyboardVerticalOffset={Header.HEIGHT + 25} // adjust the value here if you need more padding
            >
                 {!!loading && <ActivityIndicator size={50} style ={{marginTop: '45%'}} color="#0000ff" />}
                {!loading && <ScrollView >
                    <View style={Styles.top}>
                        <Text style={Styles.topText}>Let's Get Started!</Text>
                        <Text style={Styles.topBottomText}>Create an account to Mode</Text>
                    </View>

                    <View style={Styles.inputContainer}>
                        <Input
                            name="Name"
                            iconName="user"
                            iconcolor={inputIconCOlor}
                            onChangeText={(e) => { this.setState({ userName: e }) }}
                            error={isUserName ? "please input valid name" : null}
                            onFocus={() => { this.setState({ isUserName: false }) }}
                        />
                    </View>

                    <View style={Styles.inputContainer}>
                        <Input
                            name="Email"
                            iconName="envelope"
                            iconcolor={inputIconCOlor}
                            onChangeText={(e) => { this.setState({ email: e }) }}
                            error={isEmail ? "please input valid email" : null}
                            onFocus={() => { this.setState({ isEmail: false }) }}
                        />
                    </View>

                    <View style={Styles.inputContainer}>
                        <Input
                            name="Phone"
                            iconName="phone"
                            iconcolor={inputIconCOlor}
                            onChangeText={(e) => { this.setState({ phone: e }) }}
                            error={isPhone ? "please input valid phone" : null}
                            onFocus={() => { this.setState({ isPhone: false }) }}
                        />
                    </View>

                    <View style={Styles.inputContainer}>
                        <Input
                            name="Password"
                            iconName="key"
                            iconcolor={inputIconCOlor}
                            onChangeText={(e) => { this.setState({ password: e }) }}
                            error={isPassword ? "please input valid password" : null}
                            onFocus={() => { this.setState({ isPassword: false }) }}
                        />
                    </View>

                    <View style={Styles.inputContainer}>
                        <Input
                            name="Confirm Password"
                            iconName="key"
                            iconcolor={inputIconCOlor}
                            onChangeText={(e) => { this.setState({ confirmPassword: e }) }}
                            error={isConfirmPassword ? "please input valid password" : null}
                            onFocus={() => { this.setState({ isConfirmPassword: false }) }}
                        />
                    </View>
                    <TouchableOpacity style={Styles.SignupBtn} onPress={this.handlePress}>
                        <Text style={Styles.btnText}>Signup</Text>
                    </TouchableOpacity>

                    {/* <View style={{marginTop: 100}}/> */}
                </ScrollView>}
            </KeyboardAvoidingView>

        )
    }
}