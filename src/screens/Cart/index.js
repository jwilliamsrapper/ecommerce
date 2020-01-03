import React from 'react';
import { View, TouchableOpacity, Image, Alert } from 'react-native'
import { Container, Header, Content, Card, CardItem, Text, Icon, Right } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteProduct } from '../../store/action'


class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    handleEmpty = () =>{
        console.log("prtop");
        this.props.deleteProduct();
        this.forceUpdate();
    }

    render() {
        // console.log(this.props.products.current)
        return (

            <Container>

                <Content>
                    {!!this.props.products.current.length && this.props.products.current.map((e, i) => {
                        console.log("=-=-===>>", e.product.docData.allData)
                        return (
                            <Card key={i}>
                                <CardItem>
                                    <Image source={require('../../../assets/hat.jpg')} style={{ width: 60, height: 50 }} />
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
    }, dispatch)
  );
  

export default connect(mapStateToProps,mapDispatchToProps)(Cart);