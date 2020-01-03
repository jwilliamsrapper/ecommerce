import React from 'react';
import { Image, View, TouchableOpacity, FlatList, Dimensions } from 'react-native'
import { Spinner, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import Styles from './style'
import { getDataForProductsAll } from '../../config/firebase/Database/GetData'




function Item({ title, props }) {
    // console.log("===>>",title.docData.allData.salePrice)
    const price = title.docData.allData.price;
    const sale = title.docData.allData.salePrice;
    const image = title.docData.allData.callBack;
    const titles = title.docData.allData.allData.allData.data.title;
    return (
        <TouchableOpacity 
        onPress={()=>{props.navigation.navigate("ProductPage", {product: title})}}
        style={{
            width: Dimensions.get('window').width / 2,
            height: 250,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,

            elevation: 3,
            padding: 0,
            margin: 4,
            justifyContent: 'center',
            alignSelf: 'center',
            marginBottom: 20,
            borderWidth: 0.1
        }}>
            <Image
                source={{uri: image[0]}}
                style={{
                    height: 200,
                    width: Dimensions.get('window').width / 2,

                }}
            />
            <Text
                style={{
                    fontSize: 12,
                    paddingLeft: 10,
                    color: 'grey'
                }}
            >{titles}</Text>
            <View style={{flexDirection: 'row'}}>
            <Text
                style={{
                    fontSize: 17,
                    color: 'black',
                    paddingLeft: 10,
                    fontWeight: 'bold'     
                }}
            >${sale ? sale : price}</Text>
            <Text
                style={{
                    fontSize: 12,
                    color: 'red',
                    paddingLeft: 10,
                    paddingTop: 4,
                    fontWeight: 'bold',
                    textDecorationLine: 'line-through'     
                }}
            >{sale ? '$'+price : null}</Text>
            </View>
        </TouchableOpacity>
    );
}


export default class CategoryPage extends React.Component {
    constructor() {
        super();
        this.state = {
            content: [],
            category: '',
            loading: false,
        }
    }
    async componentDidMount() {
        const category = this.props.navigation.state.params.docData.text
        // console.log(category);
        this.setState({
            categoryName: category
        })
        const res = await getDataForProductsAll("product", category);
        // console.log('r==========>',res)
        this.setState({content: res, loading: true})
    }
    render() {
        const { categoryName, content, loading } = this.state;
        return (
            <View style={{ flex: 1, backgroundColor: '#F6F6F6', width: '100%' }}>
                <Header style={Styles.headings}>
                    <Text style={Styles.text}>{categoryName}</Text>
                </Header>
                {!loading && <Spinner color='black' />}
               {!!loading &&  <View style={{ padding: 4 }}>
                    <FlatList
                        numColumns={2}
                        horizontal={false}
                        contentContainerStyle={Styles.list}
                        data={content}
                        renderItem={({ item }) => <Item title={item} props={this.props} />}
                        keyExtractor={item => item.id}
                    />
                </View>}
                <View
                    style={{paddingBottom: 20}}
                />
            </View>
        );
    }
}