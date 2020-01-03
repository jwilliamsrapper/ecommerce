import React from 'react';
import { AsyncStorage, View, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import { Container, Header, Content, Card, CardItem, Body, Text } from 'native-base';
import { getOrders } from '../../config/firebase/Database/GetData';
import { NavigationEvents } from "react-navigation";

export default class Orders extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      isLogin: false,
      data: []
    }
  }

  async componentDidMount() {
    const uid = await AsyncStorage.getItem("uid");
    if (!uid) {
      this.setState({ isLogin: false, loading: true })
    } else {
      this.setState({ isLogin: true })
      await getOrders(uid).then((res) => {
        // console.log(res);
        if (res) {
          this.setState({ data: res })
          this.setState({ loading: true })
        } else {
          this.setState({ isLogin: false, loading: true })
        }
      })
    }
  }

  render() {
    const { isLogin, loading, data } = this.state;
    // console.log(data)
    console.log('isLogin,', isLogin , "loading", loading)
    return (

      <Container>

        <NavigationEvents
          onWillFocus={() => {
            this.setState({ content: [] })
            this.componentDidMount()
          }}
        />

        {!!isLogin && <Text style={{ justifyContent: 'center', alignSelf: 'center' }}>Your Orders</Text>}
        {!isLogin && !loading&& <ActivityIndicator size="large" color="black" style={{ marginTop: '10%' }} />}
        {!isLogin && !!loading && <Text style={{  alignSelf: 'center', fontSize: 20,justifyContent: 'center', marginTop: 30 }}>No orders</Text>}
        {!!isLogin && !!loading && <Content>
          {!!data.length && data.map((e, i) => {
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
          }
        </Content>}
      </Container>

    )
  }
}