import 'react-native-gesture-handler';
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, CardStyleInterpolators, TransitionPresets } from '@react-navigation/stack';
import Map from "./screens/map"
import Home from "./screens/Home"
import Search from "./screens/search"
import Profile from './screens/profile';
import All from './screens/all';
import Detaill from './screens/detaill';
import Menu from './screens/menu';
import OtherAll from './screens/otherall';
import Facture from './screens/setting';
import Traitment from './screens/traitment';
import Login from './login/login'
import PhoneOtp from './login/phoneotp'
import LoginContext from './context/logincontext';
import DetaillRest from './screens/detaillrest';
import AddPhone from './screens/addphone';
import MyCommands from './screens/mycommands';
import SplashScreen from 'react-native-splash-screen'
import Location from './context/location';
import ProduitFull from './screens/produit';
import FactureUn from './screens/Facture';
import { enableScreens } from 'react-native-screens';
import DetaillCategorie from './screens/detaillcategorie';
import CreateProfile from './login/create';
import TabBar from './tabbar/tabBar';
import api from './api';
import First from './screens/first';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { Bag, Home as Home4, Map1, Profile as Profile1 } from 'iconsax-react-native';
import palette from './palette';


enableScreens();

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Pann = createStackNavigator();
const PStack = createStackNavigator();
const MapNavige = createStackNavigator();
const RootStack = createStackNavigator();
const LoginRegister = createStackNavigator();
const SharedElementStack = createSharedElementStackNavigator();

function ProductShared() {
  return (
    <SharedElementStack.Navigator
      mode="modal"
      screenOptions={{
        headerShown: false,
        useNativeDriver: true,
        // Enable gestures if you want. I disabled them because of my card style interpolator opacity animation
        gestureEnabled: false,
        // gestureResponseDistance: {
        // 	vertical: 100,
        // },
        // gestureDirection: 'vertical',
        ...TransitionPresets.ModalSlideFromBottomIOS,
        transitionSpec: {
          open: iosTransitionSpec,
          close: iosTransitionSpec,
        },
        // Opacity animation, you can also adjust this by playing with transform properties.
        cardStyleInterpolator: ({ current: { progress } }) => ({
          cardStyle: {
            opacity: progress,
          },
        }),
      }}
    >
      <SharedElementStack.Screen name="Home" component={Home} />
      <SharedElementStack.Screen
        name="PF"
        component={ProduitFull}
        sharedElements={(route, otherRoute, showing) => {
          const { image, title } = route.params
          if (route.name === "Home" && showing) {
            // Open animation fades in image, title and description
            return [
              {
                id: image,
              },
              {
                id: title
              }
            ];
          } else {
            // Close animation only fades out image
            return [
              {
                id: image,
              },
              {
                id: title
              }
            ];
          }
        }}
      />
    </SharedElementStack.Navigator>
  );
}
export const iosTransitionSpec = {
  animation: "spring",
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 10,
    restSpeedThreshold: 10,
  },
};
const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forNoAnimation }}>
    <Stack.Screen name="HomeStack" component={ProductShared} />
    <Stack.Screen name="Search" component={Search} />
  </Stack.Navigator>
)
const Pan = (props) => {
  return (
    <Pann.Navigator screenOptions={{ headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forNoAnimation }}>
      <Pann.Screen name="Pannier" component={Facture} />
      <Pann.Screen name="AddPhone" component={AddPhone} />
      <Pann.Screen name="Traitment" component={Traitment} />
    </Pann.Navigator>
  )
}
const MyFacture = (props) => {
  const ctx = React.useContext(Location);
  const etat = ctx.isAvailable()
  return (
    <>{
      etat ? (
        <Pan {...props} />
      ) : (
        <FactureUn {...props} />
      )
    }
    </>
  )
}

const RootTab = () => {
  const navigation = useNavigation()
  return (
    <>
      <Tab.Navigator
        tabBar={(props) => {
          const icons = [<Home4 size="30" color={palette.primary} variant="Outline" />, <Bag size="30" color={palette.primary} variant="Outline" />, <Map1 size="30" color={palette.primary} variant="Outline" />, <Profile1 size="30" color={palette.primary} variant="Outline" />]
          return <TabBar {...props} icons={icons} />
        }}
        screenOptions={{
          headerShown: false
        }}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Basket" component={MyFacture} />
        <Tab.Screen name="Map" component={MapView} />
        <Tab.Screen name="Profile" component={ProfileView} />
      </Tab.Navigator>
    </>
  );
};

const LogReg = () => {
  return (
    <LoginRegister.Navigator initialRouteName='First' screenOptions={{
      headerShown: false,
      cardStyleInterpolator: CardStyleInterpolators.forNoAnimation
    }}>
      <LoginRegister.Screen name="Login" component={Login} />
      <LoginRegister.Screen name="Otp" component={PhoneOtp} />
      <LoginRegister.Screen name="Create" component={CreateProfile} />
    </LoginRegister.Navigator>
  )
}
const MapView = () => {
  return (
    <MapNavige.Navigator screenOptions={{
      headerShown: false,
    }}>
      <MapNavige.Screen name='MapView' component={Map} />
      <MapNavige.Screen name="Categorie" component={DetaillRest} />
      <MapNavige.Screen name="Detaill" component={Detaill} />
      <MapNavige.Screen name="Menu" component={Menu} />
    </MapNavige.Navigator>
  )
}
const ProfileView = () => {
  return (
    <PStack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <PStack.Screen name='Profile' component={Profile} />
    </PStack.Navigator>
  )
}
const App = () => {
  const Context = React.useContext(LoginContext)
  const user = Context.isLogin()
  const { id } = Context.login

  React.useEffect(() => {
    SplashScreen.hide();
  }, [])
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{
        headerShown: false,
      }}>
        {
          !user ? (
            <RootStack.Screen name="LogReg" component={LogReg} />
          ) : (
            <RootStack.Screen name="Home" component={RootTab} />)
        }
      </RootStack.Navigator>
    </NavigationContainer>
  )
}
const styles = StyleSheet.create({
});

export default App;
