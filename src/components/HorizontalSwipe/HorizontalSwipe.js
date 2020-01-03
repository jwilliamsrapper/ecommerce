import React from 'react';
import { ScrollView, View, Text, Image, SafeAreaView, Alert } from 'react-native'
import Styles from './style'

export default class HorizontalSwipe extends React.Component {
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
          style={Styles.circular}
          source={{uri: this.props.iamge}}
        />
        <Text style={Styles.text}>{this.props.catText}</Text>
      </View>
    )
  }
}