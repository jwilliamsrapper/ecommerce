import { StyleSheet,Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        
    },
    image: {
        width: deviceWidth -20,
        height: deviceWidth /2,
        // resizeMode: 'contain',
        borderRadius: 5
    },
  
});

export default Styles;