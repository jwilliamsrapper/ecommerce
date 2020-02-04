import { StyleSheet, } from 'react-native';

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        width: 80,
        // height: 140,
    },
    circular: {
        width: 80,
        height: 80,
        borderRadius: 80 / 2,
        // overflow: "hidden",
        borderWidth: 0.2,
        borderColor: 'black'
        // borderWidth: 3,
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
        
    }
});

export default Styles;