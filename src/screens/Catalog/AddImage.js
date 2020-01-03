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

export default class AddProductDetails extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            pickImage: []
        }
    }
    async componentDidMount() {
        this.getPermissionAsync();
        const data = this.props.navigation.state.params;
        this.setState({data})
        // console.log('king   ',data)

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
        const { pickImage, data } = this.state;
        console.log('==== img ===> ', pickImage)
        if (pickImage.length < 1) {
            alert("you need atleast 4 images");
        } else {
            console.log(this.props.navigation.state)
            this.props.navigation.navigate("OtherDetails", {productImage: pickImage, data})
        }
    }

    getData = async (val) => {
        console.log(val)
        this.setState({ loading: true })
        let res = false
        if (val !== null) {
            let newArr = [];
            newArr = this.state.pickImage.concat({ image: val });
            this.setState({ pickImage: newArr })
            // this.setState({ pickImage: val }, () => { this.setState({ loading: false }) })

        }
    }

    render() {
        const { pickImage } = this.state;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }}>

                    {!!pickImage.length && pickImage.map((item, i) => {
                        console.log(item)
                        return (
                            <TouchableOpacity
                                key={i}
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                }}
                            >
                                <Image

                                    source={{ uri: item.image }}
                                    style={{
                                        height: 190,
                                        flex: 1
                                    }}
                                />
                            </TouchableOpacity>
                        )
                    })}
                    <View style={{padding: 50}}>
                    <ImagePicker
                        sendData={this.getData}
                        title="Add Image"
                    />
</View>
                </ScrollView>
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