import { StyleSheet, } from 'react-native';

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    image: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain'
    },
    box:{
        backgroundColor: 'red',
        width: '47%',
        height: 200,
        borderRadius: 10
    },
    seprator:{
        paddingHorizontal: 5
    }
});

export default Styles;