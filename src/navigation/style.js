import { StyleSheet, } from 'react-native';
import { header } from '../config/themeColors'
import {logoColor, logoSize,logoWeigth} from '../config/themeColors'

const Styles = StyleSheet.create({
    container: {
      flex: 1,
      height: '100%',
      alignContent: 'center',
      alignItems: 'center',
      backgroundColor: header,
      flexDirection: "row",
      justifyContent: 'space-between'
    },
    ham:{
        padding: 10
    },
    logo: {
      color: logoColor,
      fontSize: logoSize,
      // fontWeigth: logoWeigth
    },
    row: {
      flexDirection: 'row'
    },
    input: {
      // width: '48%',
      // height: '49%',
      // borderRadius: 3,
      // paddingLeft: 5,
      // paddingTop: 2,
      flexDirection: 'row'
    },
    searchText: {
      color: 'grey',
      paddingLeft: 7,
      paddingTop: 1
    },
    inputContainer: {
      backgroundColor: 'white',
      width: '190%',
      height: '50%',
    }
  });

  export default Styles;
