import React from 'react';
import { ScrollView, View, TouchableOpacity, AsyncStorage, SafeAreaView, Dimensions, ActivityIndicator } from 'react-native'
import Styles from './style';
import Crousel from '../../components/crousel/crousel'
import { Text } from 'native-base'
import { checkAuth } from '../../config/firebase/Auth/signUpAuth'
import { Toast } from 'native-base'
import { connect } from 'react-redux';
import { addProduct } from '../../store/action';
import { bindActionCreators } from 'redux';
import { checkBillInfo, getDataAll } from '../../config/firebase/Database/GetData'
import { Ionicons } from '@expo/vector-icons';
import {Picker, Form } from "native-base";
import ModalDropdown from 'react-native-modal-dropdown';

const { width, height } = Dimensions.get('window')

class ProductPage extends React.Component {
  constructor() {
    super();
    this.state = {
      content: '',
      image: [],
      price: false,
      sale: false,
      color: false,
      quantity: false,
      size: false,
      weight: false,
      name: '',
      des: '',
      loading: false,
      allColors: [],
      allSizes: [],
      selectedColor: '',
      selectedSize: '',
    }
  }
  componentDidMount() {
    console.log('props', this.props.navigation.state.params.product.docData.allData.allData.OtherDetails.allSizes)
    this.setState({
      image: this.props.navigation.state.params.product.docData.allData.callBack,
      price: this.props.navigation.state.params.product.docData.allData.price,
      sale: this.props.navigation.state.params.product.docData.allData.salePrice,
      color: this.props.navigation.state.params.product.docData.allData.allData.OtherDetails.color,
      quantity: this.props.navigation.state.params.product.docData.allData.allData.OtherDetails.quantity,
      size: this.props.navigation.state.params.product.docData.allData.allData.OtherDetails.size,
      weight: this.props.navigation.state.params.product.docData.allData.allData.OtherDetails.weight,
      name: this.props.navigation.state.params.product.docData.allData.allData.allData.data.title,
      des: this.props.navigation.state.params.product.docData.allData.allData.allData.data.description,
      docId: this.props.navigation.state.params.product.docId,
      allColors: this.props.navigation.state.params.product.docData.allData.allData.OtherDetails.allColors,
      allSizes: this.props.navigation.state.params.product.docData.allData.allData.OtherDetails.allSizes,
      selectedColor: this.props.navigation.state.params.product.docData.allData.allData.OtherDetails.allColors && this.props.navigation.state.params.product.docData.allData.allData.OtherDetails.allColors.length && this.props.navigation.state.params.product.docData.allData.allData.OtherDetails.allColors[0],
      selectedSize:  this.props.navigation.state.params.product.docData.allData.allData.OtherDetails.allSizes && this.props.navigation.state.params.product.docData.allData.allData.OtherDetails.allSizes.length && this.props.navigation.state.params.product.docData.allData.allData.OtherDetails.allSizes[0]
    })
  }

  handlePress = async () => {
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
      this.props.navigation.state.params.product["selectedColor"] = this.state.selectedColor;
      this.props.navigation.state.params.product["slectedSize"] = this.state.selectedSize;
        this.props.addProduct({ product: this.props.navigation.state.params.product });
        const response = await checkBillInfo(uid);
        console.log(response)
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

  componentWillUnmount() {
    this.setState({ loading: false })
    // console.log(this.state.name)
  }

  handleAddToCart = () => {
    this.props.navigation.state.params.product["selectedColor"] = this.state.selectedColor;
    this.props.navigation.state.params.product["slectedSize"] = this.state.selectedSize;
    this.props.addProduct({ product: this.props.navigation.state.params.product })
    Toast.show({
      text: this.state.name + " added to the cart",
      buttonText: "Okay",
      duration: 4000,
      position: "top",
      style: {
        backgroundColor: 'gold',
        fontSize: 16
      }
    })
    this.props.navigation.goBack();
  }

  render() {
  
    const { image, price, sale, color, loading, size, weight, name, des, allSizes, allColors,selectedColor } = this.state;
  
    // console.log(allSizes[0])
    if (loading) {
      return (
        <ActivityIndicator size="large" color="black" style={{ marginTop: '50%' }} />
      )
    } else {


      return (
        <SafeAreaView style={Styles.container}>
          {/* swipeable top list */}
          <ScrollView style={Styles.container}>
            {/* images of product */}
            <Ionicons
              onPress={() => { this.props.navigation.goBack() }}
              size={40}
              style={{ marginTop: '8%', position: 'absolute', zIndex: 111, marginLeft: 15 }} name="ios-arrow-back" />
            <Crousel
              product={image}
              bannerHeight={height / 1.65}
            />

            {/* Price */}

            <View style={Styles.priceContainer}>
              <Text style={Styles.Price}>${sale ? sale : price}</Text>
              <Text style={Styles.originalPrice}>{sale ? price : null}</Text>
            </View>

            {/* name */}

            <Text style={Styles.Name}>{name}</Text>

            <View style={{
              flexDirection: 'row',
              padding: 20,
              justifyContent: 'space-around',
              borderBottomColor: 'rgba(0, 0, 0, 0.2)',
              borderBottomWidth: 1
            }}>
              <View>
                <Text style={Styles.other}>Color</Text>
                <View style={{ flexDirection: 'row' }}>
                <Form>
                  {!!allColors && !!allColors.length ? 
                   <ModalDropdown 
                   options={allColors}
                   defaultIndex={0}
                   defaultValue={allColors[0]}
                   style={{ height:30, width:  100, }}
                  //  textStyle	={{fontSize: 13, alignSelf: 'center', marginTop: 10}}
                   dropdownStyle	={{width: 80}}
                   onSelect={(itemValue, itemIndex) => {
                     this.setState({selectedColor: itemIndex})
                   }}
                   >
                     <View style={{flexDirection: 'row', alignContent: 'center', justifyContent:'space-around'}}>
                     <Text>{selectedColor}</Text>
                     <Ionicons name="ios-arrow-dropdown" size={22}/>
                     </View>
                   </ModalDropdown>
                  // <Picker
                  // note
                  //   selectedValue={this.state.selectedColor}
                  //   style={{ height: 50, width: 120 }}
                  //   onValueChange={(itemValue, itemIndex) =>
                  //     this.setState({ selectedColor: itemValue })
                  //   }>
                  //   {allColors.map((e, i) => {
                  //     return <Picker.Item label={e} value={e} key={i * Math.random() * 23} />
                  //   })}
                  // </Picker>
                   : !!color ? <Text>{color}</Text> : <Text>N/A</Text>
                  }
                   </Form>
                </View>
              </View>
            </View>

            {/* second container */}


            <View style={{
              flexDirection: 'row',
              padding: 20,
              justifyContent: 'space-around',
              borderBottomColor: 'rgba(0, 0, 0, 0.2)',
              borderBottomWidth: 1
            }}>
              <View>
                <Text style={Styles.other}>Size</Text>
                <View style={{ flexDirection: 'row' }}
                >
                   <Form>
                  {!!allSizes && !!allSizes.length ? 
                     <ModalDropdown 
                     options={allSizes}
                     defaultIndex={0}
                     defaultValue={allSizes[0]}
                     style={{ height:30, width:  100, }}
                    //  textStyle	={{fontSize: 13, alignSelf: 'center', marginTop: 10}}
                     dropdownStyle	={{width: 80}}
                     onSelect={(itemValue, itemIndex) => {
                       this.setState({selectedSize: itemIndex})
                     }}
                     >
                       <View style={{flexDirection: 'row', alignContent: 'center', justifyContent:'space-around'}}>
                       <Text>{this.state.selectedSize}</Text>
                       <Ionicons name="ios-arrow-dropdown" size={22}/>
                       </View>
                     </ModalDropdown>
                  // <Picker
                  //   note
                  //   selectedValue={this.state.selectedSize}
                  //   style={{ height: 50, width: 120 }}
                  //   onValueChange={(itemValue, itemIndex) =>
                  //     this.setState({ selectedSize: itemValue })
                  //   }>
                  //   {allSizes.map((e, i) => {
                  //     return <Picker.Item label={e} value={e} key={i * Math.random()} />
                  //   })}
                  // </Picker> 
                  : !!size ? <Text>{size}</Text> : <Text>N/A</Text>
                  }
                  </Form>
                </View>
              </View>
              <View>
                <Text style={Styles.other}>Weigth</Text>
                <Text>{weight ? weight : 'N/A'}</Text>
              </View>
            </View>

            {/* <View style={{
              flexDirection: 'row',
              padding: 20,
              justifyContent: 'space-around',
              borderBottomColor: 'rgba(0, 0, 0, 0.2)',
              borderBottomWidth: 1
            }}>
              <View>
                <Text style={Styles.other}>size</Text>
                <Text>{size ? size : 'N/A'}</Text>
              </View>
              <View>
                <Text style={Styles.other}>Color</Text>
                <Text>{color ? color : 'N/A'}</Text>
              </View>
              <View>
                <Text style={Styles.other}>Weigth</Text>
                <Text>{weight ? weight : 'N/A'}</Text>
              </View>
            </View> */}


            <View style={{ paddingHorizontal: 4 }}>
              <Text>{des}</Text>
            </View>
          </ScrollView>
          <View
            style={{ flexDirection: 'row' }}
          >
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignContent: 'center',
                alignSelf: 'center',
                backgroundColor: 'black',
                width: '50%',
                height: 50,
                alignItems: 'center',
                borderRightColor: 'white',
                borderRightWidth: 4
              }}
              onPress={this.handlePress}
            >
              <Text
                style={{
                  fontSize: 22,
                  color: 'white'
                }}
              >Buy Now</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.handleAddToCart}
              style={{
                justifyContent: 'center',
                alignContent: 'center',
                alignSelf: 'center',
                backgroundColor: 'black',
                width: '50%',
                height: 50,
                alignItems: 'center',
                borderLeftColor: 'white',
                borderLeftWidth: 4
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  color: 'white'
                }}
              >Add to cart</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      )
    }
  }
}


const mapDispatchToProps = dispatch => (
  bindActionCreators({
    addProduct,
  }, dispatch)
);

export default connect(null, mapDispatchToProps)(ProductPage);