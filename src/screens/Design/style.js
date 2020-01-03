import { StyleSheet, } from 'react-native';
import { Headings } from '../../config/themeColors'

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'black',
    },
    top: {
        marginTop: 10,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        paddingBottom: 4,
        flexDirection: 'row'
    },
    DesignText: {
        fontSize: 18,
        marginLeft: 6
    },
    bannerImageContainer: {
        width: '100%',
        flex: 1,
        // height: 350,
        marginTop: 20
    },
    bannerImage: {
        width: '100%',
        height: 200
        // resizeMode: 'contain'
    },
    buttonContainer: {
        backgroundColor: 'red',
        marginTop: 20,
        width: '70%',
        textAlign: 'center',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 5,
        padding: 10
    },
    discountOffer: {
        fontSize: 16,
        marginTop: 5,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        paddingBottom: 3,
        paddingLeft: 5
    },
    catList: {
        width: '97%',
        flex: 1,
        // height: 350,
        marginTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        paddingBottom: 10
    },
    addCatBtn: {
        width: '97%',
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: '#4CAF50',
        marginTop: 10,
        height: 40,
        flexDirection: 'row',
        marginBottom: 20
    }
});

export default Styles;