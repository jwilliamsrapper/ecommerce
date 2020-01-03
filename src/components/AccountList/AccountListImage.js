import React from 'react';
import { ScrollView, View, Text, Image, SafeAreaView, Alert } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default class AccountListImage extends React.Component {
    constructor() {
        super();
        this.state = {
            content: ''
        }
    }
    render() {

        return (
            <View>
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignContent: 'center',
                    alignItems: 'center',
                    marginLeft: 10,
                    justifyContent: 'space-between'
                }}>
                <View
                    style={{ flexDirection: 'row' }}
                >
                    <Image
                        source={this.props.src}
                        style={{
                            width: 40,
                            height: 40
                        }}
                    />
                    <Text
                        style={{
                            marginLeft: 10,
                            fontWeight: '600',
                            fontSize: 18,
                            fontFamily: 'space-mono'
                        }}
                    >{this.props.title}</Text>
                   
                </View>
                <MaterialCommunityIcons
                    name="delete"
                    size={25}
                    color="red"
                />
            </View>
                 <Text
                 style={{
                     marginLeft: 65
                 }}
                 >{this.props.subTitle}</Text>
            </View>
        )
    }
}

