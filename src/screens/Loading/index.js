import React from 'react';
import { AsyncStorage, View, TouchableOpacity, Image, ImageBackground } from 'react-native'
import { Container, Header, Content, Card, CardItem, Text } from 'native-base';
import { NavigationEvents } from "react-navigation";
import { checkAuth } from '../../config/firebase/Auth/signUpAuth'
import { getProfileData } from '../../config/firebase/Database/AuthDatabase'
import NetInfo from "@react-native-community/netinfo";
import { Updates } from 'expo';
import { Button } from 'react-native-elements';
import Constants from 'expo-constants';

export default class Loading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            noNetwork: false,
            showUpdate: false,
            connection: false
        }

    }
    async componentDidMount() {
        if(Constants.isDevice){
            Updates.checkForUpdateAsync().then(async(update) => {
                if (update.isAvailable) {
                    await Updates.fetchUpdateAsync();
                    this.setState({ showUpdate: true });
                }
            });
        }
        let connection;
      await NetInfo.fetch().then(state => {
            connection = state.isConnected;
            this.setState({connection: state.isConnected})
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
        });
        console.log("connected ==-=-=>",this.state.connection)
        if (this.state.connection === true) {
            // console.log("changing screens now")
            // await checkAuth().then((res) => {
            //     console.log("admin Data :::<<<==", res)
            //     if (res) {
            //         getProfileData(res).then((res) => {
            //             console.log("auth data ::<<<===", res[0].docData)
            //             if (res[0].docData.status === true) {

            //                 if (res[0].docData.vendor) {
            //                     console.log("vendor")
            //                     this.props.navigation.navigate("Vendor")
            //                 } else {
            //                     console.log("App")
            //                     this.props.navigation.navigate("App")
            //                 }
            //             } else {
            //                 this.props.navigation.navigate("Disabled");
            //             }

            //         })

            //     } else {
            //         console.log("Authx  ")
            //         this.props.navigation.navigate("App");
            //     }
            // })
            this.props.navigation.navigate("App")

        } else {
            this.setState({ noNetwork: true })
        }
    }

    doUpdate = () => {
        Updates.reload();
    }

    render() {
        const { loading, showUpdate, connection } = this.state;
        console.log(connection)
        if (connection) {
            return (
                <Container>
                    {showUpdate ?
                        <View style={{
                            justifyContent: 'center',
                            alignContent: 'center',
                            alignItems: 'center',
                            flex: 1
                        }}>
                            <Text>A new update is available, click! </Text>
                            <Button onPress={() => this.doUpdate()} title="Update Now"></Button>
                        </View>
                        : <ImageBackground
                            source={require('../../../assets/LoadingBackground.jpeg')}
                            style={{ width: '100%', height: '100%' }}
                        // resizeMode="cover"
                        >

                            {!!loading && <Image
                                source={require('../../../assets/images/Loding.gif')}
                                style={{
                                    justifyContent: 'center',
                                    alignSelf: 'center',
                                    alignItems: 'center',
                                    marginTop: '46%'
                                }}
                            />}
                            <NavigationEvents
                                onWillFocus={() => {
                                    this.setState({ loading: true })
                                    this.componentDidMount()
                                }}
                            />
                        </ImageBackground>}


                </Container >

            )
        } else {
            return (
                <View>
                    <Image
                        source={require('../../../assets/no-connection.jpg')}
                        style={{
                            justifyContent: 'center',
                            alignSelf: 'center',
                            alignItems: 'center',
                            marginTop: '26%'
                        }}
                    />
                </View>
            )
        }
    }
}


