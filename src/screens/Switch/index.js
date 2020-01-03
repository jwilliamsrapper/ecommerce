import React from 'react';
import { AsyncStorage, View, TouchableOpacity, Image, Alert } from 'react-native'
import { Container, Header, Content, Card, CardItem, Body, Text } from 'native-base';
import { NavigationEvents } from "react-navigation";
import { checkAuth } from '../../config/firebase/Auth/signUpAuth'

export default class Switch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    async componentDidMount() {
        setTimeout(async()=>{
            await checkAuth().then((res) => {
                if (!res) {
                    this.props.navigation.navigate("AdminLogin")
                    this.setState({loading: true})
                } else {
                  this.props.navigation.navigate("AdminHome");
                }
            })
        }, 1000)
    }

    render() {
        const { loading } = this.state;
        return (

            <Container>
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
                        this.setState({ loading: true})
                        this.componentDidMount()
                    }}
                />
            </Container>

        )
    }
}
