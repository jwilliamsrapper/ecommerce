import { StyleSheet, } from 'react-native';
import { Headings } from '../../config/themeColors'

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'black',
    },
    top: {
      marginLeft: 30,
      marginTop: 10,
    },
    orderTitleText: {
      fontSize: 22,
      fontFamily: 'space-mono',
    },
    mainBox: {
      flexDirection: 'row',
      width: '90%',
      alignSelf: 'center',
      justifyContent: 'center',
      marginLeft: 14,
      marginRight: 4
    },
    BoxContainer: {
      width: '50%',
      height: 140,
      backgroundColor: '#cb8ae1',
      marginTop: 20,
      alignContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      justifyContent: 'center',

    },
    textAddBtn: {
      color: 'white',
      fontSize: 20,
      alignItems: 'center',
      alignContent: 'center',
      alignSelf: 'center',
      textAlign: 'center'
    },
    VerticalDivider: {
      width: 10
    },
    catList: {
      width: '100%',
      flex: 1,
      // height: 350,
      marginTop: 25,
      borderBottomWidth: 1,
      borderBottomColor: 'grey',
      paddingRight: 20
  },
});

export default Styles;
