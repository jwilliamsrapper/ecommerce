import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, SafeAreaView, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';

export default class Inputs extends React.Component {
    constructor() {
        super();
        this.state = {
            content: '',
            backgroundColor: 'red'
        }
    }

    onFocus() {
        this.setState({
            backgroundColor: 'red'
        })
    }

    onBlur() {
        this.setState({
            backgroundColor: '#ededed'
        })
    }

    render() {

        return (
            <Input
                inputStyle={{ borderBottomColor: 'red' }}
                onChangeText = {this.props.onChangeText}
                placeholder={this.props.name}
                autoCapitalize='none'
                onBlur={() => this.onBlur()}
                onFocus={this.props.onFocus}
                leftIcon={
                    <Icon
                        name={this.props.iconName}
                        size={24}
                        color={this.props.iconColor}
                    />
                }
                leftIconContainerStyle={{ marginRight: 20 }}
                errorMessage={this.props.error}
                value={this.props.value}
            />


        )
    }
}