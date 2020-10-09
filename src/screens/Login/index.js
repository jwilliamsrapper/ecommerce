import React from "react";
import {
    View,
    TouchableOpacity,
    ActivityIndicator,
    TextInput,
    KeyboardAvoidingView,
    Text,
    Image,
    AsyncStorage,
    Alert
} from "react-native";
import styles from './style'
import { Header } from 'react-navigation-stack';
import { signInAuth } from '../../config/firebase/Auth/signinAuth'
import { checkAuth } from '../../config/firebase/Auth/signUpAuth'
import { NavigationEvents } from "react-navigation";
import AccountList from '../../components/AccountList/AccountList'
import { getProfileData } from '../../config/firebase/Database/AuthDatabase'
import signout from '../../config/firebase/Auth/SignOut'
import { ScrollView } from "react-native-gesture-handler";
import { Spinner, Content } from 'native-base';
class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            loading: false,
            email: '',
            password: '',
            isLogin: false,
            image: false,
            userName: '',
            profile: [],
            setting: true
        }
        this.mounted = true;
    }

    async componentDidMount() {
        // this should be the current route;
        console.log(this.props.navigation.state.routeName)
        this.setState({ loading: true })
        // auth will return the current loged in user uid;
        checkAuth().then(async (res) => {
            console.log("res", res)
            // that will gonna mean if res means user is gonna loged in then go ahead and figure out;
            if (res) {
                this.setState({ isLogin: true })
                await AsyncStorage.setItem('uid', res);
                // this will return all the data of user id(res) this can be false when someone from admin loged in;
                getProfileData(res).then((resp) => {
                    console.log("auth data ::<<<===", resp);
                    // one more check that data is still is iniside the current doc can be 0 when admin user gonna come;
                    // if it will come 0 then send back to login;
                    if(resp.length){
                    if (this.props.navigation.state.routeName !== "Setting") {
                        this.setState({ setting: false })
                        if (resp[0].docData.status === true) {
                            if (resp[0].docData.vendor) {
                                this.props.navigation.navigate("Vendor")
                            } else {
                                this.props.navigation.navigate("App")
                            }
                        } else {
                            this.props.navigation.navigate("Disabled");
                        }
                    } else {
                        this.setState({ setting: false })
                    }
                    this.setState({ profile: resp })
                }else{
                    this.setState({isLogin: false, loading: false})
                }
                })
            } else {
                this.setState({ loading: false })
            }
        })
    }


    async componentWillUnmount() {

    }
    handleSubmitLogin = async () => {
        this.setState({ loading: true })
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
                Alert.alert("Couldn't Log in", "Please enter the correct email and password for your account.");
                this.setState({ loading: false })
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
        // removed for the apple navigation issue
        // this.props.navigation.navigate("Auth")
        this.componentDidMount();
    }

    render() {

        const { loading, isLogin, image, setting, profile } = this.state
        if (!isLogin) {
            return (
                <ScrollView contentContainerStyle={{
                    flex: 1, backgroundColor: !isLogin ? 'black' : null,
                    width: '100%'
                }}>
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
                            <Text style={[styles.loginText, {marginLeft: 10}]}>Login</Text>
                        </View>}
                        {!!!loading && !isLogin && <View style={styles.loginTextView}>
                            
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
                                Need an account?
          </Text>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('SignUp')}
                                style={styles.signupButton}>
                                <Text style={styles.textColor}>Sign up. </Text>
                            </TouchableOpacity>


                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('Home')}
                                style={styles.signupButton}>
                                <Text style={styles.signText}>No? <Text style={styles.textColor}>Go Home</Text>
                                </Text>
                               
                            </TouchableOpacity>
                        </View>}


                    </KeyboardAvoidingView>
                </ScrollView>
            );
        } else if (isLogin && !setting) {
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
                    {!!profile.length && profile[0].docData.vendor && <TouchableOpacity style={[styles.listContainer]} onPress={() => { this.props.navigation.navigate("Admin") }}>
                        <AccountList
                            iconName="switch"
                            title="Switch to selling"
                        />

                    </TouchableOpacity>}
                    <TouchableOpacity style={[styles.listContainer,]} onPress={() => { this.props.navigation.navigate("Terms") }}>
                        <AccountList
                            iconName="book-open-variant"
                            title="Terms & conditions"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.listContainer} onPress={this.handleLogOutPress}>
                        <AccountList
                            iconName="door"
                            title="Log Out"
                        />
                    </TouchableOpacity>

                </ScrollView>
            )
        } else {
            return (
                <View>
                    <Spinner color='black' />
                </View>
            )
        }
    }
}

export default Login