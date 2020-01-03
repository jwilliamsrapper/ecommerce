import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, AsyncStorage, Alert } from 'react-native'
import Styles from './style'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ImagePicker from '../../components/imagePicker/imagePicker'
import uploadImage from '../../config/firebase/Database/Image.js'
import { saveTopBanner, saveDiscountOffer } from '../../config/firebase/Database/SaveData'
import { getDataForTopBanner, getDataForDiscounts } from '../../config/firebase/Database/GetData'
import deleteImage from '../../config/firebase/Database/DeleteImage'
import { deleteData } from '../../config/firebase/Database/DeleteData'
import Input from '../../components/Input/Input'

export default class DiscountEdit extends React.Component {
    constructor() {
        super();
        this.state = {
            content: [],
            loading: true,
            pickImage: false,
            text: ''
        }
    }
    async componentDidMount() {
        this.setState({ loading: true })
        const res = await getDataForDiscounts();
        console.log('===========>comp=>',res)
        let newArr = [];
        for (let x of res) {
            console.log(x)
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

            this.setState({ pickImage: val }, () => { this.setState({ loading: false }) })

        }
    }
    saveDate = async () => {
        const { pickImage, text } = this.state;
        if (!pickImage || text === '') {
            Alert.alert(
                'field is empty',
                'please enter the name of the discount',
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                ],
                { cancelable: false },
            );
        } else {
            this.setState({ loading: true });
            let res = await uploadImage(pickImage, 'deals');
            const uid = await AsyncStorage.getItem("uid");
            const ress = await saveDiscountOffer(res, uid, text).then((ress) => {
                this.setState({
                    pickImage: false,
                    content: [],
                    loading: false,
                },()=>{
                    console.log('==========>res=>', ress)
                    this.componentDidMount();
                })
                
            });


        }
    }
    handleDelete = async (e) => {
        this.setState({ loading: true })
        const res = await deleteImage(e.image);
        const rss = await deleteData('discount_offer', e.docId).then(() => {
            this.setState({ content: [] })
            this.componentDidMount();
        })
        console.log(res)

    }

    render() {
        const { content, loading, pickImage, text } = this.state
        return (

            <ScrollView style={Styles.container}>
                <Text style={Styles.discountOffer}>Add new Discount offer or Delete old offer</Text>
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

                    <View style={{ marginTop: 20 }}>

                        <View style={{ marginBottom: 20 }}>
                            <Input
                                name="Discount e.g jeans 10% off"
                                onChangeText={(e) => { this.setState({ text: e }) }}
                                value={text}
                            />
                        </View>

                        {!pickImage && <ImagePicker
                            sendData={this.getData}
                            title="Add Image"
                        />}
                        {!!pickImage && <Image
                            source={{ uri: pickImage }}
                            style={Styles.bannerImage}
                        />}

                        <TouchableOpacity
                            style={[Styles.buttonContainer, { width: '30%', backgroundColor: 'green' }]}
                            onPress={this.saveDate}
                        >
                            <Text style={{ color: 'white' }}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>}

                {!!!loading && <View>
                    { !!content.length && content.map((item, index) => {
                        // console.log(item)
                        return (
                            <View style={Styles.bannerImageContainer} key={index}>
                                <Text style={{ marginBottom: 10, marginLeft: 20, fontSize: 20 }}>{item.text}</Text>
                                <Image source={{ uri: item.image }} style={Styles.bannerImage} />

                                <TouchableOpacity style={Styles.buttonContainer}
                                    onPress={() => { this.handleDelete(item) }}>
                                    <Text style={{ color: 'white' }}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    })}


                </View>}
                <View style={{ height: 30 }} />
            </ScrollView>

        )
    }
}