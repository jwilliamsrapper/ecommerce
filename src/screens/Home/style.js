import { StyleSheet, } from 'react-native';
import { Headings } from '../../config/themeColors'

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'black',
    },
    banner: {
        //    marginLeft: 10,
    },
    headings: {
        color: Headings,
        fontSize: 23,
        paddingTop: 10,
        fontWeight: '900',
        fontFamily: 'open-sans-bold' ? 'open-sans-bold' : null
    },
    horizontalSwipeContainer:{
        flex: 1,
        width: '100%',
        marginTop: 15
    },
    swipeCategory: {
        flex: 1,
    },
    square: {
        flex: 1,
        flexDirection: 'row',
        width: 1000
    },
    square2: {
        flex: 1,
        flexDirection: 'row',
        // width: 7000,
        height: '20%'
    },
  
});

export default Styles;