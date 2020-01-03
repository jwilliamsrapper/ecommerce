import { StyleSheet, } from 'react-native';

const Styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    Name: {
        fontSize: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.2)',
        padding: 20
    },
    priceContainer: {
        borderColor: 'rgba(0, 0, 0, 0.2);',
        borderBottomWidth: 1,
        padding: 15,
        // opacity: 0.5,
        flexDirection: 'row'
    },
    Price: {
        fontSize: 20,
        color: 'black',
        opacity: 1,
        fontWeight: 'bold'
    },
    originalPrice: { 
        marginTop: 5,
        marginLeft: 10,
        fontSize: 13,
        textDecorationLine: 'line-through',
        textDecorationColor: 'red'
    },
    other: {
        color: 'grey',
        fontSize: 13,
        textAlign: 'center'
    }
});

export default Styles;