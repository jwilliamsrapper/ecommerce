import React from 'react'
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import BottomTabNavigator from './BottomTabNavigator'
import Headers from './Header'
import CategoryList from '../screens/CategoryList/index'
import CategoryPage from '../screens/CategoryPage/index'
import ProductPage from '../screens/ProductPage/index';
import Login from '../screens/Login/index';
import SignUp from '../screens/SignUp/index'
import AddSubscription from '../screens/stripe/AddSubscription'
import Billing from '../screens/Billing/index'
import Confirmation from '../screens/Confirmation/index'
import Orders from '../screens/Orders/index'
import Cart from '../screens/Cart/index'
import Switch from '../screens/Switch/index'
import AdminLogin from '../screens/AdminLogin/index'
import AdminHeader from './AdminHeader'
import AdminHome from '../screens/AdminHome/index'
import AdminBottomTabNavigator from './AdminBottomTabNavigator'

const Drawer = createDrawerNavigator(
  {
    Home: {
      screen: BottomTabNavigator,
    },
    Category: {
      screen: CategoryList
    },
    Orders: {
      screen: Orders
    },
    ["Switch to Selling"]:{
      screen: Switch
    }
  },
//   {
//     contentComponent: drawerContentComponents
//   }
)

const MainStack = createStackNavigator({
  drawer:{
    screen: Drawer,
    navigationOptions: {
      headerTitle: <Headers/>
    }
  },
  CategoryPage: {
    screen: CategoryPage,
    navigationOptions: {
      headerTitle: 'Products'
    }
  },
  ProductPage: {
    screen: ProductPage,
    navigationOptions: {
      header: null
    }
  },
  Login: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      header: null
    }
  },
  AddSubscription:{
    screen:  AddSubscription,
   navigationOptions: {
     headerTitle: "Payment"
   }
  },
  Billing: {
    screen: Billing,
    navigationOptions: {
      headerTitle: 'Delievery Address'
    }
  },
  Confirmation: {
    screen: Confirmation,
    navigationOptions: {
      headerTitle: 'Confirm Purchase'
    }
  },
  Cart: {
    screen: Cart,
    navigationOptions: {
      headerTitle: 'Your Cart'
    }
  },
  Switch: {
    screen: Switch
  },
  AdminLogin: {
    screen: AdminLogin,
    navigationOptions: {
      header: null
    }
  },
},{
  defaultNavigationOptions:{
    headerStyle: {
      backgroundColor: 'black',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      color: 'white'
    },
  }
})


const AdminStack = createStackNavigator({
  AdminHome: {
    screen: AdminBottomTabNavigator,
    navigationOptions: {
      headerTitle: <AdminHeader/>
    }
  }
});


const MainNavigator = createAppContainer(
    createSwitchNavigator(
      {
        // Auth: AuthStack,
        App: MainStack,
        Admin: AdminStack
      },
      {
        initialRouteName: 'Admin',
      }
  ))


const Navigator = createAppContainer(MainNavigator);
export default Navigator
