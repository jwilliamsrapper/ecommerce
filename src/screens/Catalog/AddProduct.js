import React from 'react';
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    Image,
    AsyncStorage
} from 'react-native'
import Styles from './style'
import { NavigationEvents } from "react-navigation";
import { MaterialIcons } from '@expo/vector-icons';
import { getDataAll } from '../../config/firebase/Database/GetData'
import * as Permissions from 'expo-permissions';

export default class AddProduct extends React.Component {
    constructor() {
        super();
        this.state = {
            content: '',
            loading: true,
        }
    }
    async  componentDidMount() {
        this.getPermissionAsync();

        this.setState({ loading: true })
        const res = await getDataAll('categories');
        // console.log(res)
        let newArr = [];
        this.setState({ content: [] })
        for (let x of res) {
            newArr = this.state.content.concat({ image: x.docData.image, docId: x.docId, text: x.docData.text });
            this.setState({ content: newArr })
        }
        this.setState({ loading: false })
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
    handlePress = async(item)=>{
        console.log(item)
        this.props.navigation.navigate("AddProductDetails",{"catData": item});

    }

    render() {
        const { loading, content, image } = this.state;
        // console.log(content)
        return (

            <ScrollView style={Styles.container}>
                {!!loading && <ActivityIndicator size={50} color="black"
                    style={{ marginTop: '10%' }}
                />}
                <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
                    {!!content.length && content.map((item, i) => {
                        // console.log('item=============>', item)
                        return (
                            <TouchableOpacity 
                            style={Styles.imageContainer} 
                            onPress={()=>{this.handlePress(item)}}
                            key={i}
                            >
                                <Text style={Styles.catNameTitle}>{item.text}</Text>
                                <View style={{
                                backgroundColor: 'pink', 
                                width: 150,
                                height: 150,
                                marginHorizontal: 4

                                }}><Image source={{uri: item.image}} style={{
                                    width: '100%',
                                    height: '100%'
                                }}/></View>
                            </TouchableOpacity>

                        )
                    })}
                </View>
            </ScrollView>

        )
    }
}
