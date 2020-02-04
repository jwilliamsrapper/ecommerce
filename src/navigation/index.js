import React from 'react'
import { AsyncStorage } from 'react-native'
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
import AddProduct from '../screens/Catalog/AddProduct'
import AddProductDetails from '../screens/Catalog/AddProductDetails'
import AddImage from '../screens/Catalog/AddImage'
import OtherDetails from '../screens/Catalog/OtherDetails'
import AddPrice from '../screens/Catalog/AddPrice'
import ProductDetailsAdmin from '../screens/ProductDetailsAdmin/index'
import EditProfile from '../screens/Edit/EditProfile'
import Terms from '../screens/Terms/index'
import Loading from '../screens/Loading/index'
import Disabled from '../screens/Disabled/index'
import Search from '../screens/Search/index'
import HeaderSearch from './Search'

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
  },
  //   {
  //     contentComponent: drawerContentComponents
  //   }
)

const VendorDrawer = createDrawerNavigator(
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
    ["Switch to Selling"]: {
      screen: Switch
    }
  },
)
const VendorStack = createStackNavigator({
  drawer: {
    screen: VendorDrawer,
    navigationOptions: {
      headerTitle: <Headers />
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
  AddSubscription: {
    screen: AddSubscription,
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
  Terms: {
    screen: Terms
  }
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: 'black',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      color: 'white'
    },
  },
  initialRouteName: 'drawer'
})

const MainStack = createStackNavigator({
  drawer: {
    screen: Drawer,
    navigationOptions: {
      headerTitle: <Headers />
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
  AddSubscription: {
    screen: AddSubscription,
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
  Terms: {
    screen: Terms
  },
  Search: {
    screen: Search,
    navigationOptions: { 
      header: null
    }
  }
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: 'black',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      color: 'white'
    },
  },
  initialRouteName: 'drawer'

})

const AuthStack = createStackNavigator({
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
})


const AdminStack = createStackNavigator({
  AdminHome: {
    screen: AdminBottomTabNavigator,
    navigationOptions: {
      headerTitle: <AdminHeader />
    }
  },
  AddProduct: {
    screen: AddProduct,
    navigationOptions: {
      headerTitle: 'Add Products'
    }
  },
  AddProductDetails: {
    screen: AddProductDetails,
    navigationOptions: {
      headerTitle: 'Add some details'
    }
  },
  AddImage: {
    screen: AddImage,
    navigationOptions: {
      headerTitle: 'Pick images'
    }
  },
  OtherDetails: {
    screen: OtherDetails,
    navigationOptions: {
      headerTitle: 'other details'
    }
  },
  AddPrice: {
    screen: AddPrice,
    navigationOptions: {
      headerTitle: 'Add Price'
    }
  },
  ProductDetailsAdmin: {
    screen: ProductDetailsAdmin
  },
  EditProfile: {
    screen: EditProfile
  },
  Terms: {
    screen: Terms
  }
});

const LoadingStack = createStackNavigator({
  Loading: {
    screen: Loading,
    navigationOptions: {
      header: null
    }
  }
})

const MainNavigator = createAppContainer(
  createSwitchNavigator(
    {
      App: MainStack,
      Vendor: VendorStack,
      Auth: AuthStack,
      Admin: AdminStack,
      Load: LoadingStack,
      Disabled: {
        screen: Disabled
      }
    },
    {
      initialRouteName: 'Load',
    }
  ))





const Navigator = createAppContainer(MainNavigator);
export default Navigator
