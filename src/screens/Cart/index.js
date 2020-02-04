import React from 'react';
import { View, TouchableOpacity, Image, AsyncStorage, ActivityIndicator } from 'react-native'
import { Container, Header, Content, Card, CardItem, Text, Icon, Right } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteProduct } from '../../store/action'
import { checkAuth } from '../../config/firebase/Auth/signUpAuth'
import { Toast } from 'native-base'
import { addProduct } from '../../store/action';
import { checkBillInfo, getDataAll } from '../../config/firebase/Database/GetData'

class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    handleEmpty = () => {
        console.log("prtop");
        this.props.deleteProduct();
        this.forceUpdate();
    }


    handleCheckOut = async () => {

        this.setState({ loading: true })
        const uid = await AsyncStorage.getItem("uid");
        // this.props.navigation.navigate("AddSubscription");
        checkAuth().then(async (res) => {
            if (res === false) {
                // console.log(res)
                Toast.show({
                    text: 'You need to Login first!',
                    buttonText: 'Okay',
                    position: "bottom",
                    duration: 5000,
                })
                this.props.navigation.navigate("Login")
            } else {
                const response = await checkBillInfo(uid);
                // console.log(response)
                if (response === true) {
                    this.props.navigation.navigate("Confirmation");
                    this.setState({ loading: false })
                } else {
                    this.props.navigation.navigate("Billing")
                    this.setState({ loading: false })
                }
                // this.props.navigation.navigate("Billing", 
                // {product: this.props.navigation.state.params.product});
            }
        })


    }
    render() {
        const { loading } = this.state;
        // console.log("this.form.cart",this.props.products.current)
        return (

            <Container>
                {!!loading &&
                    <View style={{
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        //  marginTop: '20%'
                    }}>
                        <ActivityIndicator size="large" color="black" />
                    </View>}
                <Content>
                    {!!this.props.products.current.length && this.props.products.current.map((e, i) => {
                        console.log("=-=-===>>", e.product.docData.allData.callBack[0])
                        return (
                            <Card key={i}>
                                <CardItem>
                                    <Image source={{ uri: e.product.docData.allData.callBack[0] }} style={{ width: 60, height: 50 }} />
                                    <View style={{ marginLeft: 20 }}>
                                        <Text>{e.product.docData.allData.allData.allData.data.title}</Text>
                                    </View>
                                    <Right>
                                        <Text>Price</Text>
                                        <Text>${e.product.docData.allData.salePrice ? e.product.docData.allData.salePrice : e.product.docData.allData.price}</Text>
                                    </Right>
                                </CardItem>
                            </Card>
                        )
                    })}
                    {!!this.props.products.current.length && <TouchableOpacity onPress={this.handleCheckOut}>
                        <Text style={{
                            alignSelf: 'center',
                            padding: 18,
                            backgroundColor: 'green',
                            color: 'white',
                            fontWeight: 'bold',
                            marginTop: 30
                        }}>Check Out</Text>
                    </TouchableOpacity>}
                    {!!this.props.products.current.length && <TouchableOpacity onPress={this.handleEmpty}>
                        <Text style={{
                            alignSelf: 'center',
                            padding: 15,
                            backgroundColor: 'red',
                            color: 'white',
                            fontWeight: 'bold',
                            marginTop: 30
                        }}>Empty Cart</Text>
                    </TouchableOpacity>}
                    {!this.props.products.current.length && <Image
                        source={require('../../../assets/empty-cart.png')}
                        style={{
                            resizeMode: 'contain',
                            width: '100%'
                        }}
                    />}

                </Content>
            </Container>

        )
    }
}

const mapStateToProps = (state) => {
    if (state.products) {

        const { products } = state

        // console.log(state)
        return { products }
    } else {
        return { products: {} }
    }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        deleteProduct,
        addProduct
    }, dispatch)
);


export default connect(mapStateToProps, mapDispatchToProps)(Cart);