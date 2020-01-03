import { StyleSheet, } from 'react-native';
import { Headings } from '../../config/themeColors'

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
    },
    card: {
        flex: 0.5,
    },
    headings: {
        backgroundColor: 'black',
        height: 30,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    text: {
        color: 'white',
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginLeft: 14,
        fontSize: 20,
        padding: 2
    },
    swipeCategory: {
        flex: 1,
    },
    square: {
        flex: 1,
        flexDirection: 'row',
        width: 1000
    },
    list: {
        justifyContent: 'center',
        flexDirection: 'column',
        
      }

});

export default Styles;