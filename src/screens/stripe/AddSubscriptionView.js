import React from 'react';
import { StyleSheet, Text, View, ScrollView, AsyncStorage } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import PaymentFormView from './PaymentView';
import { Header } from 'native-base'
import { TextInput, TouchableHighlight } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import { deleteProduct } from '../../store/action'
import { bindActionCreators } from 'redux';

/**
 * The class renders a view with PaymentFormView
 */
let totals = 0;
class AddSubscriptionView extends React.Component {
  constructor() {
    super()
    this.state = {
      total: 0,
      product: ''
    }
  }

  componentDidMount() {
    // console.log("navigate====", this.props)
    // console.log('naiviafsdpfmpsdomp',this.props.navigate.actions.navigate)
   
      this.props.sendData(this.props.products.current);
  

  }

  handleDelete = () => {
    // console.log(i)
    this.props.deleteProduct();
    // navigation.navigate("Home")
    this.props.navigate.actions.goBack()
    this.forceUpdate()

  }
  render() {
    var total = 0;
    // console.log('props ===========> ', this.props.products.current)
    const products = this.props.products.current
    const totalPrice = total * 100;
    //  AsyncStorage.setItem("total", totalPrice.toString());
    if (products) {
      return (
        <View style={styles.container}>
          <ScrollView style={styles.container} ref={ref => (this.scrollViewRef = ref)}>
            <TouchableHighlight style={{ marginLeft: '90%' }} onPress={() => { this.handleDelete() }}>
              <MaterialIcons name="delete" size={20} />
            </TouchableHighlight>
            {!!products.length && products.map((item, i) => {
              // console.log("items=========>", item.product.docData.allData.price)
              const price = item.product.docData.allData.price;
              const salePrice = item.product.docData.allData.salePrice
              total = total + parseInt((salePrice ? salePrice : price));

              //  console.log(total)
              AsyncStorage.setItem('total', total.toString())
              return (
                <View style={styles.textWrapper} key={i}>
                  <Text style={styles.infoText}>
                    {item.product.docData.allData.allData.allData.data.title}
                  </Text>
                  <Text style={[styles.infoText, { marginLeft: 30 }]}>${salePrice ? salePrice : price}</Text>
                </View>
              )
            })}

            <View style={styles.textWrapper}>
              <Text style={styles.infoText}>
                Total Price = ${total}
              </Text>
            </View>
            <View style={styles.textWrapper}>
              <Text style={styles.infoText}>
                pay via card
            </Text>
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
    flex: 1
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