import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import HomeBanner from '../../components/HomeBanner/HomeBanner'
import Styles from './style'
import CustomCrousel from '../../components/crousel/crousel'
import SquareHorizontalSwipe from '../../components/SquareHorizontalSwipe/SquareHorizontalSwipe'
import { getDataForTopBanner, getDataForDiscounts, getDataAll } from '../../config/firebase/Database/GetData'
import {HomeBannerHeight } from '../../config/themeColors'

export default class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            content: '',
            topBanner: [],
            discounts: [],
            categories: [],
            loading: false
        }
    }

    async componentDidMount(){
        this.setState({loading: true})
        const res = await getDataForTopBanner();
        this.setState({topBanner: res})
        const ress = await getDataForDiscounts();
        this.setState({discounts: ress});
        const resss = await getDataAll("categories");
        this.setState({categories: resss})
        this.setState({loading: false})
    }

    render() {
        const {categories, topBanner, discounts, loading} = this.state
        // console.log(discounts)
        return (

            <ScrollView style={Styles.container}>
            {!!loading && 
            <View style={{
                justifyContent: 'center',
                 alignContent: 'center',
                 alignItems: 'center',
                 alignSelf: 'center',
                 flex: 1,
                //  marginTop: '20%'
                 }}>
            <ActivityIndicator size="large" color="black" />
                 </View>}
                {!loading && <View style={Styles.container}>

                    {/* banner */}
                    <View style={Styles.banner} >
                        <TouchableOpacity>
                            <CustomCrousel image={topBanner}
                             bannerHeight={HomeBannerHeight}
                             autoplay={true}
                             />
                        </TouchableOpacity>
                    </View>
                    {/* {banner Ends...} */}

                    {/* other square swipeable second banner */}
                    <View style={Styles.horizontalSwipeContainer} >
                        <ScrollView style={Styles.swipeCategory} horizontal={true} showsHorizontalScrollIndicator={false}>
                            <View style={Styles.square}>
                                {!!discounts.length && discounts.map((item,i)=>{
                                    // console.log(item)
                                    return(
                                        <SquareHorizontalSwipe 
                                        key={i}
                                        center={true} 
                                        image={{uri: item.docData.image}} 
                                        dealName={item.docData.text} 
                                        />
                                        )
                                })}
                                
                            </View>
                        </ScrollView>
                    </View>

                    {/* banner end */}
                    {/* other square swipeable second banner */}
                    <View style={Styles.horizontalSwipeContainer} >
                        <ScrollView style={Styles.swipeCategory} horizontal={true} showsHorizontalScrollIndicator={false}>
                            <View style={Styles.square2}>
                            {!!categories.length && categories.map((item, i)=>{
                                console.log(item)
                                return(
                                    <SquareHorizontalSwipe 
                                    key={i}
                                    image={{uri: item.docData.image}} 
                                    dealName={item.docData.text} 
                                    />
                                )
                            })}
                               
                            </View>
                        </ScrollView>
                    </View>

                    {/* banner end */}
                </View>}
            </ScrollView>

        )
    }
}