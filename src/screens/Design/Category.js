import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, AsyncStorage, Alert } from 'react-native'
import Styles from './style'
import { Entypo } from '@expo/vector-icons';
import ImagePicker from '../../components/imagePicker/imagePicker'
import uploadImage from '../../config/firebase/Database/Image.js'
import { saveTopBanner } from '../../config/firebase/Database/SaveData'
import { getDataAll } from '../../config/firebase/Database/GetData'
import deleteImage from '../../config/firebase/Database/DeleteImage'
import { deleteData } from '../../config/firebase/Database/DeleteData'
import AccountListImage from '../../components/AccountList/AccountListImage'
import { NavigationEvents } from "react-navigation";

export default class Category extends React.Component {
    constructor() {
        super();
        this.state = {
            content: [],
            loading: true
        }
    }
    async componentDidMount() {
        console.log("compnnetn di monint")
        this.setState({ loading: true })
        const res = await getDataAll('categories');
        // console.log(res)
        let newArr = [];
        this.setState({content: []})
        for (let x of res) {
            newArr = this.state.content.concat({ image: x.docData.image, docId: x.docId, text: x.docData.text });
            this.setState({ content: newArr })
        }
        this.setState({ loading: false })
    }

    getData = async (val) => {
        // console.log(val)
        this.setState({ loading: true })
        let res = false
        if (val !== null) {
            res = await uploadImage(val, 'categoryImage');
            const uid = await AsyncStorage.getItem("uid")
            const ress = await saveTopBanner(res, uid).then(() => {
                this.setState({ content: [] })
                this.componentDidMount()
            });
        }
    }

    handleDelete = async (e) => {
        Alert.alert(
            'Are you sure?',
            'do you really want to delete the category it can effect the products',
            [
              {text: 'No', onPress: () => console.log('Ask me later pressed')},
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'yes', onPress: async() => {
                this.setState({ loading: true })
                const res = await deleteImage(e.image);
                const rss = await deleteData('categories', e.docId).then(() => {
                    this.setState({ content: [] })
                    this.componentDidMount();
                })
              }},
            ],
            {cancelable: false},
          );
          
      
        // console.log(res)

    }

    render() {
        const { content, loading } = this.state
        return (

            <ScrollView style={Styles.container}>
                {!!loading && <Image
                    source={require('../../../assets/images/Loding.gif')}
                    style={{
                        justifyContent: 'center',
                        alignSelf: 'center',
                        alignItems: 'center',
                        marginTop: '46%'
                    }}
                />}
                <NavigationEvents
                    onWillFocus={() => {
                        this.setState({content: []})
                        this.componentDidMount()
                    }}
                />
                {!!!loading && <TouchableOpacity
                    style={Styles.addCatBtn}
                    onPress={() => { this.props.navigation.navigate("AddCategory") }}
                >
                    <Text style={{ color: 'white', fontSize: 17, paddingRight: 8 }}
                    >Add New Category</Text>
                    <Entypo name="add-to-list" size={25} color="white" />
                </TouchableOpacity>}
                {!!!loading && <View>
                    {!!content.length && content.map((item, index) => {
                        // console.log(item)
                        return (
                            <TouchableOpacity style={Styles.catList} key={index} onPress={()=>{this.handleDelete(item)}}>
                                <AccountListImage
                                    title={item.text}
                                    src={{ uri: item.image }}
                                />
                            </TouchableOpacity>
                        )
                    })}

                    {/* <View style={{ marginTop: 20 }}>
                        <ImagePicker sendData={this.getData} title="Add new image" />
                    </View> */}
                </View>}
            </ScrollView>

        )
    }
}