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
            color: '',
            allColors: [],
            description: "",
            allSizes: []
        }
    }
    async componentDidMount() {
        this.getPermissionAsync();
        const allData = this.props.navigation.state.params;
        this.setState({ allData })

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
        const { quantity, size, weight, color, allData, allSizes, allColors } = this.state;
        if (quantity === '') {
            console.log('==== img ===> ')

            this.setState({ isQuantity: true })
        } else {
            this.props.navigation.navigate("AddPrice", { OtherDetails: { quantity, size, weight, color, allSizes, allColors }, allData })
        }
    }
    handleColor = () => {
        if (this.state.description === "") {
            alert("Field cannot be empty!")
        } else {
            this.setState({ allColors: [...this.state.allColors, this.state.description] })
            this.setState({ description: '' })
        }
    }
    handleSize = () => {
        if (this.state.size === "") {
            alert("Field cannot be empty!")
        } else {
            this.setState({ allSizes: [...this.state.allSizes, this.state.size] })
            this.setState({ size: '' })
        }
    }

    render() {
        const { isQuantity, allColors, allSizes } = this.state;
        console.log(isQuantity)
        return (
            <SafeAreaView style={{ flex: 1 }} keyboardShouldPersistTaps="always" >
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
                            <View style={{ flexDirection: 'column' }}>
                                <Input
                                    placeholder="e.g green..."
                                    onChangeText={(e) => { this.setState({ description: e }) }}
                                    // errorMessage={isColor ? "more then five letter needed" : null}
                                    onFocus={() => { this.setState({ color: false }) }}
                                    style={{ textAlignVertical: 'top' }}
                                    multiline={true}
                                    value={this.state.description}

                                />
                                <TouchableOpacity style={Styles.addButton} onPress={this.handleColor}>
                                    <Text style={Styles.addButtonText}>ADD</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={Styles.row}>
                                {!!allColors.length && allColors.map((e, i) => {
                                    return (
                                        <View style={Styles.addedColor} key={i}>
                                            <Text>{e}</Text>
                                        </View>
                                    )
                                })}
                            </View>
                        </View>

                        <View style={Styles.inputContainer}>
                            <Text style={Styles.titleTextDetails}>Size</Text>
                            <Input
                                placeholder="e.g 20 ..."
                                onChangeText={(e) => { this.setState({ size: e }) }}
                                // errorMessage={isColor ? "more then five letter needed" : null}
                                onFocus={() => { this.setState({ size: '' }) }}
                                style={{ textAlignVertical: 'top' }}
                                multiline={true}
                                value={this.state.size}
                            />
                            <TouchableOpacity style={Styles.addButton} onPress={this.handleSize}>
                                <Text style={Styles.addButtonText}>ADD</Text>
                            </TouchableOpacity>
                            <View style={Styles.row}>
                                {!!allSizes.length && allSizes.map((e, i) => {
                                    return (
                                        <View style={Styles.addedColor} key={i*Math.random()*33}>
                                            <Text>{e}</Text>
                                        </View>
                                    )
                                })}
                            </View>
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