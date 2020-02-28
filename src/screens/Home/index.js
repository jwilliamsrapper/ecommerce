import React from 'react';
import { ScrollView, View, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import HomeBanner from '../../components/HomeBanner/HomeBanner'
import Styles from './style'
import CustomCrousel from '../../components/crousel/crousel'
import SquareHorizontalSwipe from '../../components/SquareHorizontalSwipe/SquareHorizontalSwipe'
import { getDataForTopBanner, getDataForDiscounts, getDataAll } from '../../config/firebase/Database/GetData'
import { HomeBannerHeight } from '../../config/themeColors'
import * as Permissions from 'expo-permissions';
import { savePushToken } from '../../config/firebase/Database/SaveData'
import { Notifications } from 'expo';
import banner2 from '../../../assets/images/banner2.png'
import cat1 from '../../../assets/images/cat1.png'
import cat2 from '../../../assets/images/cat2.png'
import cat3 from '../../../assets/images/cat3.jpeg'
export default class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            content: '',
            topBanner: [],
            discounts: [],
            categories: [],
            loading: false,
            networl: false,
            tempCat: [cat1, cat2, cat3]
        }
    }

    // for push notificcations
    registerForPushNotificationsAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        // only asks if permissions have not already been determined, because
        // iOS won't necessarily prompt the user a second time.
        // On Android, permissions are granted on app installation, so
        // `askAsync` will never prompt the user

        // Stop here if the user did not grant permissions
        if (status !== 'granted') {
            alert('No notification permissions!');
            return;
        }

        // Get the token that identifies this device
        let token = await Notifications.getExpoPushTokenAsync();

        // POST the token to your backend server from where you can retrieve it to send push notifications.
        await savePushToken(token);
    }
    //   end push notificarions


    async componentDidMount() {
        this.setState({ loading: true })
        const res = await getDataForTopBanner();
        this.setState({ topBanner: res })
        const ress = await getDataForDiscounts();
        this.setState({ discounts: ress });
        const resss = await getDataAll("categories");
        this.setState({ categories: resss })
        this.setState({ loading: false, network: true })
        await this.registerForPushNotificationsAsync();
    }

    render() {
        const { categories, topBanner, discounts, loading, network, tempCat } = this.state
        console.log(topBanner)
        // making double componenet because ther is problem with apple so rendering the banner and 
        // etc for the issue of apple it is assummption althoug;
        if (!network) {
            return (
                <ScrollView style={Styles.container}>
                    {!!loading &&
                        <View>
                            <ActivityIndicator size="large" color="black" />
                        </View>}
                    <View style={Styles.container}>

                        {/* banner */}
                        <View style={Styles.banner} >
                            <TouchableOpacity>
                                <Image source={banner2} style={{ width: '100%', height: 340 }} />
                            </TouchableOpacity>
                        </View>
                        {/* {banner Ends...} */}

                        {/* other square swipeable second banner */}


                        {/* banner end */}
                        {/* other square swipeable third banner */}
                        <View style={Styles.horizontalSwipeContainer} >
                            <ScrollView style={Styles.swipeCategory} horizontal={true} showsHorizontalScrollIndicator={false}>
                                <View style={Styles.square2}>
                                    {!!tempCat.length && tempCat.map((item, i) => {
                                        // console.log(item.docId)

                                        return (
                                            <TouchableOpacity
                                                onPress={() => { this.props.navigation.navigate("Product") }}
                                                key={i}
                                                style={{ flex: 1, height: 160, maxWidth: 230, minWidth: 140 }}
                                            >
                                                <SquareHorizontalSwipe

                                                    image={item}
                                                    dealName={'Go to Category'}
                                                />
                                            </TouchableOpacity>
                                        )
                                    })}

                                </View>
                            </ScrollView>
                        </View>

                        {/* banner end */}
                    </View>
                </ScrollView>
            )
        } else {
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
                                    {!!discounts.length && discounts.map((item, i) => {
                                        // console.log(item)
                                        return (
                                            <SquareHorizontalSwipe
                                                key={i}
                                                center={true}
                                                image={{ uri: item.docData.image }}
                                                dealName={item.docData.text}
                                            />
                                        )
                                    })}

                                </View>
                            </ScrollView>
                        </View>

                        {/* banner end */}
                        {/* other square swipeable third banner */}
                        <View style={Styles.horizontalSwipeContainer} >
                            <ScrollView style={Styles.swipeCategory} horizontal={true} showsHorizontalScrollIndicator={false}>
                                <View style={Styles.square2}>
                                    {!!categories.length && categories.map((item, i) => {
                                        // console.log(item.docId)

                                        return (
                                            <TouchableOpacity
                                                onPress={() => { this.props.navigation.navigate("CategoryPage", { docData: item.docData }) }}
                                                key={i}
                                                style={{ flex: 1, height: 160, maxWidth: 230, minWidth: 140 }}
                                            >
                                                <SquareHorizontalSwipe

                                                    image={{ uri: item.docData.image }}
                                                    dealName={item.docData.text}
                                                />
                                            </TouchableOpacity>
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
}