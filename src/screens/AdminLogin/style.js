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
        fontSize: 28,
        fontWeight: "700",
    },
    topBottomText:{
        color: 'grey',
        fontSize: 12
    },
    inputContainer:{
        width: '80%',
        marginLeft: '10%',
        marginTop: '9%'
    },
    SignupBtn:{
        width: '60%',
        backgroundColor: 'black',
        marginTop: '5%',
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
    },
    bottom: {
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 5
    },
    facebookBtn:{
        width: '60%',
        backgroundColor: '#3b5998',
        marginTop: '3%',
        height: 50,
        // marginLeft: '20%',
        borderRadius: 5,
        alignSelf: 'center',
        flexDirection: 'column'
    },
    btnTextFb:{
        color: 'white',
        alignContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 18,
        marginTop: 2
    },
    newText: {
        color: 'blue',
        fontSize: 16
    }
  
});

export default Styles;