import React from 'react';
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    Alert,
    KeyboardAvoidingView,
    Image,
    AsyncStorage,
} from 'react-native'
import Styles from './style'
import { checkAuth } from '../../config/firebase/Auth/signUpAuth'
import { Input } from 'react-native-elements'
import { Header } from 'react-navigation-stack';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class AddProductDetails extends React.Component {
    constructor() {
        super();
        this.state = {
            content: '',
            description: 'aaaaaaaaaaaaa',
            title: 'aaaaaaaaaaaaaaaaaa',
            isDescription: false,
            isTitle: false,
            loading: false
        }
    }
    async componentDidMount() {
        const catData = this.props.navigation.state.params.catData;
        this.setState({catData})
    }
    handlePress = async () => {
        const { description,
            isTitle,
            isDescription,
            title,
            catData
        } = this.state;

        console.log(title, description)

        if (title === '') {
            this.setState({ isTitle: true })
        }
        if (description.length < '5') {
            this.setState({ isDescription: true })
        }
        if (isDescription === false && isTitle === false) {
            this.props.navigation.navigate("AddImage", { title, description, catData });
        }
    }



    render() {
        const {
            isDescription,
            isTitle,
            loading
        } = this.state;
        return (
            <KeyboardAvoidingView
                style={Styles.container}
                behavior="padding"
                enabled
                keyboardVerticalOffset={Header.HEIGHT + 55} // adjust the value here if you need more padding
            >
                <ScrollView >
                    <SafeAreaView>


                        <View style={Styles.inputContainer}>
                            <Text style={Styles.titleTextDetails}>*Add Title</Text>
                            <Input
                                placeholder="e.g blue jeans"
                                onChangeText={(e) => { this.setState({ title: e }) }}
                                errorMessage={isTitle ? "please add title" : null}
                                onFocus={() => { this.setState({ isTitle: false }) }}
                            />
                        </View>



                        <View style={Styles.inputContainer}>
                            <Text style={Styles.titleTextDetails}>*Describe what are you selling!</Text>
                            <Input
                                placeholder="e.g cool jeans with..."
                                onChangeText={(e) => { this.setState({ description: e }) }}
                                errorMessage={isDescription ? "more then five letter needed" : null}
                                onFocus={() => { this.setState({ isDescription: false }) }}
                                style={{ textAlignVertical: 'top' }}
                                multiline={true}
                            />
                        </View>

                        <View style={Styles.NextBtn}>
                            <Button
                                icon={
                                    <Icon
                                        name="arrow-right"
                                        size={15}
                                        color="white"
                                    />
                                }
                                iconRight
                                title="Next"
                                onPress={this.handlePress}
                            />
                        </View>


                        <View style={{ marginTop: 50 }} />

                    </SafeAreaView>
                </ScrollView>
            </KeyboardAvoidingView>

        )
    }
}