import React from 'react';
import {View,Text} from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// import Product from '../screens/Product/index'
import Home from '../screens/AdminHome/index'
import Account from '../screens/AdminAccount/index'
import Design from '../screens/Design/index'
import Catalog from '../screens/Catalog/index'

export default createBottomTabNavigator(
    {
      Home: Home,
      Account: Account,
      Design: Design,
      Catalog: Catalog
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          const { routeName } = navigation.state;
          let iconName;
          if (routeName === 'Home') {
            // iconName = `ios-information-circle${focused ? '' : '-outline'}`;
            return (
              focused ? <Ionicons name='ios-home' size={30} color={tintColor} /> :
              <Ionicons name='ios-home' size={28} color={tintColor} />
            );
            // Sometimes we want to add badges to some icons.
            // You can check the implementation below.
          } 
        
          else if(routeName === 'Design'){
            return(
              focused ? <Ionicons name='ios-analytics' size={30} color={tintColor}/> :
              <Ionicons name='ios-analytics' size={28} color={tintColor}/>
            )
          }else if(routeName === 'Catalog'){
            return(
              focused ? <Ionicons name='ios-images' size={30} color={tintColor}/> :
              <Ionicons name='ios-images' size={28} color={tintColor}/>
            )
          }
            else if (routeName === 'Account') {
            return(
            focused ? <Ionicons name='ios-pricetags' size={30} color={tintColor} /> :
            <Ionicons name='ios-pricetags' size={28} color={tintColor} />
            )
          }

          // You can return any component that you like here!

        },
      }),
      tabBarOptions: {
        activeTintColor: 'black',
        inactiveTintColor: 'gray',
        labelStyle: {
          fontSize: 14,
          color: 'grey'
        },
        style: {
          backgroundColor: 'white',
        },
      },
    }
  );
