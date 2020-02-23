import React from 'react';
import { ScrollView, View, Text, Image, SafeAreaView, Alert } from 'react-native'
import Styles from './style'

export default class ProductBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    }
  }
  render() {

    return (
      <View style={Styles.container}>
       
       <Image
          style={Styles.box}
         
        />
        
        <View style={Styles.seprator}/>
        <Image
          style={Styles.box}
         
        />
      </View>
    )
  }
}