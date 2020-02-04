import { StyleSheet, } from 'react-native';
import { Headings } from '../../config/themeColors'

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFBFC',
  },
  BoxContainer: {
    width: '50%',
    height: 160,
    backgroundColor: '#18D090',
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
  mainBox: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  VerticalDivider: {
    width: 10
  },
  catImage: {
    // width: '150%',
    height: 120,
    resizeMode: 'contain'
  },
  imageContainer: {
  },
  mainCatContainer: {
    flex: 1,
    flexDirection: 'row',
    // width: '100%',
    flexWrap: 'wrap'
  },
  catNameTitle: {
    fontSize: 16,
    fontFamily: 'space-mono',
    paddingTop: 20,
  },
  inputContainer: {
    width: '90%',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 50
  },
  titleTextDetails: {
    marginLeft: 10,
    color: 'grey',
    fontFamily: 'space-mono',
    fontSize: 13
  },
  NextBtn: {
    width: '60%',
    marginTop: 50,
    alignSelf: 'center',
  },
  catList: {
    width: '100%',
    flex: 1,
    // height: 350,
    marginTop: 25,
    borderBottomWidth: 2,
    borderBottomColor: 'grey',
    paddingRight: 20
  },
  addButton: {
    width: '95%',
    backgroundColor: 'green',
    marginTop: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  addButtonText: {
    color: 'white',
    padding: 5,
    fontSize: 16
  },
  addedColor:{ 
    marginLeft: 10,
    marginTop: 3,
    borderColor: 'blue',
    borderWidth: 1,
    padding: 4
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});

export default Styles;
