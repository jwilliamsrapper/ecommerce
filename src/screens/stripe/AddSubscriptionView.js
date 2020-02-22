import React from 'react';
import { StyleSheet, View, ScrollView, AsyncStorage, Image } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import PaymentFormView from './PaymentView';
import { TextInput, TouchableHighlight } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import { deleteProduct } from '../../store/action'
import { bindActionCreators } from 'redux';
import { Right, Icon, Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Left, Body } from 'native-base';

/**
 * The class renders a view with PaymentFormView
 */
let totals = 0;
class AddSubscriptionView extends React.Component {
  constructor() {
    super()
    this.state = {
      total: 0,
      product: '',
      shippingCost: 0,
      error: false
    }
  }

  async  componentDidMount() {
    // console.log("navigate====", this.props)
    // console.log('naiviafsdpfmpsdomp',this.props.navigate.actions.navigate)

    this.props.sendData(this.props.products.current);
    // console.log(await AsyncStorage.getItem("shippingCost"))
    const ship = await AsyncStorage.getItem("shippingCost")
    const shippingCost = parseInt(ship);
    this.setState({
      shippingCost
    })
  }

  handleDelete = () => {
    // console.log(i)
    this.props.deleteProduct();
    // navigation.navigate("Home")
    this.props.navigate.actions.goBack()
    this.forceUpdate()

  }
  render() {
    const { shippingCost, error } = this.state;
    var total = 0;
    let withoutShipTotal = 0;
    console.log('props ===========> ', this.props.navigate.state.params)
    const products = this.props.products.current
    const totalPrice = total * 100;
    //  AsyncStorage.setItem("total", totalPrice.toString());
    if (products) {
      return (
        <View style={styles.container}>
          <ScrollView style={styles.container} ref={ref => (this.scrollViewRef = ref)} contentContainerStyle={{ width: '97%', alignSelf: 'center' }}>
            <View>
              <TouchableHighlight style={{ marginLeft: '90%' }} onPress={() => { this.handleDelete() }}>
                <MaterialIcons name="delete" size={20} />
              </TouchableHighlight>
              {!!products.length && products.map((item, i) => {
                // console.log("items=========>", item.product.docData.allData.callBack)
                const price = item.product.docData.allData.price;
                const salePrice = item.product.docData.allData.salePrice
                total = total + shippingCost + parseInt((salePrice ? salePrice : price));
                withoutShipTotal = withoutShipTotal + parseInt((salePrice ? salePrice : price));
                //  console.log(total)
                AsyncStorage.setItem('total', total.toString())
                return (
                  <Card key={i}>
                    <CardItem>
                      <Image source={{ uri: item.product.docData.allData.callBack[0] }} style={{ width: 60, height: 50 }} />
                      <View style={{ marginLeft: 20 }}>
                        <Text>{item.product.docData.allData.allData.allData.data.title}</Text>
                      </View>
                      <Right>
                        <Text>Price</Text>
                        <Text>${salePrice ? salePrice : price}</Text>
                      </Right>
                    </CardItem>
                  </Card>
                  // <View style={styles.textWrapper} key={i}>
                  //   <Text style={styles.infoText}>
                  //     {item.product.docData.allData.allData.allData.data.title}
                  //   </Text>
                  //   <Text style={[styles.infoText, { marginLeft: 30 }]}>${salePrice ? salePrice : price}</Text>
                  // </View>
                )
              })}

              <Card style={{ flex: 0 }}>
                <CardItem style={{ borderBottomColor: 'grey', borderBottomWidth: 1 }}>
                  <Left>
                    <Body style={{ flexDirection: 'row' }}>
                      <Text style={{ fontSize: 18 }}>Shipping To</Text>
                      <Text style={{ fontWeight: 'bold', fontSize: 18 }}> {this.props.navigate.state.params.name}</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem>
                  <Body style={{ flexDirection: 'column', flex: 1 }}>
                    <View style={[styles.rowColumn, styles.extraText]}>
                      <Text style={styles.extraText}>Items ({products.length})</Text>
                      <Text>${withoutShipTotal}</Text>
                    </View>
                  </Body>
                </CardItem>
                <CardItem>
                  <Body style={{ flexDirection: 'column', flex: 1 }}>
                    <View style={[styles.rowColumn, styles.extraText]}>
                      <Text style={styles.extraText}>Shiping & Handling</Text>
                      <Text>${shippingCost * products.length}</Text>
                    </View>
                  </Body>
                </CardItem>
                <CardItem>
                  <Body style={{ flexDirection: 'column', flex: 1 }}>
                    <View style={[styles.rowColumn, styles.extraText]}>
                      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Order Total</Text>
                      <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#ce3910' }}>${total}</Text>
                    </View>
                  </Body>
                </CardItem>
              </Card>

              <Card style={{ flex: 0 }}>
                <CardItem>
                  <Left>
                    <Body>
                      <Text style={{ fontSize: 18 }}>Shipping Address</Text>
                      <Text note>{this.props.navigate.state.params.address},
                          {this.props.navigate.state.params.city},
                         {this.props.navigate.state.params.state}
                      </Text>
                    </Body>
                  </Left>
                </CardItem>
              </Card>
              {/* error card */}
              {!!this.props.interupt && <Card style={{ flex: 0 }}>
                <CardItem style={{ backgroundColor: 'rgba(255, 0, 0, 0.6)' }}>
                  <Left>
                    <Body>
                      <Text style={{ fontSize: 18, color: 'white' }}>Error: {this.props.errorCode}</Text>
                      <Text note style={{ color: 'white' }}>{this.props.errorMessage}</Text>
                    </Body>
                  </Left>
                </CardItem>
              </Card>
              }
              {/* <View style={styles.textWrapper}>
                <Text style={styles.infoText}>
                  Shipping Cost = ${shippingCost} X {products.length}
                </Text>
              </View>
              <View style={styles.textWrapper}>
                <Text style={styles.infoText}>
                  Total Price = ${total}
                </Text>
              </View>
              <View style={styles.textWrapper}>
                <Text style={styles.infoText}>
                  pay via card
            </Text>
              </View> */}

            </View>
            <View style={styles.cardFormWrapper}>
              <PaymentFormView {...this.props} />
            </View>
          </ScrollView>
          {/* Scrolls to the payment form */}
          <KeyboardSpacer
            onToggle={() => { setTimeout(() => this.scrollViewRef.scrollToEnd({ animated: true }), 0) }}
          />
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
          <Text>No products</Text>
          <TouchableHighlight>
            <Text> Go Back!</Text>
          </TouchableHighlight>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
  textWrapper: {
    margin: 10,
    flexDirection: 'row'
  },
  infoText: {
    fontSize: 18,
    textAlign: 'center',
  },
  cardFormWrapper: {
    padding: 10,
    margin: 10
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginLeft: 20,
    width: 40
  },
  extraText: {
    fontSize: 17
  },
  rowColumn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  }
});


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


export default connect(mapStateToProps, mapDispatchToProps)(AddSubscriptionView);