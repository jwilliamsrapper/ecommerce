import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, AsyncStorage } from 'react-native'
import { header } from '../config/themeColors'
import Styles from './style'
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { headerHam } from '../config/themeColors'
import { TextInput, TouchableHighlight } from 'react-native-gesture-handler';

class HeaderSearch extends React.Component {
    constructor() {
        super();
        this.state = {
            content: '',
            text: '',
        }
    }

    handelSearch = () => {
        const { text } = this.state;
        console.log("initiating search", text)
        // this.setState({title: !title})
        if(text === ""){
            
        }else{
            AsyncStorage.setItem("query", text);
        }
    }

    handleText = (e) => {
        console.log(e);
        this.setState({text: e});
        this.props.parentCallback(e);
    }

    render() {
        const { title } = this.state;
        return (
            <View style={{
                backgroundColor: 'black',
                padding: 10,
                flexDirection: 'row'
            }}>
                {/* <StatusBar translucent={true} backgroundColor={'transparent'}  /> */}
                
                <TextInput
                    onChangeText={(e)=>{this.setState({text: e})}}
                    returnKeyType="search"
                    style={{
                        backgroundColor: 'white',
                        width: '75%',
                        paddingLeft: 5,
                        padding: 3
                    }}
                    placeholder="Search"
                    onChangeText={this.handleText}
                />
                <TouchableOpacity onPress={this.handelSearch} 
                style={{
                    marginLeft: 14,
                    flexDirection: 'column',
                    justifyContent: 'center'
                    }}>
                    <Text style={{
                        color: 'white',
                        marginRight: 16,
                        color: '#528ff2',
                        fontWeight: "800",
                        fontSize: 17,
                        alignSelf: 'center'
                    }}>Search</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default withNavigation(HeaderSearch)