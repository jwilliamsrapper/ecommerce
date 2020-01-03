import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Alert } from 'react-native'
import { header } from '../config/themeColors'
import Styles from './style'
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { headerHam } from '../config/themeColors'

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            content: ''
        }
    }
    render() {

        return (
            <SafeAreaView style={Styles.container}>
                <TouchableOpacity style={Styles.ham} onPress={() => { this.props.navigation.toggleDrawer(); }}>
                    <Icon name="list" color={`${headerHam}`} size={25} />
                </TouchableOpacity>
                <View>
                    <Text style={Styles.logo}>MOD</Text>
                </View>
                <TouchableOpacity style={Styles.ham} onPress={() => { this.props.navigation.navigate("Cart"); }}>
                    <Icon name="shopping-cart" color={`${headerHam}`} size={25} />
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}

export default withNavigation(Header)