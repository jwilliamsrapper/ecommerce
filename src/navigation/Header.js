import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Alert } from 'react-native'
import { header } from '../config/themeColors'
import Styles from './style'
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { headerHam } from '../config/themeColors'
import { TextInput, TouchableHighlight } from 'react-native-gesture-handler';

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            content: '',
            title: true,
        }
    }

    handelSearch = () => {
        const { title } = this.state;
        console.log("initiating search")
        // this.setState({title: !title})
        this.props.navigation.navigate("Search")
    }

    render() {
        const { title } = this.state;
        return (
            <SafeAreaView style={Styles.container}>
                <TouchableOpacity style={Styles.ham} onPress={() => { this.props.navigation.toggleDrawer(); }}>
                    <Icon name="list" color={`${headerHam}`} size={25} />
                </TouchableOpacity>
                {!!title && <View>
                    <Text style={Styles.logo}>MODE</Text>
                </View>}
               {!title &&  <TouchableHighlight style={Styles.inputContainer}>
                   <View style={Styles.input}>
                    <Icon name="search" color={"grey"} size={22} />
                    <Text style={Styles.searchText}>Search</Text>
                   </View>
                </TouchableHighlight>}
                <View style={Styles.row}>
                <TouchableOpacity style={Styles.ham} onPress={this.handelSearch}>
                    <Icon name={title ? "search" : "close"} color={`${headerHam}`} size={25} />
                </TouchableOpacity>
                <TouchableOpacity style={Styles.ham} onPress={() => { this.props.navigation.navigate("Cart"); }}>
                    <Icon name="shopping-cart" color={`${headerHam}`} size={25} />
                </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}

export default withNavigation(Header)