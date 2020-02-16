import React from 'react';
import { ScrollView, View, Text, ImageBackground, SafeAreaView, Alert } from 'react-native'
import Styles from './style'

export default class SquareHorizontalSwipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: ''
        }
    }
    render() {

        return (
            <View style={Styles.container}>
                <ImageBackground
                    style={Styles.square}
                    source={this.props.image}
                >
                    {!!this.props.dealName && <View style={this.props.center ? Styles.catContainer: Styles.BottomCatContainer}>
                        <Text style={Styles.catName}>{this.props.dealName}</Text>
                    </View>}
                </ImageBackground>
            </View>
        )
    }
}