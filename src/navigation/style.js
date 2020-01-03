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
    }
  });

  export default Styles;