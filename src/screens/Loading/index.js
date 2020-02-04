import React from 'react';
import { AsyncStorage, View, TouchableOpacity, Image, Alert, ImageBackground } from 'react-native'
import { Container, Header, Content, Card, CardItem, Body, Text } from 'native-base';
import { NavigationEvents } from "react-navigation";
import { checkAuth } from '../../config/firebase/Auth/signUpAuth'
import { getProfileData } from '../../config/firebase/Database/AuthDatabase'

export default class Loading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }

    }
    async componentDidMount() {

        await checkAuth().then((res) => {
            console.log("admin Data :::<<<==", res)
            if (res) {
                getProfileData(res).then((res) => {
                    console.log("auth data ::<<<===", res[0].docData)
                    if (res[0].docData.status === true) {

                        if (res[0].docData.vendor) {
                            console.log("vendor")
                            this.props.navigation.navigate("Vendor")
                        } else {
                            console.log("App")
                            this.props.navigation.navigate("App")
                        }
                    }else{
                        this.props.navigation.navigate("Disabled");
                    }

                })

            } else {
                console.log("Authx  ")
                this.props.navigation.navigate("Auth");
            }
        })

    }

    render() {
        const { loading } = this.state;
        return (

            <Container>
                <ImageBackground
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
                </ImageBackground>
            </Container>

        )
    }
}
