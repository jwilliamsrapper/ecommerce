import React, { Component } from 'react';
import { View, AsyncStorage, KeyboardAvoidingView, ActivityIndicator} from 'react-native'
import { getBillInfo,getShipingCost } from '../../config/firebase/Database/GetData'
import { Container, Header, Content, Form, Item, Input, Label, Button, Text } from 'native-base';

class index extends Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            data: '',
            city: '',
            state: '',
            zipcode: '',
            address: '',
            loading: true
        }
    }

    async componentDidMount() {
        const uid = await AsyncStorage.getItem("uid");
        const res = await getBillInfo(uid);
        this.setState({
            city: res.data.city,
            state: res.data.state,
            address: res.data.address,
            name: res.data.name,
            zipcode: res.data.zipcode,
            loading: false
        })
        const ship = await getShipingCost();
        console.log("ship" , ship)
        await AsyncStorage.setItem("shippingCost", ship.toString())
    }

    handleConfirm= ()=>{
        const { city, state,address,name, zipcode } = this.state;
        if(city === '' && state === '' && name === '' && address === '' && zipcode === ''){
            alert("all field required")
        }else{
            this.props.navigation.navigate("AddSubscription",{city, state, address, name, zipcode});
            
        }
    }
    render() {
        const { city, state,address,name, zipcode,loading } = this.state;
        return (
            <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={90}>
                      {!!loading && <ActivityIndicator size="large" color="#0000ff" />}
                {!loading && <Container>
                    <Content>
                        <Form>
                            <Item stackedLabel last>
                                <Label>Name</Label>
                                <Input
                                    onChangeText={(text) => this.setState({ name: text })}
                                    value={name}
                                />
                            </Item>
                            <Item stackedLabel last>
                                <Label>State</Label>
                                <Input
                                    onChangeText={(text) => this.setState({ state: text })}
                                    value={state}
                                />
                            </Item>
                            <Item stackedLabel last>
                                <Label>City</Label>
                                <Input
                                    onChangeText={(text) => this.setState({ city: text })}
                                    value={city}
                                />
                            </Item>
                            <Item stackedLabel last>
                                <Label>address</Label>
                                <Input
                                    onChangeText={(text) => this.setState({ address: text })}
                                    value={address}
                                />
                            </Item>
                            <Item stackedLabel last>
                                <Label>Zipcode</Label>
                                <Input
                                    onChangeText={(text) => this.setState({ zipcode: text })}
                                    value={zipcode}
                                />
                            </Item>
                            <Button onPress={this.handleConfirm}
                            style={{ marginTop: 20, alignSelf: 'center' }}>
                                <Text>Confirm!</Text>
                            </Button>
                        </Form>
                    </Content>
                </Container>}
            </KeyboardAvoidingView>
        );
    }
}

export default index