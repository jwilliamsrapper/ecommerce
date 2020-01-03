import React from 'react';
import Carousel from 'react-native-banner-carousel';
import { StyleSheet, Image, View, Dimensions } from 'react-native';
import banner from '../../../assets/banner.png'
import { HomeBannerHeight,HomeBannerTimeOut } from '../../config/themeColors'
const BannerWidth = Dimensions.get('window').width;
const BannerHeight = HomeBannerHeight;

const images = [
    'https://akm-img-a-in.tosshub.com/sites/lovesutras/images/stories/look-fashionable-this-winter-750-2_122718060654.jpg',
    'https://images.pexels.com/photos/291762/pexels-photo-291762.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
   
];

export default class CustomCrousel extends React.Component {

    renderPage(image, index) {
        return (
            <View key={index}>
                <Image style={{ width: BannerWidth, height: this.props.bannerHeight }} source={{ uri: image }} />
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Carousel
                     autoplay={this.props.autoplay ? true : false}
                    autoplayTimeout={HomeBannerTimeOut}
                    loop
                    index={0}
                    pageSize={BannerWidth}
                >
                    
                    {this.props.image ? this.props.image.map((image, index) => this.renderPage(image.docData.image, index)):
                        this.props.product.map((image,index) => this.renderPage(image, index))
                    }
                </Carousel>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
});