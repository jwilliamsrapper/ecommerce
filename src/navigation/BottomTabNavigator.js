import React from 'react';
import {View,Text} from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MaterialIcons } from '@expo/vector-icons';

import Product from '../screens/Product/index'
import Home from '../screens/Home/index'
import CategoryList from '../screens/CategoryList/index'
import Login from '../screens/Login/index'

export default createBottomTabNavigator(
    {
      Home: Home,
      Product: Product,
      Category: CategoryList,
      Login: Login
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          const { routeName } = navigation.state;
          let iconName;
          if (routeName === 'Home') {
            // iconName = `ios-information-circle${focused ? '' : '-outline'}`;
            return (
              focused ? <Ionicons name='ios-home' size={33} color={tintColor} /> :
              <Ionicons name='ios-home' size={25} color={tintColor} />
            );
            // Sometimes we want to add badges to some icons.
            // You can check the implementation below.
          } else if (routeName === 'Product') {
            return(
            focused ? <Ionicons name='ios-shirt' size={33} color={tintColor} /> :
            <Ionicons name='ios-shirt' size={25} color={tintColor} />
            )
          }else if (routeName === 'Category') {
            return(
            focused ? <Ionicons name='ios-pricetags' size={33} color={tintColor} /> :
            <Ionicons name='ios-pricetags' size={25} color={tintColor} />
            )
          }
          else if (routeName === 'Login') {
            return(
            focused ? <MaterialIcons name='account-circle' size={33} color={tintColor} /> :
            <MaterialIcons name='account-circle' size={25} color={tintColor} />
            )
          }
          // You can return any component that you like here!
         
        },
      }),
      tabBarOptions: {
        activeTintColor: 'black',
        inactiveTintColor: 'gray',
      },
    }
  );

