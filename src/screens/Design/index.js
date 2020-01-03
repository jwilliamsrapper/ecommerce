import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, SafeAreaView, Alert } from 'react-native'
import Styles from './style'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Card, ListItem, Button, Icon } from 'react-native-elements'

export default class Design extends React.Component {
    constructor() {
        super();
        this.state = {
            content: ''
        }
    }
    render() {

        return (

            <ScrollView style={Styles.container}>

                <View style={Styles.top}>
                    <MaterialCommunityIcons name="desktop-mac" size={26} style={{ marginLeft: 5 }} />
                    <Text style={Styles.DesignText}>Design</Text>
                </View>

                <Card
                    title='Home Page Top Banner'
                    image={require('../../../assets/images/bannerMain.png')}>
                    {/* <Text style={{ marginBottom: 10 }}>
                        The idea with React Native Elements is more about component structure than actual design.
                     </Text> */}
                    <Button
                        onPress={()=>{this.props.navigation.navigate("BannerEdit")}}
                        icon={<Icon name='add' color='#ffffff' />}
                        buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                        title='Add or Edit'/>
                </Card>
                <Card
                    title='Discounts'
                    image={require('../../../assets/images/dealMain.png')}>
                    {/* <Text style={{ marginBottom: 10 }}>
                        The idea with React Native Elements is more about component structure than actual design.
                     </Text> */}
                    <Button
                        onPress={()=>{this.props.navigation.navigate("DiscountEdit")}}
                        icon={<Icon name='add' color='#ffffff' />}
                        buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                        title='Add or Edit'/>
                </Card>
                <Card
                    title='Category'
                    image={require('../../../assets/images/categoryMain.png')}>
                    {/* <Text style={{ marginBottom: 10 }}>
                        The idea with React Native Elements is more about component structure than actual design.
                     </Text> */}
                    <Button
                        onPress={()=>{this.props.navigation.navigate("Category")}}
                        icon={<Icon name='add' color='#ffffff' />}
                        buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                        title='Add or Edit'/>
                </Card>
            </ScrollView>

        )
    }
}