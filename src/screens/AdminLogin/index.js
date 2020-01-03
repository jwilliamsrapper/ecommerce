import React from 'react';
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    Alert,
    KeyboardAvoidingView,
    Image,
    AsyncStorage,
    ActivityIndicator
} from 'react-native'
import Styles from './style'
import Input from '../../components/Input/Input';
import { inputIconCOlor } from '../../config/themeColors'
import Welcome from '../../../assets/images/welcome.jpg'
import Icon from 'react-native-vector-icons/FontAwesome';
import { signInAuth } from '../../config/firebase/Auth/signinAuth'
import { checkAuth } from '../../config/firebase/Auth/signUpAuth'

export default class AdminLogin extends React.Component {
    constructor() {
        super();
        this.state = {
            content: '',
            password: '',
            email: '',
            isPassword: false,
            isEmail: false,
            loading: false
        }
    }
    async componentDidMount() {
        this.setState({loading: true})
        const authRes = await checkAuth();
        console.log(authRes)
        if(authRes){
            AsyncStorage.setItem("uid", authRes)
            this.props.navigation.navigate("Home");
        }else{
            this.setState({loading: false})
        }
    }
    handlePress = async () => {
        const { password,
            email,
            isPassword,
            isEmail,
        } = this.state;

        console.log(password, email)

        if (password === '') {
            this.setState({ isPassword: true })
        }
        if (email === '') {
            this.setState({ isEmail: true })
        }
        if (isPassword === false && isEmail === false) {
            const res = await signInAuth(email, password);

            if (res === "auth/invalid-email") {
                this.setState({ isEmail: true })
            }
            if (res === "auth/wrong-password") {
                this.setState({ isPassword: true })
            }
            if(res === "auth/user-not-found"){
                alert("no user found!")
            }
            console.log(res)
            if (res === true) {
                this.setState({ loading: true })
                const authRes = await checkAuth();
                await AsyncStorage.setItem('uid', authRes);
                this.props.navigation.navigate("Home");
            }
        }
    }

    handleFacebook = async () => {
        const res = await facebookSignin();
        console.log(res);
    }

    render() {
        const {
            isPassword,
            isEmail,
            loading
        } = this.state;
        return (
            <KeyboardAvoidingView behavior="padding" style={Styles.container}>
                {!!loading && <ActivityIndicator size={56} style={{ marginTop: '65%' }} color="#0000ff" />}
                <ScrollView >
                    {!loading && <SafeAreaView>
                        <View style={Styles.top}>
                            <Image
                                source={Welcome}
                                style={{ width: '50%', height: 200 }}
                            />
                            <Text style={Styles.topText}>Welcome Back</Text>
                            <Text style={Styles.topBottomText}>Signin with existing account</Text>
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
                                name="Password"
                                iconName="key"
                                iconcolor={inputIconCOlor}
                                onChangeText={(e) => { this.setState({ password: e }) }}
                                error={isPassword ? "please input valid password" : null}
                                onFocus={() => { this.setState({ isPassword: false }) }}
                            />
                        </View>


                        <TouchableOpacity style={Styles.SignupBtn} onPress={this.handlePress}>
                            <Text style={Styles.btnText}>Login</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={Styles.bottom} onPress={() => { this.props.navigation.navigate("SignUp") }}>
                            <Text style={Styles.newText}>Create a new account</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity style={Styles.facebookBtn} onPress={this.handleFacebook}>
                            <Icon
                                name='facebook-square'
                                size={24}
                                color='white'
                                style={Styles.btnTextFb}
                            />
                            <Text style={Styles.btnTextFb}>Facebook Login</Text>
                        </TouchableOpacity> */}

                        <View style={{ marginTop: 50 }} />

                    </SafeAreaView>}
                </ScrollView>
            </KeyboardAvoidingView>

        )
    }
}