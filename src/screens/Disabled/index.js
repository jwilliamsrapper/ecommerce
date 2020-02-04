import React from 'react';
import { AsyncStorage, View, TouchableOpacity, Image, Dimensions } from 'react-native'
import { Container, Button, Content, Card, CardItem, Body, Text } from 'native-base';
import SignOut from '../../config/firebase/Auth/SignOut'

export default class Disabled extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }

    }
    async componentDidMount() {


    }
    handleLogOutPress = async()=>{
        this.setState({loading: true})
        await AsyncStorage.removeItem("uid");
        await SignOut();
        this.props.navigation.navigate("Auth")
    }
    render() {
        console.log( Dimensions.get('window').height)
        const { loading } = this.state;
        return (

            <Container style={{alignContent: 'center', justifyContent: 'center', alignItems: 'center'}}>
               <Image 
                source={require('../../../assets/images/disabled.png')}
                style={{width: '100%', resizeMode: 'contain', height: Dimensions.get('window').height/3}}
               />
               
               <Text>Something went Wrong</Text>
               <Text>Your account is disabled</Text>
               <Text>Contact "MODE" support for help</Text>
               <Button dark style={{marginTop: 7}} onPress={this.handleLogOutPress}><Text> Log out </Text></Button>
            </Container>

        )
    }
}
