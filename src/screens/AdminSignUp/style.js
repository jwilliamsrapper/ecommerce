import { StyleSheet, } from 'react-native';
import { Headings } from '../../config/themeColors'

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'black',
    },
    top:{
        alignItems: 'center',
        marginTop: '7%'
    },
    topText:{
        fontSize: 30,
        fontWeight: "700",
    },
    topBottomText:{
        color: 'grey',
        fontSize: 15
    },
    inputContainer:{
        width: '80%',
        marginLeft: '10%',
        marginTop: '10%'
    },
    SignupBtn:{
        width: '60%',
        backgroundColor: 'black',
        marginTop: '10%',
        height: 50,
        // marginLeft: '20%',
        borderRadius: 5,
        alignSelf: 'center',
    },
    btnText:{
        color: 'white',
        alignContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 22,
        marginTop: 6
    }
  
});

export default Styles;