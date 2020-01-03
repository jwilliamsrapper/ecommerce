import React from 'react';
import Navigator from './src/navigation/index'
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Root } from "native-base";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import productReducer from './src/store/reducer';
import { AppLoading } from 'expo';

const store = createStore(productReducer);


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }
  async componentDidMount() {
 await Font.loadAsync({
      'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    });
    this.setState({ loading: false });
  }
  render() {
    if (this.state.loading) {
      return <AppLoading />;
    } else {

      return (
        <Provider store={store}>
          <Root>
            <Navigator />
          </Root>
        </Provider>
      );
    }
  }
}


(async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      //  here lies image with require
    ]),
    Font.loadAsync({

      ...Ionicons.font,
    }),
  ]);
})()
