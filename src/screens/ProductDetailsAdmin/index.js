import React, { Component } from 'react';
import { Container, Form, Item, Input, CardItem, Content, Card, Spinner, Button, Left, Right, Body, Icon, Text } from 'native-base';
import { StyleSheet, FlatList, View, Image, ActivityIndicator, Alert } from 'react-native';
import { changeStatus } from '../../config/firebase/Database/SaveData'
import { deleteData } from '../../config/firebase/Database/DeleteData'

export default class ProductDetailsAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: []
        }
    }

    componentDidMount() {
        // console.log(this.props.navigation.state.params.item)
        this.setState({ data: this.props.navigation.state.params.item })
    }

    handelPress = (e, k) => {
        console.log(e)
        Alert.alert(
            'Cancel Order',
            'Are You Sure?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'Delete', onPress: () => this.handleDelete(e, k) },
            ],
            { cancelable: false },
        );
        // this.props.navigation.navigate("Booking", { bookId: e });
    }

    handleDelete = async (e) => {
        this.setState({ loading: true })
        await deleteData("orders", e);
        this.props.navigation.goBack();
    }

    handleShip = async (e) => {
        if (e) {
            changeStatus(e);
            this.props.navigation.goBack();
        } else {
            alert("something went wrong please try again later")
        }

    }

    render() {
        const { data, loading } = this.state;
        console.log(data.data && data.data.selectedColor)

        return (

            <Container style={{ flex: 1, }}>


                <Content>
                    <Card style={{ flex: 1 }}>
                        <CardItem style={{ flex: 1 }}>
                        </CardItem>
                        <CardItem style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'column', flex: 1 }}>
                                <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', }}>
                                    <Text style={{ fontSize: 20, alignContent: 'center', alignItems: 'center' }}>Name</Text>
                                    <Text style={{ fontSize: 20, alignContent: 'center', alignItems: 'center', color: '#11283F' }}>{data.title}</Text>
                                </View>
                            </View>
                        </CardItem>

                        <CardItem style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'column', flex: 1 }}>
                                <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', }}>
                                    <Text style={{ fontSize: 20, alignContent: 'center', alignItems: 'center' }}>Price</Text>
                                    <Text style={{ fontSize: 20, alignContent: 'center', alignItems: 'center', color: '#11283F' }}>{data.data && data.data.price}</Text>
                                </View>
                            </View>
                        </CardItem>
                        
                        <CardItem style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'column', flex: 1 }}>
                                <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', }}>
                                    <Text style={{ fontSize: 20, alignContent: 'center', alignItems: 'center' }}>Color</Text>
                                    <Text style={{ fontSize: 20, alignContent: 'center', alignItems: 'center', color: '#11283F' }}>{data.data && data.data.selectedColor}</Text>
                                </View>
                            </View>
                        </CardItem>
                        
                        <CardItem style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'column', flex: 1 }}>
                                <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', }}>
                                    <Text style={{ fontSize: 20, alignContent: 'center', alignItems: 'center' }}>Size</Text>
                                    <Text style={{ fontSize: 20, alignContent: 'center', alignItems: 'center', color: '#11283F' }}>{data.data && data.data.selectedSize}</Text>
                                </View>
                            </View>
                        </CardItem>

                        <CardItem style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'column', flex: 1 }}>
                                <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', }}>
                                    <Text style={{ fontSize: 20, alignContent: 'center', alignItems: 'center' }}>sale price</Text>
                                    <Text style={{ fontSize: 20, alignContent: 'center', alignItems: 'center', color: '#11283F' }}>{data.data && data.data.salePrice}</Text>
                                </View>
                            </View>
                        </CardItem>
                        <CardItem style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'column', flex: 1 }}>
                                <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'space-between', }}>
                                    <Text style={{ fontSize: 20, alignContent: 'center', alignItems: 'center' }}>Address:</Text>
                                    <Text style={{ fontSize: 20, alignContent: 'center', alignItems: 'center', color: '#11283F', }}>{data.data && data.data.billingDetails.address}</Text>
                                </View>
                            </View>
                        </CardItem>

                        <CardItem style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'column', flex: 1 }}>
                                <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', }}>
                                    <Text style={{ fontSize: 20, alignContent: 'center', alignItems: 'center' }}>City:</Text>
                                    <Text style={{ fontSize: 20, alignContent: 'center', alignItems: 'center', color: '#11283F' }}>{data.data && data.data.billingDetails.city}</Text>
                                </View>
                            </View>
                        </CardItem>

                        <CardItem style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'column', flex: 1 }}>
                                <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', }}>
                                    <Text style={{ fontSize: 20, alignContent: 'center', alignItems: 'center' }}>State:</Text>
                                    <Text style={{ fontSize: 20, alignContent: 'center', alignItems: 'center', color: '#11283F' }}>{data.data && data.data.billingDetails.state}</Text>
                                </View>
                            </View>
                        </CardItem>


                        <CardItem style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'column', flex: 1 }}>
                                <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', }}>
                                    <Text style={{ fontSize: 20, alignContent: 'center', alignItems: 'center' }}>Zipcode:</Text>
                                    <Text style={{ fontSize: 20, alignContent: 'center', alignItems: 'center', color: '#11283F' }}>{data.data && data.data.billingDetails.zipcode}</Text>
                                </View>
                            </View>
                        </CardItem>


                        <CardItem style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'column', flex: 1 }}>
                                <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', }}>
                                    <Text style={{ fontSize: 20, alignContent: 'center', alignItems: 'center' }}>Name:</Text>
                                    <Text style={{ fontSize: 20, alignContent: 'center', alignItems: 'center', color: '#11283F' }}>{data.data && data.data.billingDetails.name}</Text>
                                </View>
                            </View>
                        </CardItem>

                        <CardItem style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'column', flex: 1 }}>
                                <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', }}>
                                    <Text style={{ fontSize: 20, alignContent: 'center', alignItems: 'center' }}>Shipping Cost</Text>
                                    <Text style={{ fontSize: 20, alignContent: 'center', alignItems: 'center', color: '#11283F' }}>${data.data && data.data.shippingCost}</Text>
                                </View>
                            </View>
                        </CardItem>
                        <CardItem style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'column', flex: 1 }}>
                                <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', }}>
                                    <Text style={{ fontSize: 20, alignContent: 'center', alignItems: 'center' }}>Time</Text>
                                    <Text style={{ fontSize: 12, alignContent: 'center', alignItems: 'center', color: '#11283F' }}>{this.props.navigation.state.params.time}</Text>
                                </View>
                            </View>
                        </CardItem>
                        {!!data.data && !data.data.status && <CardItem style={{ flex: 1, justifyContent: 'center', paddingTop: 20 }}>
                            <Button onPress={() => { this.handleShip(data.docId) }} >
                                <Text>Ship</Text>
                            </Button>
                        </CardItem>}

                        {!!data.data && !!data.data.status && <CardItem style={{ flex: 1, justifyContent: 'center', paddingTop: 20 }}>
                            <Button onPress={() => { this.handleShip(data.docId) }} disabled>
                                <Text>Shiped</Text>
                            </Button>
                        </CardItem>}


                        <CardItem style={{ flex: 1, justifyContent: 'center', paddingTop: 20 }}>
                            <Button onPress={() => { this.handelPress(data.docId) }} danger>
                                <Text>Cancel</Text>
                            </Button>
                        </CardItem>
                    </Card>
                </Content>

            </Container>

        );
    }
}

const styles = StyleSheet.create({

});