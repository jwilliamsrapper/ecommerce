import React from 'react';
import { ScrollView, View, Text, FlatList, SafeAreaView, Dimensions, Image } from 'react-native'
import HorizontalSwipe from '../../components/HorizontalSwipe/HorizontalSwipe'
import Styles from './style';
import ProductBox from '../../components/ProductBox/index'
import HomeBanner from '../../components/HomeBanner/HomeBanner'
import { getDataAll, getDataForProductsAll } from '../../config/firebase/Database/GetData'
import { TouchableOpacity } from 'react-native-gesture-handler';






function Item({ title, props }) {
  // console.log("===>>",title.docData.allData.salePrice)
  const price = title.docData.allData.price;
  const sale = title.docData.allData.salePrice;
  const image = title.docData.allData.callBack;
  const titles = title.docData.allData.allData.allData.data.title;
  return (
      <TouchableOpacity 
      onPress={()=>{props.navigation.navigate("ProductPage", {product: title})}}
      style={{
          width: Dimensions.get('window').width / 2,
          height: 250,
          shadowColor: "#000",
          shadowOffset: {
              width: 0,
              height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,

          elevation: 3,
          padding: 0,
          margin: 4,
          justifyContent: 'center',
          alignSelf: 'center',
          marginBottom: 20,
          borderWidth: 0.1,
          width: Dimensions.get('window').width / 2
      }}>
          <Image
              source={{uri: image[0]}}
              style={{
                  height: 200,
                  width: Dimensions.get('window').width / 2,

              }}
          />
          <Text
              style={{
                  fontSize: 12,
                  paddingLeft: 10,
                  color: 'grey'
              }}
          >{titles}</Text>
          <View style={{flexDirection: 'row'}}>
          <Text
              style={{
                  fontSize: 17,
                  color: 'black',
                  paddingLeft: 10,
                  fontWeight: 'bold'     
              }}
          >${sale ? sale : price}</Text>
          <Text
              style={{
                  fontSize: 12,
                  color: 'red',
                  paddingLeft: 10,
                  paddingTop: 4,
                  fontWeight: 'bold',
                  textDecorationLine: 'line-through'     
              }}
          >{sale ? '$'+price : null}</Text>
          </View>
      </TouchableOpacity>
  );
}








export default class Product extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: '',
      product: [],
      loading: true
    }
  }

  async componentDidMount() {
    const res = await getDataAll('categories');
    this.setState({ categories: res });
    const ress = await getDataAll('product');
    this.setState({ product: ress })

  }

  render() {
    const { categories, product,loading } = this.state;

    return (
      <SafeAreaView style={Styles.container}>
        {/* swipeable top list */}
        <View  >

          <View style={Styles.horizontalSwipeContainer} >
            <ScrollView style={Styles.swipeCategory} horizontal={true} showsHorizontalScrollIndicator={false}>
              {!!categories.length && categories.map((item, i) => {
                return (
                  <TouchableOpacity style={{ paddingRight: 10 }}
                    onPress={() => { this.props.navigation.navigate("CategoryPage", { docData: item.docData }) }}
                    key={i}>
                    <HorizontalSwipe catText={item.docData.text} iamge={item.docData.image} />
                    <View style={Styles.swipeSetting} />
                  </TouchableOpacity>
                )

              })}
            </ScrollView>
          </View>
          {/* swipeable top list end...*/}

          {/* banners */}
          {/* <HomeBanner /> */}

          {/* banners end... */}
          {/* product box */}
          {/* <View style={Styles.ProductBoxContainer}>
            <ProductBox style={Styles.ProductBox} />
            <View style={Styles.verticalSeprator} />
            <ProductBox />
            <View style={Styles.verticalSeprator} />
            <ProductBox />
          </View> */}


          {!!loading && <View style={{ paddingRight: 4, }}>
            <FlatList
              numColumns={2}
              horizontal={false}
              contentContainerStyle={{  justifyContent: 'center', flexDirection: 'column',}}
              data={product}
              renderItem={({ item }) => <Item title={item} props={this.props} />}
              keyExtractor={item => item.id}
            />
          </View>}
          <View style={{ height: 100 }} />
        </View>
      </SafeAreaView>
    )
  }
}