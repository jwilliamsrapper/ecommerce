import React from 'react';
import { ScrollView, View, Image, TouchableOpacity, Alert } from 'react-native'
import { Container, Header, Content, Card, CardItem, Body, Text,Left,Title,Right } from 'native-base';
import { getDataAll } from '../../config/firebase/Database/GetData'

export default class CategoryList extends React.Component {
  constructor() {
    super();
    this.state = {
      content: '',
      data: []
    }
  }

  async componentDidMount(){
    const res = await getDataAll('categories');
    this.setState({
        data: res
    })
  }


  render() {
        const { data } =  this.state;
    return (
        <Container>
        <Header style={{backgroundColor: 'black', height: 30}}> 
          {/* <Left/> */}
          <Body style={{justifyContent: 'center', alignSelf: 'center', alignItems: 'center',marginLeft: '2%' }}>
            <Title>Collections</Title>
          </Body>
          {/* <Right /> */}
        </Header>
        <Content >
        {!!data.length && data.map((item, i)=>{
            // console.log(item.docData.text)
            return(                
                <Card key={i} >
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate("CategoryPage", {docData: item.docData})}}> 
                  <CardItem>
                    <Body style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                      <View>
                      <Text style={{fontSize: 18}}>
                        {item.docData.text}
                      </Text>
                      <Text style={{fontSize: 12,color: 'gray'}}>collection</Text>
                      </View>
                      <Image 
                        source={{uri: item.docData.image}}
                        style={{
                        width: 70,
                        height: 66,

                    }}
                      />
                    </Body>
                  </CardItem>
                  </TouchableOpacity>
                </Card>
            )
        })}
        
        </Content>
      </Container>
    )
  }
}