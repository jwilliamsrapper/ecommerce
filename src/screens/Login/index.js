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

        console.log(this.props.navigation.state.routeName)
        this.setState({ loading: true })
        checkAuth().then(async (res) => {
            if (res) {
                this.setState({ isLogin: true })
                await AsyncStorage.setItem('uid', res);

                getProfileData(res).then((res) => {
                    console.log("auth data ::<<<===", res[0].docData.vendor)
                    if (this.props.navigation.state.routeName !== "Setting") {
                        this.setState({ setting: false })
                        if (res[0].docData.status === true) {
                            if (res[0].docData.vendor) {
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
                alert(res)
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
        this.props.navigation.navigate("Auth")
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
                                First time here?
          </Text>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('SignUp')}
                                style={styles.signupButton}>
                                <Text style={styles.textColor}>Sign up.</Text>
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