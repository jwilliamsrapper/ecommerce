import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image,  AsyncStorage,Alert } from 'react-native'
import Styles from './style'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ImagePicker from '../../components/imagePicker/imagePicker'
import uploadImage from '../../config/firebase/Database/Image.js'
import { saveTopBanner } from '../../config/firebase/Database/SaveData'
import { getDataForTopBanner } from '../../config/firebase/Database/GetData'
import deleteImage from '../../config/firebase/Database/DeleteImage'
import { deleteData } from '../../config/firebase/Database/DeleteData'

export default class BannerEdit extends React.Component {
    constructor() {
        super();
        this.state = {
            content: [],
            loading: true
        }
    }
   async componentDidMount(){
    this.setState({loading: true})    
    const res= await getDataForTopBanner();
        console.log(res)
        let newArr = [];
        for(let x of res){
            newArr = this.state.content.concat({image: x.docData.image, docId: x.docId});
            this.setState({content: newArr})
        }
        this.setState({loading: false})
    }

    getData = async(val) => {
        // console.log(val)
        this.setState({loading: true})
        let res = false
        if (val !== null) {
            res = await uploadImage(val, 'bannerTop');
            const uid = await AsyncStorage.getItem("uid")
            const ress = await saveTopBanner(res, uid).then(()=>{
                this.setState({content: []})
                this.componentDidMount()
            });
        }
    }

    handleDelete=async(e)=>{
        this.setState({loading: true})
        const res = await deleteImage(e.image);
        const rss = await deleteData('top_banner', e.docId).then(()=>{
            this.setState({content: []})    
            this.componentDidMount();          
        })
        console.log(res)

    }

    render() {
        const { content,loading } = this.state
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
                {!!!loading && <View>
                {!!content.length && content.map((item, index) => {
                    console.log(item)
                    return (
                        <View style={Styles.bannerImageContainer} key={index}>
                            <Text style={{ marginBottom: 10, marginLeft: 20, fontSize: 20 }}>Banner {index + 1}</Text>
                            <Image source={{ uri: item.image }} style={Styles.bannerImage} />
                            <TouchableOpacity style={Styles.buttonContainer} onPress={()=>{this.handleDelete(item)}}>
                                <Text style={{ color: 'white' }}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    )
                })}

                <View style={{ marginTop: 20 }}>
                    <ImagePicker sendData={this.getData} title="Add new image" />
                </View>
                </View>}
            </ScrollView>

        )
    }
}