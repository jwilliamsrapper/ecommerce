import React from "react";
import {
    View,
    TouchableOpacity,
    ActivityIndicator,
    TextInput,
    KeyboardAvoidingView,
    Text,
    Image,
    AsyncStorage
} from "react-native";
import styles from './style'
import { Header } from 'react-navigation-stack';
import { signInAuth } from '../../config/firebase/Auth/signinAuth'
import { checkAuth } from '../../config/firebase/Auth/signUpAuth'
import { NavigationEvents } from "react-navigation";
import AccountList from '../../components/AccountList/AccountList'
import { getProfileData } from '../../config/firebase/Database/AuthDatabase'
import  signout  from '../../config/firebase/Auth/SignOut'
import { ScrollView } from "react-native-gesture-handler";

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            name: 'arbaz',
            loading: false,
            email: '',
            password: '',
            isLogin: false,
            image: false,
            userName: '',
            profile: [],
        }
        this.mounted = true;
    }

    async componentDidMount() {
        this.setState({ loading: true })
        checkAuth().then(async (res) => {
            console.log(res)
            if (res) {
                this.setState({ isLogin: true })
                await AsyncStorage.setItem('uid', res);
                getProfileData(res).then((res) => {
                    console.log(res)
                    this.setState({ profile: res })
                })
            } else {
                this.setState({ loading: false })
            }
        })
    }


    async componentWillUnmount() {

    }
    handleSubmitLogin = async () => {
        this.setState({loading: true})
        const { email, password } = this.state;
        signInAuth(email, password).then((res) => {
            console.log(res)
            if (res === true) {
                this.setState({
                    loading: true,
                    isLoign: true
                })
                this.componentDidMount();
            } else {
                alert(res)
                this.setState({loading: false})
            }
        })
    }
    componentWillUnmount() {
        this.mounted = false;
    }

    handleLogOutPress = async () => {
        console.log("logout press")
        this.setState({ loading: true, isLogin: false })
        await AsyncStorage.removeItem("uid");
        await signout();
        this.componentDidMount();
    }

    render() {

        const { loading, isLogin, image, userName, profile } = this.state
        if (!isLogin) {
            return (
                <KeyboardAvoidingView
                    keyboardVerticalOffset={Header.HEIGHT + 25} // adjust the value here if you need
                    behavior="padding"
                    style={[styles.container,
                    {
                        backgroundColor: !isLogin ? 'black' : null,
                        alignItems: isLogin ? 'flex-start' : 'center',

                    }]}>
                    {!!loading && !isLogin && <View style={[styles.container, styles.horizontal]}>
                        <ActivityIndicator size="large" color="#0000ff" />
                        <Text>Login in...</Text>
                    </View>}
                    <NavigationEvents
                        onWillFocus={() => {
                            this.setState({ content: [] })
                            this.componentDidMount()
                        }}
                    />
                    {!!!loading && !isLogin && <View>
                        <Image source={require('../../../assets/mainLogo.png')} style={styles.image} />
                    </View>}
                    {!!!loading && !isLogin && <View style={styles.loginTextView}>
                        <Text style={styles.loginText}>Login</Text>
                    </View>}
                    {!!!loading && <View style={styles.textInputView}>
                        <TextInput
                            style={styles.textInput}
                            underlineColorAndroid="transparent"
                            placeholder="Email"
                            placeholderTextColor="grey"
                            autoCapitalize="none"
                            onChangeText={(text) => this.setState({ email: text })}
                        />
                        <TextInput
                            style={styles.textInput}
                            secureTextEntry={true}
                            underlineColorAndroid="transparent"
                            placeholder="Password"
                            placeholderTextColor="grey"
                            autoCapitalize="none"
                            onChangeText={(text) => this.setState({ password: text })}
                        />
                    </View>}

                    {!!!loading && <TouchableOpacity style={styles.buttonView} onPress={this.handleSubmitLogin}>
                        <Text style={styles.textColor} > Log in </Text>
                    </TouchableOpacity>}
                    {!!!loading && <View style={styles.signUpView}>
                        <Text style={styles.signText}>
                            First time here?
          </Text>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('SignUp')}
                            style={styles.signupButton}>
                            <Text style={styles.textColor}>Sign up.</Text>
                        </TouchableOpacity>
                    </View>}


                </KeyboardAvoidingView>
            );
        } else {
            return (
                <ScrollView>

                    {!!isLogin && <View style={{ backgroundColor: 'white', flex: 1, width: '100%' }}>

                        <View style={styles.nameCardContainer}>
                            <TouchableOpacity
                                style={styles.imageContainer}
                                onPress={() => { this.props.navigation.navigate("EditProfile") }}
                            >
                                <Image
                                    source={image ? { uri: image } : require('../../../assets/profile.png')}
                                    resizeMode="contain"
                                    style={styles.profileImage}
                                />
                                <View >
                                    <Text style={styles.name}>{profile.length && profile[0].docData.name}</Text>
                                    {/* <Text style={styles.Edit}>Edit</Text> */}
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>}
                    <TouchableOpacity style={styles.listContainer} onPress={this.handleLogOutPress}>
                        <AccountList
                            iconName="door"
                            title="Log Out"
                        />
                    </TouchableOpacity>
                </ScrollView>
            )
        }
    }
}

export default Login