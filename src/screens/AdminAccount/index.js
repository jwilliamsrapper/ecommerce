import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, SafeAreaView, Image, AsyncStorage } from 'react-native'
import Styles from './style'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import AccountList from '../../components/AccountList/AccountList'
import SignOut from '../../config/firebase/Auth/SignOut'
import { geteDataForAdminProfileField } from '../../config/firebase/Database/GetData'
import { NavigationEvents } from "react-navigation";

export default class Account extends React.Component {
    constructor() {
        super();
        this.state = {
            content: '',
            loading: true,
            userName: ''
        }
    }
    async  componentDidMount() {
        const uid = await AsyncStorage.getItem("uid");
        const res = await geteDataForAdminProfileField(uid);
        console.log(res)
        this.setState({
            userName: res[0].docData.name,
            phone: res[0].docData.phone,
            docId: res[0].docId,
            image: res[0].docData.picId
        },()=>{
            this.setState({loading: false})
        })
    }
    handleLogOutPress = async()=>{
        this.setState({loading: true})
        await AsyncStorage.removeItem("uid");
        await SignOut();
        this.props.navigation.navigate("Auth")
    }
    render() {
        const {loading, userName, image} = this.state;

        return (

            <ScrollView style={Styles.container}>
                 <NavigationEvents
          onWillFocus={() => {
            this.componentDidMount()
          }}
        />
                 {!!loading && <Image 
            source={require('../../../assets/images/Loding.gif')}
                style={{
                    justifyContent: 'center',
                    alignSelf: 'center',
                    alignItems: 'center',
                    marginTop: '46%'
                }}
            />}
                {!loading && <View>
                <View style={Styles.nameCardContainer}>
                    <TouchableOpacity
                        style={Styles.imageContainer}
                        onPress={() => { this.props.navigation.navigate("EditProfile") }}
                    >
                        <Image
                            source={image ? {uri: image}: require('../../../assets/images/profile.png')}
                            resizeMode="contain"
                            style={Styles.profileImage}
                        />
                        <View>
                            <Text style={Styles.name}>{userName}</Text>
                            <Text style={Styles.Edit}>Edit</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                
                <TouchableOpacity style={Styles.listContainer} onPress={()=>{this.props.navigation.navigate("App")}}>
                    <AccountList
                    iconName="switch"
                    title="Switch to buyer"
                    />
                </TouchableOpacity>

                <TouchableOpacity style={Styles.listContainer} onPress={()=>{this.props.navigation.navigate("Terms")}}>
                    <AccountList
                    iconName="book-open-variant"
                    title="Terms & conditions"
                    />
                </TouchableOpacity>

                <TouchableOpacity style={Styles.listContainer} onPress={this.handleLogOutPress}>
                    <AccountList
                    iconName="door"
                    title="Log Out"
                    />
                </TouchableOpacity>
                </View>}
            </ScrollView>

        )
    }
}