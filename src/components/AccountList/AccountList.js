import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, SafeAreaView, Alert } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default class AccountList extends React.Component {
    constructor() {
        super();
        this.state = {
            content: ''
        }
    }
    render() {

        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignContent: 'center',
                    alignItems: 'center',
                    marginLeft: 10
                }}>
                <MaterialCommunityIcons name={`${this.props.iconName}`} size={32} color="#517fa4" />
                <Text
                    style={{ marginLeft: 10 }}
                >{this.props.title}</Text>

            </View>
        )
    }
}