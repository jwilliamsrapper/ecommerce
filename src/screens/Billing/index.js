import React, { Component } from 'react';
import { View, KeyboardAvoidingView, TouchableOpacity, Platform,AsyncStorage } from 'react-native';
import { Container, Header, Text, Form, Item, Input, Label } from 'native-base';
import styles from './style'
import { saveBillingInfo } from '../../config/firebase/Database/SaveData' 

export default class index extends Component {
  constructor(){
    super();
    this.state={
      zipcode: '',
      city: '',
      address: '',
      state: ''
    }
  }
  
  componentDidMount(){
    // console.log(this.props.navigation.state.params.product)
  }
handleSubmit = async()=>{
  const {zipcode, city, address, state} = this.state
  console.log(zipcode, city, address, state);
  const billing = {
    zipcode,
    city,
    address,
    state
  }
  if(zipcode === '' && city === '' && address === '' && state === ''){
    alert("please fill all the fields")
  }else{
    const uid = await AsyncStorage.getItem("uid");
    console.log(uid)
    await saveBillingInfo(state,city,zipcode, address, uid);
    this.props.navigation.navigate("Confirmation")
  }
}

  render() {
    const {zipcode, city, address, state} = this.state
    return (
      <View>
      <KeyboardAvoidingView behavior="position"
        keyboardVerticalOffset={Platform.select({ ios: 60, android: 88 })}
      >
        <View style={{
          marginTop: 30,
          width: '90%',
          alignSelf: 'center'
        }}>
          <Form>
            <Item stackedLabel last>
              <Label>Address</Label>
              <Input onChangeText={(text) => this.setState({ address: text })} value={address}/>
            </Item>
            <Item stackedLabel last>
              <Label>City</Label>
              <Input onChangeText={(text) => this.setState({ city: text })} value={city}/>
            </Item>
            <Item stackedLabel last>
              <Label>State</Label>
              <Input onChangeText={(text) => this.setState({ state: text })} value={state}/>
            </Item>
            <Item stackedLabel last>
              <Label>Zipcode</Label>
              <Input onChangeText={(text) => this.setState({ zipcode: text })} value={zipcode}/>
            </Item>
          </Form>
         
        </View>
      </KeyboardAvoidingView>
        <TouchableOpacity
            onPress={this.handleSubmit}
            style={styles.signupButton}>
            <Text style={styles.textColor}>Next</Text>
          </TouchableOpacity>
      </View>
    );
  }
}