import React from 'react';
import { ScrollView, View, Text, Image, SafeAreaView, Alert } from 'react-native'
import Styles from './style'

export default class HomeBanner extends React.Component {
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
          style={Styles.image}
          source={require('../../../assets/banner.png')}
        />
        <Text style={Styles.text}>{this.props.catText}</Text>
      </View>
    )
  }
}