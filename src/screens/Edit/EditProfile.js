import React from 'react';
import { Alert, View, AsyncStorage, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native'
import Input from '../../components/Input/Input'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import { Header } from 'react-navigation-stack';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import  uploadImage  from '../../config/firebase/Database/Image.js'
import { geteDataForAdminProfileField } from '../../config/firebase/Database/GetData'
import { saveEditUserData } from '../../config/firebase/Database/SaveData'

export default class EditProfile extends React.Component {
    constructor() {
        super();
        this.state = {
            content: '',
            image: null,
            user: '',
            phone: '',
            loading: true
        }
    }
    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            //   allowsEditing: true,
            //   aspect: [4, 3],
            //   quality: 1
        });

        console.log(result);

        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
    };
  async  componentDidMount() {
        const uid = await AsyncStorage.getItem("uid");
        this.getPermissionAsync();
        const res = await geteDataForAdminProfileField(uid);
        console.log(res)
        this.setState({
            user: res[0].docData.name,
            phone: res[0].docData.phone,
            docId: res[0].docId,
            image: res[0].docData.picId
        },()=>{
            this.setState({loading: false})
        })
    }

    handelSave = async () => {
        this.setState({loading: true})
        const {image} = this.state;
        let res= false
        console.log(image)
            if(image !== null && image !== undefined){
                 res = await uploadImage(image, 'adminProfiles');
            }
                const {user,phone,docId} = this.state;
                const ress = await saveEditUserData(user,phone,docId,res);
                console.log(ress)
                this.props.navigation.navigate("Account", {refresh: ()=>{this.componentWillMount}});

        
    }
    render() {
        const { image,user,phone,loading } = this.state
        return (

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior="position"
                enabled
                keyboardVerticalOffset={Header.HEIGHT -150} // adjust the value here if you need more padding
            >  
           {!!loading && <Image 
            source={require('../../../assets/images/Loding.gif')}
                style={{
                    justifyContent: 'center',
                    alignSelf: 'center',
                    alignItems: 'center',
                    marginTop: '46%'
                }}
            />}
              {!loading &&   <View  >
                    <TouchableOpacity
                        onPress={this._pickImage}
                        style={{
                            alignSelf: 'center',
                            marginTop: 20
                        }}>
                        <Image
                            source={image ? { uri: image } : require("../../../assets/images/profile.png")}
                            style={{
                                width: 100,
                                height: 100,
                                borderRadius: 80 / 2,
                                overflow: "hidden",
                                resizeMode: 'contain',
                            }}
                        />
                    </TouchableOpacity>
                    <Button
                        onPress={this._pickImage}
                        title="Upload new image"
                        type="clear"
                    />
                    <View
                        style={{

                            marginTop: 20,
                            width: '70%',
                            alignSelf: 'center'
                        }}
                    >
                        <Input
                            value={user}
                            iconName="user"
                            onChangeText={(e) => { this.setState({ user: e }) }}
                        />
                    </View>

                    <View
                        style={{

                            marginTop: 20,
                            width: '70%',
                            alignSelf: 'center'
                        }}
                    >

                        <Input
                            value={phone}
                            iconName="phone"
                            onChangeText={(e) => { this.setState({ phone: e }) }}
                        />
                    </View>
                    {/* <View
                        style={{

                            marginTop: 20,
                            width: '70%',
                            alignSelf: 'center'
                        }}
                    >
                        <Input
                            value="Your brand name"
                            iconName="copyright"
                            onChangeText={(e) => { this.setState({ userName: e }) }}
                        />
                    </View> */}
                    <View
                        style={{

                            marginTop: 20,
                            width: '70%',
                            alignSelf: 'center'
                        }}
                    >
                        <Button
                        onPress={this.handelSave}
                            icon={
                                <Icon
                                    name="arrow-right"
                                    size={15}
                                    color="white"
                                    style={{ marginLeft: 10 }}
                                />
                            }
                            iconRight
                            title="Save"
                        />
                    </View>
                </View>}
            </KeyboardAvoidingView>

        )
    }
}