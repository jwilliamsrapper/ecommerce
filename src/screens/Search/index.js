import React from 'react';
import { Text, View, StyleSheet, StatusBar, Platform, ActivityIndicator, Image } from 'react-native'
import SearchHeader from '../../navigation/Search'
import { SafeAreaView } from 'react-navigation';
import searcher from '../../config/firebase/Database/Search'
import { Container, Header, Content, Card, CardItem, Icon, Right } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            message: '',
            content: [],
            noData: false
        }

        this.timeOut = 0;
    }

    async componentDidMount() {
        // await searcher();
    }
    handleSeach = async (childData) => {

        this.setState({ loading: true, noData: false })
        if (this.timeout) clearTimeout(this.timeout);

        this.timeout = setTimeout(async () => {
            //search function
            const res = await searcher(this.state.message)
            console.log("seraching for: ", this.state.message);
            this.setState({ content: res }, () => {
                this.setState({ loading: false })
                if (this.state.content.length <= 0) {
                    this.setState({ noData: true })
                }
            })
        }, 1000);

    }


    callbackFunction = (childData) => {
        this.setState({ message: childData.toLowerCase() });
        // console.log(childData)
        this.handleSeach(childData);
    }

    render() {
        const { loading, content, noData } = this.state;
        return (
            <SafeAreaView style={styles.mainContainer}>
                <View style={styles.container}>

                    {/* parent call back only return the value of directly while taping on serach button is 
                        handled by search and handle search.*/}
                    <SearchHeader parentCallback={this.callbackFunction} search={this.handleSeach} />
                </View>

                {/* text and loading  */}
                {!!loading && <View style={{
                    // marginLeft: 20,
                    flexDirection: 'row',
                    marginTop: 10,
                    marginBottom: 5,
                    alignSelf: 'center'
                }}>
                    <Text>Searching</Text>
                    <ActivityIndicator color="grey" style={{ marginLeft: 4 }} />
                </View>}

                {!!noData && <View style={{
                    // marginLeft: 20,
                    flexDirection: 'row',
                    marginTop: 10,
                    marginBottom: 5,
                    alignSelf: 'center'
                }}>
                    <Text>No data found!</Text>
                </View>}

                {/* litView for products */}
                <Content stlye={styles.scrollContainer}>
                    <View style={{ backgroundColor: 'white', alignContent: 'center', alignItems: 'center', padding: 10 }}>
                        {!!content.length && content.map((e, i) => {
                            console.log("==>", e.docId)
                            const price = e.docData.allData.price;
                            const sale = e.docData.allData.salePrice;
                            const image = e.docData.allData.callBack[0];
                            const titles = e.docData.allData.allData.allData.data.title;
                            const desc = e.docData.allData.allData.allData.data.description;
                            return (
                                <Card style={{ width: '90%' }} key={i}>
                                    <TouchableOpacity onPress={()=>{ this.props.navigation.navigate("ProductPage", { product: e }) }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ flexDirection: "column" }}>
                                                <View style={{ paddingLeft: 25, width: 165 }}>
                                                    <Text>{titles.toUpperCase()}</Text>
                                                </View>
                                                <CardItem>
                                                    <Image source={{ uri: image }} style={{
                                                        width: 145,
                                                        height: 120
                                                    }} />
                                                </CardItem>
                                            </View>
                                            <View style={{ justifyContent: 'center' }}>
                                                <View style={styles.rigthCont}>
                                                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>$ {sale ? sale : price}</Text>
                                                </View>
                                                <View style={styles.descCont}>
                                                    <Text numberOfLines={5}>{desc}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </Card>
                            )
                        })}

                    </View>
                </Content>

            </SafeAreaView>

        )
    }
}

export default Search;

const styles = StyleSheet.create({
    container: {
        flex: 0.20,
        height: '100%',
        backgroundColor: "black",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 10
    },
    mainContainer: {
        flex: 1,
        backgroundColor: '#fcfffe',
        flexGrow: 1
    },
    rigthCont: {
        flexDirection: 'column',
        justifyContent: 'center',
        // alignItems: 'center',
        paddingRight: 20
    },
    descCont: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '60%'
    },
    scrollContainer: {
        flex: 9.70
    }
});