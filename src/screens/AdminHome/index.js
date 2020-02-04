import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, SafeAreaView, Alert, AsyncStorage } from 'react-native'
import Styles from './style'
import { MaterialIcons } from '@expo/vector-icons';
import { getOrdersAdmin, getDataForAdminProduct } from '../../config/firebase/Database/GetData'
import AccountListImage from '../../components/AccountList/AccountListImage'
import { NavigationEvents } from "react-navigation";

export default class AdminHome extends React.Component {
  constructor() {
    super();
    this.state = {
      content: '',
      orders: []
    }
  }

  async componentDidMount() {
    const uid = await AsyncStorage.getItem("uid")
    if (!uid) {
      this.props.navigation.navigate("App")
    }
    const allOrders = [];
    let ship = 0;
    let tPrice = 0;
    // console.log("mouted", uid);
    await getOrdersAdmin(uid).then(async (res) => {
      //  console.log(res[0].docId)

      // this.setState({ orders: res })
      for (let i = 0; i < res.length; i++) {
        const response = await getDataForAdminProduct(res[i].docData.productId);
        // console.log("=====================>", res[i].docData.salePrice  );
         tPrice = parseInt((res[i].docData.salePrice === "" ? res[i].docData.price : res[i].docData.salePrice)) + tPrice;
        // console.log(tPrice)
        for (let k = 0; k < response.length; k++) {
          allOrders.push({
            data: res[i].docData,
            title: response[k].docData.allData.allData.allData.data.title,
            image: response[k].docData.allData.callBack[0],
            docId: res[i].docId
          })
        }
            if(res[i].docData.status === "shiped"){
              ship = ship + i;
            }

      }
      this.setState({ orders: allOrders, ship, tPrice })
    });
  }

  render() {
    const { orders,ship, tPrice } = this.state;
    // console.log("AdminHome", orders)
    return (

      <ScrollView style={Styles.container}>
        <NavigationEvents
          onWillFocus={() => {
            this.componentDidMount()
          }}
        />

        <View style={Styles.top}>
          <Text style={Styles.orderTitleText}>Orders</Text>
        </View>
        {/* upper tow boxes */}
        {/* <View style={Styles.mainBox}>
          <TouchableOpacity style={[Styles.BoxContainer, { backgroundColor: '#5AEDD9' }]} onPress={() => { this.props.navigation.navigate("AddProduct") }}>
            
            <View style={{ textAlign: 'center' }}>
              <Text style={Styles.textAddBtn}>New Orders</Text>
              <Text style={Styles.textAddBtn}>{ship*1+1}</Text>
            </View>
          </TouchableOpacity>
          <View style={Styles.VerticalDivider} />
          <TouchableOpacity style={[Styles.BoxContainer, { backgroundColor: '#5AEDD9' }]} onPress={() => { this.props.navigation.navigate("AddProduct") }}>
          
            <View style={{ textAlign: 'center' }}>
              <Text style={Styles.textAddBtn}>All orders</Text>
              <Text style={Styles.textAddBtn}>{orders.length}</Text>
            </View>
          </TouchableOpacity>
          <View style={Styles.VerticalDivider} />
        </View> */}
        {/* down */}
        <View style={[Styles.mainBox, { flexDirection: 'column', marginLeft: 6, }]}>
          
          <View style={Styles.VerticalDivider} />
          <TouchableOpacity style={[Styles.BoxContainer, { width: '100%', height: 50, }]} onPress={() => { this.props.navigation.navigate("AddProduct") }}>
            <View style={{ textAlign: 'center' }}>
              <Text style={Styles.textAddBtn}>Total sales</Text>
              <Text style={Styles.textAddBtn}>${tPrice}</Text>
            </View>
          </TouchableOpacity>
          <View style={Styles.VerticalDivider} />
        </View>
       {!orders.length && <View style={Styles.top}>
          <Text style={[Styles.orderTitleText, {fontSize: 16}]}>No order yet.</Text>
        </View>}
        <View>
          {!!orders.length && orders.map((item, i) => {
            // console.log(moment().minutes(item.data.createdAt.seconds))
            var t = new Date(1970, 0, 1); // Epoch
            t.setSeconds(item.data.createdAt.seconds);
            console.log(t);
            // console.log(new Date().toString())
            return (
              <TouchableOpacity
                key={i}
                style={Styles.catList}
                onPress={() => { this.props.navigation.navigate("ProductDetailsAdmin", { item: item, time: t.toString() }) }}
              >
                <AccountListImage
                  icon={true}
                  title={item.title}
                  src={{ uri: item.image }}
                  subTitle={"Price $" + item.data.price + "\n" + "sale Price $" + item.data.salePrice}
                />
                <Text style={{ marginTop: 10, marginLeft: 5 }}>Date: {t.toString()}</Text>
                <Text style={{ marginTop: 10, marginLeft: 5 }}>Status: {item.data.status}</Text>
              </TouchableOpacity>
            )
          })}
        </View>
      </ScrollView>

    )
  }
}
