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
      loading: false
    }
  }
  componentDidMount() {
      console.log('props',this.props.navigation.state.params.product.docId)
    this.setState({
      image: this.props.navigation.state.params.product.docData.allData.callBack,
      price: this.props.navigation.state.params.product.docData.allData.price,
      sale: this.props.navigation.state.params.product.docData.allData.salePrice,
      color: this.props.navigation.state.params.product.docData.allData.allData.OtherDetails.color,
      quantity: this.props.navigation.state.params.product.docData.allData.allData.OtherDetails.quantity,
      size: this.props.navigation.state.params.product.docData.allData.allData.OtherDetails.size,
      weight: this.props.navigation.state.params.product.docData.allData.allData.OtherDetails.weight,
      name: this.props.navigation.state.params.product.docData.allData.allData.allData.data.catData.text,
      des: this.props.navigation.state.params.product.docData.allData.allData.allData.data.description,
      docId: this.props.navigation.state.params.product.docId,
    })
  }

  handlePress = async() => {
    this.setState({loading: true})
    const uid = await AsyncStorage.getItem("uid");
    // this.props.navigation.navigate("AddSubscription");
    checkAuth().then(async(res)=>{
      if(res === false){
        // console.log(res)
        Toast.show({
          text: 'You need to Login first!',
          buttonText: 'Okay',
          position: "bottom",
          duration: 5000

        })
        this.props.navigation.navigate("Login")
      }else{
        this.props.addProduct({product: this.props.navigation.state.params.product});
       const response = await checkBillInfo(uid);
        console.log(response)
        if(response === true){
          this.props.navigation.navigate("Confirmation");
          this.setState({loading: false})
        }else{
          this.props.navigation.navigate("Billing")
        }
        // this.props.navigation.navigate("Billing", 
        // {product: this.props.navigation.state.params.product});
      }
    })

  }

  componentWillUnmount(){
    this.setState({loading: false})
  }

  render() {
    const { image,price, sale, color, loading,size,weight, name,des } = this.state;
    // console.log(image[0])
    if(loading){
      return(
        <ActivityIndicator size="large" color="black" style={{marginTop: '50%'}} />
      )
    }else{

    
    return (
      <SafeAreaView style={Styles.container}>
        {/* swipeable top list */}
        <ScrollView style={Styles.container}>
        {/* images of product */}
        <Ionicons
        onPress={()=>{this.props.navigation.goBack()}}
        size={40}
         style={{marginTop: '8%', position: 'absolute', zIndex: 111, marginLeft: 15}} name="ios-arrow-back" />
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
          <Text style={Styles.other}>size</Text>
          <Text>{size ? size: 'N/A'}</Text>
          </View>
          <View>
          <Text style={Styles.other}>Color</Text>
          <Text>{color ? color: 'N/A'}</Text>
          </View>
          <View>
          <Text style={Styles.other}>Weigth</Text>
          <Text>{weight ? weight : 'N/A'}</Text>
          </View>
        </View>
        
        <View style={{paddingHorizontal: 4}}>
          <Text>{des}</Text>
        </View>
        </ScrollView>
        <TouchableOpacity
                    style={{
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignSelf: 'center',
                        backgroundColor: 'black',
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
                    >Buy Now</Text>
                </TouchableOpacity>
      </SafeAreaView>
    )
  }}
}


const mapDispatchToProps = dispatch => (
  bindActionCreators({
    addProduct,
  }, dispatch)
);

export default connect(null, mapDispatchToProps)(ProductPage);