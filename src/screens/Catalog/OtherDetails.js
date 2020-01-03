import React from 'react';
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    Alert,
    KeyboardAvoidingView,
    Image,
    AsyncStorage,
} from 'react-native'
import Styles from './style'
import * as Permissions from 'expo-permissions';
import { MaterialIcons } from '@expo/vector-icons';
import ImagePicker from '../../components/imagePicker/imagePicker'
import { Input } from 'react-native-elements'
import { Header } from 'react-navigation-stack';

export default class OtherDetails extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            pickImage: [],
            quantity: '',
            isQuantity: false,
            size: '',
            weight: '',
            color: ''
        }
    }
    async componentDidMount() {
        this.getPermissionAsync();
        const allData = this.props.navigation.state.params;
        this.setState({allData})

    }
    getPermissionAsync = async () => {
        const { status, expires, permissions } = await Permissions.askAsync(
            Permissions.CALENDAR,
            Permissions.CAMERA_ROLL
        );
        if (status !== 'granted') {
            alert('Hey! You heve not enabled selected permissions');
        }
    }

    handlePress = async () => {
        const { quantity, size, weight, color,allData } = this.state;
        if (quantity === '') {
            console.log('==== img ===> ')
            
            this.setState({isQuantity: true})
        } else {
            this.props.navigation.navigate("AddPrice", { OtherDetails: {quantity,size,weight,color}, allData })
        }
    }


    render() {
        const { isQuantity, isColor } = this.state;
        console.log(isQuantity)
        return (
            <SafeAreaView style={{ flex: 1 }}>
                 <KeyboardAvoidingView
                style={Styles.container}
                behavior="padding"
                enabled
                keyboardVerticalOffset={Header.HEIGHT + 55} // adjust the value here if you need more padding
            >
                <ScrollView style={{ flex: 1 }}>

                <View style={Styles.inputContainer}>
                            <Text style={Styles.titleTextDetails}>*Quantity</Text>
                            <Input
                                placeholder="e.g 50"
                                onChangeText={(e) => { this.setState({ quantity: e }) }}
                                errorMessage={isQuantity ? "please add Quantity" : null}
                                onFocus={() => { this.setState({ isQuantity: false }) }}
                            />
                        </View>



                        <View style={Styles.inputContainer}>
                            <Text style={Styles.titleTextDetails}>Color</Text>
                            <Input
                                placeholder="e.g green, yellow..."
                                onChangeText={(e) => { this.setState({ description: e }) }}
                                // errorMessage={isColor ? "more then five letter needed" : null}
                                onFocus={() => { this.setState({ color: false }) }}
                                style={{ textAlignVertical: 'top' }}
                                multiline={true}
                            />
                        </View>

                        <View style={Styles.inputContainer}>
                            <Text style={Styles.titleTextDetails}>Size</Text>
                            <Input
                                placeholder="e.g 20 ..."
                                onChangeText={(e) => { this.setState({ size: e }) }}
                                // errorMessage={isColor ? "more then five letter needed" : null}
                                onFocus={() => { this.setState({ size: false }) }}
                                style={{ textAlignVertical: 'top' }}
                                multiline={true}
                            />
                        </View>
                        <View style={Styles.inputContainer}>
                            <Text style={Styles.titleTextDetails}>Weight</Text>
                            <Input
                                placeholder="e.g 0.2 pound"
                                onChangeText={(e) => { this.setState({ weight: e }) }}
                                // errorMessage={isColor ? "more then five letter needed" : null}
                                onFocus={() => { this.setState({ weight: false }) }}
                                style={{ textAlignVertical: 'top' }}
                                multiline={true}
                            />
                        </View>
                </ScrollView>
                        </KeyboardAvoidingView>
                <TouchableOpacity
                    style={{
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignSelf: 'center',
                        backgroundColor: '#2089DC',
                        width: '100%',
                        height: 50,
                        alignItems: 'center',
                    }}
                    onPress={this.handlePress}
                >
                    <Text
                        style={{
                            fontSize: 22,
                            color: 'white'
                        }}
                    >Next</Text>
                </TouchableOpacity>
              
            </SafeAreaView>

        )
    }
}