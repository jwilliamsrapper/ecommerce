import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Alert } from 'react-native'
import Styles from './style'
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { headerHam } from '../config/themeColors'
import { MaterialCommunityIcons } from '@expo/vector-icons';

class AdminHeader extends React.Component {
    constructor() {
        super();
        this.state = {
            content: ''
        }
    }
    render() {

        return (
            <SafeAreaView style={Styles.container}>
                <TouchableOpacity style={Styles.ham} >
                    <Icon name="bell" color={`${headerHam}`} size={22} />
                </TouchableOpacity>
                <View>
                    <Text style={Styles.logo}>Admin</Text>
                </View>
                <TouchableOpacity style={Styles.ham} >
                    <MaterialCommunityIcons name="account-circle" color={`${headerHam}`} size={25} />
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}

export default withNavigation(AdminHeader)
