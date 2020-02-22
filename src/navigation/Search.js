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
            this.props.search();
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
                // padding: 10,
                flex: 1,
                backgroundColor: 'black',
                paddingTop: 10,
            }}>
                <View style={{
                    color: 'white',
                    paddingLeft: 10,
                    paddingTop: 2,
                    paddingBottom: 10,
                    }}><Icon name="arrow-left" color="white" size={30} onPress={()=>{this.props.navigation.goBack()}}/></View>
                {/* <StatusBar translucent={true} backgroundColor={'transparent'}  /> */}
                
                <TextInput
                autoFocus={true}
                    onChangeText={(e)=>{this.setState({text: e})}}
                    returnKeyType="search"
                    style={{
                        backgroundColor: 'white',
                        width: '80%',
                        height: 40,
                        borderRadius: 18,
                        paddingLeft: 30,
                        fontSize: 20,
                        alignSelf: 'center',
                        borderColor: 'black',
                        borderWidth: 1
                    }}
                    placeholder="Search"
                    onChangeText={this.handleText}
                />
                {/* <TouchableOpacity onPress={this.handelSearch} 
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
                </TouchableOpacity> */}
            </View>
        )
    }
}

export default withNavigation(HeaderSearch)