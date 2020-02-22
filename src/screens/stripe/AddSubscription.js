import React from 'react';
import { AsyncStorage,ActivityIndicator } from 'react-native'
import AddSubscriptionView from './AddSubscriptionView';
import { saveOrderInfo } from '../../config/firebase/Database/SaveData'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteProduct } from '../../store/action'

const STRIPE_ERROR = 'Payment service error. Try again later.';
const SERVER_ERROR = 'Server error. Try again later.';
const STRIPE_PUBLISHABLE_KEY = 'pk_live_nOI5hkhG6FFzjhRiC88zLwQb00jLCgaPzf';
/**
 * The method sends HTTP requests to the Stripe API.
 * It's necessary to manually send the payment data
 * to Stripe because using Stripe Elements in React 
 * Native apps isn't possible.
 *
 * @param creditCardData the credit card data
 * @return Promise with the Stripe data
 */

let total = 0;
(async () => {
  total = await AsyncStorage.getItem("total");
})()

const getCreditCardToken = (creditCardData) => {
  const card = {
    'card[number]': creditCardData.values.number.replace(/ /g, ''),
    'card[exp_month]': creditCardData.values.expiry.split('/')[0],
    'card[exp_year]': creditCardData.values.expiry.split('/')[1],
    'card[cvc]': creditCardData.values.cvc
  }; return fetch('https://api.stripe.com/v1/tokens', {
    headers: {
      // Use the correct MIME type for your server
      Accept: 'application/json',
      // Use the correct Content Type to send data to Stripe
      'Content-Type': 'application/x-www-form-urlencoded',
      // Use the Stripe publishable key as Bearer
      Authorization: `Bearer ${STRIPE_PUBLISHABLE_KEY}`
    },
    // Use a proper HTTP method
    method: 'post',
    // Format the credit card data to a string of key-value pairs
    // divided by &
    body: Object.keys(card)
      .map(key => key + '=' + card[key])
      .join('&')
  }).then(response => response.json());
};/**
 * The method imitates a request to our server.
 *
 * @param creditCardToken
 * @return {Promise<Response>}
 */
const subscribeUser = async (creditCardToken, all, that,shippingCost, there) => {
  try{

  
  console.log("initiating stripe request")
  return new Promise(async (resolve) => {
    console.log("making request")
    console.log('Credit card token\n', creditCardToken.id);
    fetch('https://shrouded-island-13989.herokuapp.com/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: parseInt(total) * 100,
        currency: "usd",
        token: creditCardToken.id
      }),
    })
    // .then(async(response) => {console.log(await response.json())})
    .then(async (response) => response.json())
    .then(async (responseJson) => {
      console.log("response")
      console.log(responseJson);
      if (responseJson.paid === true) {
          const uid = await AsyncStorage.getItem("uid");
          for(let i =0; i<all.productInfo.length; i++){
            await saveOrderInfo(
              uid, 
              all.billingDetails,
              all.productInfo[i].productId, 
              all.productInfo[i].storeId,
              all.productInfo[i].salePrice,
              all.productInfo[i].price,
              shippingCost,
              all.productInfo[i].selectedColor,
              all.productInfo[i].selectedSize
              ).then(()=>{
              that.navigation.navigate("Home");
              alert("order placed");
              that.deleteProduct();
            })
          }
        } else {
          there.setState({
            interupt: true,
            loading: false,
            errorCode: responseJson.code,
            errorMessage: responseJson.raw.message
          })
          alert("Failed ")
        }
        resolve(responseJson)
      })
      .catch((error) => {
        console.error(error);
      });;

  });
}catch(e){
  alert("Something went wrong!")
}
};/**
 * The main class that submits the credit card data and
 * handles the response from Stripe.
 */
class AddSubscription extends React.Component {
  static navigationOptions = {
    title: 'Subscription page',
  };
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      error: null,
      totals: 0,
      all: {},
      loading: false,
      shippingCost: 0,
      interupt: false,
      errorCode: '',
      errorMessage: '',
    }
  }

  async componentDidMount() {
    const totals = await AsyncStorage.getItem("total");
    console.log(totals)
    this.setState({
      totals
    })
    const ship = await AsyncStorage.getItem("shippingCost")
    const shippingCost  = parseInt(ship);
    this.setState({
      shippingCost
    })
    // console.log(this.props)
    // const billingDetails = this.props.navigation.state.params
  }

  getData = (val) => {
    const storeId = [];
    const productInfo = [];
    let productId;
    // console.log("vall===-=.", val)
    for (let i = 0; i < val.length; i++) {
      // console.log('val==========> x', val[i].product.slectedSize);
      productId =
      productInfo.push({
        productId:  val[i].product.docId,
        storeId: val[i].product.docData.uid,
        salePrice: val[i].product.docData.allData.salePrice,
        price: val[i].product.docData.allData.price,
        selectedColor: val[i].product.selectedColor ? val[i].product.selectedColor : '',
        selectedSize: val[i].product.slectedSize ? val[i].product.slectedSize : '',
      })
    }
    const billingDetails = this.props.navigation.state.params
    const all = { productInfo, billingDetails };
    this.setState({all})
  }
  // Handles submitting the payment request
  onSubmit = async (creditCardInput) => {
    console.log("main func started")
    this.setState({loading: true})
    const {shippingCost} = this.state;
    const { navigation } = this.props;
    const { all } = this.state;
    // Disable the Submit button after the request is sent
    this.setState({ submitted: true });
    let creditCardToken; try {
      // Create a credit card token
      creditCardToken = await getCreditCardToken(creditCardInput);
      if (creditCardToken.error) {
        // Reset the state if Stripe responds with an error
        // Set submitted to false to let the user subscribe again
        this.setState({ submitted: false, error: STRIPE_ERROR, loading: false });
        console.log("error is card ", creditCardToken.error.code)
        this.setState({errorCode: creditCardToken.error.code, errorMessage: creditCardToken.error.message })
        return;
      }
    } catch (e) {
      // Reset the state if the request was sent with an error
      // Set submitted to false to let the user subscribe again
      this.setState({ submitted: false, error: STRIPE_ERROR });
      console.log('error in catch', e)
      return;
    }    // Send a request to your server with the received credit card token
    let that = this.props
    let there = this;
    const { error } = await subscribeUser(creditCardToken, all, that,shippingCost, there);
    // Handle any errors from your server
    if (error) {
      this.setState({ submitted: false, error: SERVER_ERROR });
    } else {
      this.setState({ submitted: false, error: null });
      // navigation.navigate('Home')
    }
  };

  // render the subscription view component and pass the props to it
  render() {
    const { submitted, error, loading,errorMessage, errorCode, interupt } = this.state;
    if(!loading){
      return (
        <AddSubscriptionView
        error={error}
        submitted={submitted}
        onSubmit={this.onSubmit}
        navigate={this.props.navigation}
        sendData={this.getData}
        interupt={interupt}
        errorMessage={errorMessage}
        errorCode={errorCode}
        />
        );
      }else{
        return(
          <ActivityIndicator size="large" color="#0000ff" style={{marginTop: '20%'}}/>
        )
      }
  }
}



const mapDispatchToProps = dispatch => (
  bindActionCreators({
    deleteProduct,
  }, dispatch)
);

export default connect(null, mapDispatchToProps)(AddSubscription);