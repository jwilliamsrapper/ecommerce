import React from 'react';
import { AsyncStorage, View, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import { Container, Header, Content, Card, CardItem, Body, Text } from 'native-base';
import { getOrders, getDataForAdminProduct } from '../../config/firebase/Database/GetData';
import { NavigationEvents } from "react-navigation";
import AccountListImage from '../../components/AccountList/AccountListImage'

export default class Orders extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      isLogin: false,
      orders: []
    }
  }

  async componentDidMount() {
    const allOrders = [];
    const uid = await AsyncStorage.getItem("uid");
    if (!uid) {
      this.setState({ isLogin: false, loading: true })
    } else {
      this.setState({ isLogin: true })
      await getOrders(uid).then(async (res) => {
        for (let i = 0; i < res.length; i++) {
          const response = await getDataForAdminProduct(res[i].docData.productId);
          for (let k = 0; k < response.length; k++) {
            console.log('ress', response);
            allOrders.push({
              data: res[i].docData,
              title: response[k].docData.allData.allData.allData.data.title,
              image: response[k].docData.allData.callBack[0],
              docId: res[i].docId
            })
          }

        }
        // console.log(allOrders)
        if (allOrders.length) {
          this.setState({ orders: allOrders, loading: true });
        }
        // if (res) {
        //   this.setState({ data: res })
        //   this.setState({ loading: true })
        // }
        else {
          this.setState({ isLogin: false, loading: true })
        }
      })
    }
  }

  render() {
    const { isLogin, loading, orders } = this.state;
    // console.log(data)
    console.log('isLogin,', isLogin, "loading", loading)
    return (

      <Container>

        <NavigationEvents
          onWillFocus={() => {
            this.setState({ content: [] })
            this.componentDidMount()
          }}
        />

        {!!isLogin && <Text style={{ justifyContent: 'center', alignSelf: 'center' }}>Your Orders</Text>}
        {!isLogin && !loading && <ActivityIndicator size="large" color="black" style={{ marginTop: '10%' }} />}
        {!isLogin && !!loading && <Text style={{ alignSelf: 'center', fontSize: 20, justifyContent: 'center', marginTop: 30 }}>No orders</Text>}
        {!!isLogin && !!loading && <Content>



          <View>
          {!!orders.length && orders.map((item, i) => {
            // console.log(moment().minutes(item.data.createdAt.seconds))
            var t = new Date(1970, 0, 1); // Epoch
            t.setSeconds(item.data.createdAt.seconds);
            console.log(t);
            console.log(item.data)
            return (
              <TouchableOpacity
                key={i}
                style={{ width: '100%',
                flex: 1,
                // height: 350,
                marginTop: 25,
                borderBottomWidth: 1,
                borderBottomColor: 'grey',
                paddingRight: 20}}
                onPress={() => { this.props.navigation.navigate("", { item: item, time: t.toString() }) }}
              >
                <AccountListImage
                  icon={true}
                  title={item.title}
                  src={{ uri: item.image }}
                  subTitle={"Price $" + item.data.price + "\n" + "sale Price $" + item.data.salePrice}
                />
                <Text style={{ marginTop: 10, marginLeft: 5 }}>Date: {t.toString()}</Text>
                <Text style={{ marginTop: 10, marginLeft: 5 }}>Status: {item.data.status ? item.data.status : " Pending"}</Text>
              </TouchableOpacity>
            )
          })}
        </View>

          {/* {!!data.length && data.map((e, i) => {
            console.log("=====> ", e.docData.order.length)
            console.log("-=-=-=-=-=?> ", e.docData.order)
            return (
              <Card key={i}>
                <CardItem>
                  <Body>
                    {e.docData.order.map((e, i) => {
                      console.log('===>', e)
                      return (
                        <View key={i}>
                          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                            <Text>{e.title}</Text>
                          </View>
                          <View style={{ flexDirection: 'row' }}>
                            <Text>Price: </Text>
                            <Text style={{ marginLeft: 3 }}>${e.salePrice ? e.salePrice : e.price}</Text>
                          </View>
                        </View>
                      )
                    })}
                    <View style={{ flexDirection: 'row', paddingTop: 5 }}>
                      <Text style={{color: 'blue'}}>Status:</Text>
                      <Text style={{ marginLeft: 10, color: 'blue' }}>Pending</Text>
                    </View>
                  </Body>
                </CardItem>
              </Card>
            )
          })
          } */}
        </Content>}
      </Container>

    )
  }
}