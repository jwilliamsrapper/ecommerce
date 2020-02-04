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
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements'
import { saveProduct } from '../../config/firebase/Database/SaveData'
import uploadImage from '../../config/firebase/Database/Image.js'

export default class AddPrice extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            pickImage: [],
            quantity: '',
            isPrice: false,
            price: '',
            salePrice: ''
        }
    }

    componentDidMount() {
        const allData = this.props.navigation.state.params;
        this.setState({ allData, images: allData.allData.productImage })
        // console.log(allData.allData.productImage)
    }

    handlePress = async () => {
        const { price, salePrice, allData, images } = this.state;
        let callBack = []
        if (price === '') {
            console.log('==== img ===> ')

            this.setState({ isPrice: true })
        } else {
            this.setState({ loading: true })
            const uid = await AsyncStorage.getItem('uid');
            let i = 0;
            for (i = 0; i < images.length; i++) {
                // console.log(images[i])
                await uploadImage(images[i].image, 'product').then((res) => {
                    callBack.push(res);
                })
            }
            if (i === images.length) {
                const all = { allData, price, salePrice, callBack, status: 'pending' }
                const category = allData.allData.data.catData.text
                console.log('cqat ====> ', category)
                await saveProduct(all, uid, category).then(async (res) => {
                    console.log(res)
                    if (res === "sucess") {
                        this.setState({ loading: false })
                        alert("Your product is added")
                        this.props.navigation.navigate("Home");
                    } else {
                        alert("something went wrong!");
                    }
                })
            }

        }
        // console.log(this.props.navigation.state);
    }


    render() {
        const { loading, isPrice } = this.state;
        return (


            <SafeAreaView style={{ flex: 1 }}>
                {!!loading && <Image
                    source={require('../../../assets/images/Loding.gif')}
                    style={{
                        justifyContent: 'center',
                        alignSelf: 'center',
                        alignItems: 'center',
                        marginTop: '46%'
                    }}
                />}
                {!loading && <ScrollView style={{ flex: 1 }}>

                    <View style={Styles.inputContainer}>
                        <Text style={[Styles.titleTextDetails, { fontSize: 20 }]}>* Price</Text>
                        <Input
                            placeholder="e.g 50$"
                            onChangeText={(e) => { this.setState({ price: e }) }}
                            errorMessage={isPrice ? "please Price" : null}
                            onFocus={() => { this.setState({ isPrice: false }) }}
                            leftIcon={
                                <Icon
                                    name='dollar'
                                    size={24}
                                    color='black'
                                    style={{ paddingRight: 11 }}
                                />
                            }
                            keyboardType="number-pad"
                        />
                    </View>



                    <View style={Styles.inputContainer}>
                        <Text style={Styles.titleTextDetails}>Sale Price (if any)</Text>
                        <Input
                            placeholder="e.g 10$"
                            onChangeText={(e) => { this.setState({ salePrice: e }) }}
                            // errorMessage={isColor ? "more then five letter needed" : null}
                            onFocus={() => { this.setState({ color: false }) }}
                            style={{ textAlignVertical: 'top' }}
                            multiline={true}
                            keyboardType="number-pad"
                        />
                    </View>

                </ScrollView>}
                {!loading && <TouchableOpacity
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
                    >Upload Product</Text>
                </TouchableOpacity>}
            </SafeAreaView>

        )
    }
}