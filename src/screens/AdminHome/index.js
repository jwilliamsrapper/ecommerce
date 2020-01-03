import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, SafeAreaView, Alert } from 'react-native'
import Styles from './style'
import { MaterialIcons } from '@expo/vector-icons';

export default class AdminHome extends React.Component {
  constructor() {
    super();
    this.state = {
      content: ''
    }
  }
  render() {

    return (

      <ScrollView style={Styles.container}>
        <View style={Styles.top}>
          <Text style={Styles.orderTitleText}>Orders</Text>
        </View>
        {/* upper tow boxes */}
        <View style={Styles.mainBox}>
          <TouchableOpacity style={[Styles.BoxContainer,  { backgroundColor: '#5AEDD9' }]} onPress={() => { this.props.navigation.navigate("AddProduct") }}>
            {/* <MaterialIcons name="add-box" size={40} color="white" /> */}
            <View style={{ textAlign: 'center' }}>
              <Text style={Styles.textAddBtn}>New Orders</Text>
            </View>
          </TouchableOpacity>
          <View style={Styles.VerticalDivider} />
          <TouchableOpacity style={[Styles.BoxContainer, { backgroundColor: '#5AEDD9' }]} onPress={() => { this.props.navigation.navigate("AddProduct") }}>
            {/* <MaterialIcons name="add-box" size={40} color="white" /> */}
            <View style={{ textAlign: 'center' }}>
              <Text style={Styles.textAddBtn}>All orders</Text>
            </View>
          </TouchableOpacity>
          <View style={Styles.VerticalDivider} />
        </View>
        {/* down */}
        <View style={[Styles.mainBox, { flexDirection: 'column', marginLeft: 6, }]}>
          <TouchableOpacity style={[Styles.BoxContainer, { width: '100%', height: 100 }]} onPress={() => { this.props.navigation.navigate("AddProduct") }}>
            <View style={{ textAlign: 'center' }}>
              <Text style={Styles.textAddBtn}>Total Orders</Text>
            </View>
          </TouchableOpacity>
          <View style={Styles.VerticalDivider} />
          <TouchableOpacity style={[Styles.BoxContainer, { width: '100%', height: 100, }]} onPress={() => { this.props.navigation.navigate("AddProduct") }}>
            <View style={{ textAlign: 'center' }}>
              <Text style={Styles.textAddBtn}>Total sales</Text>
            </View>
          </TouchableOpacity>
          <View style={Styles.VerticalDivider} />
        </View>

      </ScrollView>

    )
  }
}
