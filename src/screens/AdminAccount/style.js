import { StyleSheet, } from 'react-native';
import { Headings } from '../../config/themeColors'

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'black',
    },
    nameCardContainer: {
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        width: '100%',
        height: 50,
        marginTop: 10,
    },
    profileImage: {
        resizeMode: 'contain',
        width: 40,
        height: 40,
        borderRadius: 80 / 2,
        overflow: "hidden",
        paddingBottom: 10,
    },
    imageContainer: {
        marginLeft: 10,
        flexDirection: 'row'
    },
    name:{
        marginTop: 3,
        marginLeft: 15,
    },
    Edit:{
        marginLeft: 15,
        color: 'grey'
    },
    listContainer:{
        marginTop: 25
    }
});

export default Styles;