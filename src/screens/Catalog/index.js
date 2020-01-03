import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, SafeAreaView, Image, AsyncStorage } from 'react-native'
import Styles from './style'
import { NavigationEvents } from "react-navigation";
import { MaterialIcons } from '@expo/vector-icons';
import AccountListImage from '../../components/AccountList/AccountListImage'
import { getDataProducts } from '../../config/firebase/Database/GetData'
import {deleteData} from '../../config/firebase/Database/DeleteData'

export default class Account extends React.Component {
  constructor() {
    super();
    this.state = {
      content: '',
      loading: true,
      pending: 0,
      rejected: 0
    }
  }
  async  componentDidMount() {
    const uid = await AsyncStorage.getItem('uid')
    const res = await getDataProducts(uid);
    this.setState({content: res});    
    for(let x of res){
      // console.log(x.docData.allData.status)
      const status = x.docData.allData.status
      if(status === 'pending'){
        this.setState({pending: this.state.pending + 1})
      }else if(status === 'rejected'){
        this.setState({rejected: this.state.rejected + 1})
      }

    }
  }

  handleDelete = async(docId)=>{
    await deleteData('product', docId).then((res)=>{
      console.log(res)
        if(res === 'sucsses'){
          this.componentDidMount()
        }
    })
  }
  render() {
    const { loading, content, rejected, pending } = this.state;

    return (

      <ScrollView style={Styles.container}>
         <NavigationEvents
                    onWillFocus={() => {
                        this.setState({content: [], rejected: 0,pending: 0})
                        this.componentDidMount()
                    }}
                />
        <View style={Styles.mainBox}>
          <TouchableOpacity style={Styles.BoxContainer} onPress={() => { this.props.navigation.navigate("AddProduct") }}>
            <MaterialIcons name="add-box" size={40} color="white" />
            <View style={{ textAlign: 'center' }}>
              <Text style={Styles.textAddBtn}>ADD NEW PRODUCT</Text>
            </View>
          </TouchableOpacity>
          <View style={Styles.VerticalDivider} />

          <View>
            <TouchableOpacity style={[Styles.BoxContainer, { height: 78, width: '100%', padding: 10, backgroundColor: '#4BCFDC' }]}>
              <Text style={[Styles.textAddBtn, { fontSize: 14 }]}>Pending Products: {pending}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[Styles.BoxContainer, { height: 78, marginTop: 5, width: '100%', padding: 10, backgroundColor: '#FF7282' }]}>
              <Text style={[Styles.textAddBtn, { fontSize: 14 }]}>Rejected Products: {rejected}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View style={[Styles.BoxContainer, { height: 66, width: '90%', padding: 2, backgroundColor: '#4BCFDC', alignSelf: 'center' }]}>
            <Text style={[Styles.textAddBtn, { fontSize: 14 }]}>All Products: {content.length}</Text>
          </View>

          <View>
            {!!content.length && content.map((item,i)=>{
              // console.log(item.docData.allData.allData.allData.data.catData.docId)
              return(
                <TouchableOpacity 
                key={i}
                style={Styles.catList}
                onPress={() => { this.handleDelete(item.docId) }}>
              <AccountListImage
                title={item.docData.allData.allData.allData.data.title}
                src={{ uri: item.docData.allData.callBack[0] }}
                subTitle={"Price $" + item.docData.allData.price}
                />
            </TouchableOpacity>
                )
            })}
          </View>
        </View>
      </ScrollView>

    )
  }
}
