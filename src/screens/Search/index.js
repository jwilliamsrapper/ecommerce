import React from 'react';
import { Text, View, StyleSheet, StatusBar, Platform } from 'react-native'
import SearchHeader from '../../navigation/Search'
import { SafeAreaView } from 'react-navigation';

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }

    }

    callbackFunction = (childData) => {
        this.setState({message: childData})
        console.log(childData)
    }

    render() {
        const { loading } = this.state;
        return (
            <SafeAreaView style={{flex: 1}}>
                <View style={styles.container}>
                <SearchHeader parentCallback = {this.callbackFunction}/>
                </View>
            <View>
                <Text>Progress in process</Text>
            </View>
            </SafeAreaView>

        )
    }
}

export default Search;

const styles = StyleSheet.create({
    container: {
      flex: 0.1,
      backgroundColor: "#fff",
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 20
    }
  });