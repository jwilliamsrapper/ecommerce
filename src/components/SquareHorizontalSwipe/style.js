import { StyleSheet, } from 'react-native';
import {boxColorBannerHomeBottom,boxColorBannerHomeCenter,HomeBannerTextColor} from '../../config/themeColors'

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        // height: 140,
    },
    square: {
        width: '98%',
        height: 150,
       flex: 1,
        overflow: "hidden",
        justifyContent: 'center',
        // borderColor: "red"
        
    },
    circularImage: {
        width: '100%',
        
    },
    text: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        paddingTop: 10,
        textAlign: 'center',   
    },
    catName:{
        textAlign: 'center',
        color: HomeBannerTextColor,
        fontSize: 18,
        fontWeight: '600'
    },
    catContainer:{
      backgroundColor:boxColorBannerHomeCenter,
      width: '50%',
      justifyContent: 'center',
      alignSelf: 'center',
      padding: 5
    },
    BottomCatContainer: {
        backgroundColor: boxColorBannerHomeBottom,
        width: '100%',
        padding: 5,
        marginTop: 'auto',
        
    }
   
});

export default Styles;