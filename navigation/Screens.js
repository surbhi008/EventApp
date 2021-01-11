import React from "react";
import { Easing, Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Icon, Header } from "../components/";
import { Images, materialTheme } from "../constants/";
import { Block, Button, Input, Text, theme } from 'galio-framework';

// screens
import OnboardingScreen from "../screens/Onboarding";
import HomeScreen from "../screens/Home";
import ManScreen from "../screens/Man";
import KidsScreen from "../screens/Kids";
import EventsNearMeScreen from "../screens/EventsNearMe";
import DealsScreen from "../screens/Deals";

import CategoriesScreen from "../screens/Categories";
import CategoryScreen from "../screens/Category";
import ProductScreen from "../screens/Product";
import GalleryScreen from "../screens/Gallery";
import ChatScreen from "../screens/Chat";

import CartScreen from "../screens/Cart";
import SignInScreen from "../screens/SignIn";
import SignUpScreen from "../screens/SignUp";
import ForgotPasswordScreen from "../screens/ForgotPassword";
import HostEventScreen from "../screens/HostEvent";

import SearchScreen from "../screens/Search";
import ComponentsScreen from "../screens/Components";

import ProfileScreen from "../screens/Profile";
import SettingsScreen from "../screens/Settings";
import CustomerSupportScreen from "../screens/CustomerSupport";
import NotificationsScreen from "../screens/Notifications";
import PrivacyScreen from "../screens/Privacy";
import AboutScreen from "../screens/About";
import AgreementScreen from "../screens/Agreement";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import { NavigationContainer } from '@react-navigation/native';

import CustomDrawerContent from "./Menu";
import { tabs } from "../constants/";
import Events from "../screens/Events";
import Logout from "../screens/Logout";
import Home from "../screens/Home";
import MapScreen from "../screens/MapScreen";

const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const profile = {
  avatar: Images.Profile,
  name: "Rachel Brown",
  type: "Seller",
  plan: "Pro",
  rating: 4.8
};
function ProfileStack(props) {
  return (
    <Stack.Navigator initialRouteName="Profile" mode="card" headerMode="screen">
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              transparent
              title="Profile"
              scene={scene}
              navigation={navigation}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}
function SettingsStack(props) {
  return (
    <Stack.Navigator initialRouteName="Settings" mode="card" headerMode="screen">
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              transparent
              title="Settings"
              scene={scene}
              navigation={navigation}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}

function CustomerSupportStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Customer Support"
      mode="card"
      headerMode="screen"
    >
      <Stack.Screen
        name="Customer Support"
        component={CustomerSupportScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Customer Support" scene={scene} navigation={navigation} />
          )
        }}
      />
      <Stack.Screen
        name="Agreement"
        component={AgreementScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Agreement"
              scene={scene}
              navigation={navigation}
            />
          )
        }}
      />
      <Stack.Screen
        name="Privacy"
        component={PrivacyScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Privacy"
              scene={scene}
              navigation={navigation}
            />
          )
        }}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="About us"
              scene={scene}
              navigation={navigation}
            />
          )
        }}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Notifications Settings"
              scene={scene}
              navigation={navigation}
            />
          )
        }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Rachel Brown"
              navigation={navigation}
              scene={scene}
            />
          )
        }}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Shopping Cart"
              navigation={navigation}
              scene={scene}
            />
          )
        }}
      />
    </Stack.Navigator>
  );
}

function ComponentsStack(props) {
  return (
    <Stack.Navigator initialRouteName="Components" mode="card" headerMode="screen">
      <Stack.Screen
        name="Components"
        component={ComponentsScreen}
        options={{
          header: ({ navigation }) => (
            <Header title="Components" navigation={navigation} />
          )
        }}
      />
    </Stack.Navigator>
  );
}

// export default function OnboardingStack(props) {
//   return (
//     <Stack.Navigator mode="card" headerMode="none">
//       <Stack.Screen
//         name="Onboarding"
//         component={OnboardingScreen}
//         option={{
//           headerTransparent: true
//         }}
//       />
//       <Stack.Screen name="App" component={AppStack} />
//     </Stack.Navigator>
//   );
// }

function AboutUsStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="About us"
              scene={scene}
              navigation={navigation}
              scene={scene}
            />
          )
        }}
      />
    </Stack.Navigator>
  );
}
function HostEventStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="HostEvent"
        component={HostEventScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Host Event"
              scene={scene}
              navigation={navigation}
              scene={scene}
            />
          )
        }}
      />
    </Stack.Navigator>
  );
}

function EventsNearMeStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="non">
      <Stack.Screen
        name="EventsNearMe"
        component={EventsNearMeScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              search
              title="Events Near Me"
              navigation={navigation}
              scene={scene}
            />
          )
        }}
      />
      <Stack.Screen
        name="Deals"
        component={DealsScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              tabs={tabs.deals}
              title="Best Deals"
              navigation={navigation}
              scene={scene}
            />
          )
        }}
      />
      <Stack.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          header: ({ navigation, scene, route }) => (
            <Header
              back
              tabs={tabs.categories}
              tabIndex={tabs.categories[1].id}
              title="Categories"
              navigation={navigation}
              route={route}
              scene={scene}
            />
          )
        }}
      />
      <Stack.Screen
        name="Category"
        component={CategoryScreen}
        options={{
          header: ({ navigation, scene }) => {
            const { params } = scene.descriptor;
            const title = (params && params.headerTitle) || "Category";
            return (
              <Header
                back
                title={title}
                navigation={navigation}
                scene={scene}
              />
            );
          }
        }}
      />
      <Stack.Screen
        name="Product"
        component={ProductScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              white
              transparent
              title=""
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="Gallery"
        component={GalleryScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              white
              transparent
              title=""
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Rachel Brown"
              navigation={navigation}
              scene={scene}
            />
          )
        }}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Shopping Cart"
              navigation={navigation}
              scene={scene}
            />
          )
        }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header back title="Search" navigation={navigation} scene={scene} />
          )
        }}
      />
    </Stack.Navigator>
  );
}

function HomeStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              search
              color={materialTheme.COLORS.BACK}
              title="Home"
              navigation={navigation}
              scene={scene}
            />
          )
        }}
      />
      <Stack.Screen
        name="Deals"
        component={DealsScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              tabs={tabs.deals}
              title="Best Deals"
              navigation={navigation}
              scene={scene}
            />
          )
        }}
      />
      <Stack.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          header: ({ navigation, scene, route }) => (
            <Header
              back
              tabs={tabs.categories}
              tabIndex={tabs.categories[1].id}
              title="Categories"
              navigation={navigation}
              route={route}
              scene={scene}
            />
          )
        }}
      />
      <Stack.Screen
        name="Category"
        component={CategoryScreen}
        options={{
          header: ({ navigation, scene }) => {
            const { params } = scene.descriptor;
            const title = (params && params.headerTitle) || "Category";
            return (
              <Header
                back
                title={title}
                navigation={navigation}
                scene={scene}
              />
            );
          }
        }}
      />
      <Stack.Screen
        name="Product"
        component={ProductScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              white
              transparent
              title=""
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="Gallery"
        component={GalleryScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              white
              transparent
              title=""
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Rachel Brown"
              navigation={navigation}
              scene={scene}
            />
          )
        }}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Shopping Cart"
              navigation={navigation}
              scene={scene}
            />
          )
        }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header back title="Search" navigation={navigation} scene={scene} />
          )
        }}
      />
    </Stack.Navigator>
  );
}

function AppStack(props) {
  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      // drawerContent={props => (
      //   // <CustomDrawerContent {...props} profile={profile} />
      // )}
      drawerStyle={{
        backgroundColor: "white",
        width: width * 0.8
      }}
      drawerContentOptions={{
        activeTintColor: "white",
        inactiveTintColor: "#000",
        activeBackgroundColor: materialTheme.COLORS.ACTIVE,
        inactiveBackgroundColor: "transparent",
        itemStyle: {
          width: width * 0.74,
          paddingHorizontal: 12,
          // paddingVertical: 4,
          justifyContent: "center",
          alignContent: "center",
          // alignItems: 'center',
          overflow: "hidden"
        },
        labelStyle: {
          fontSize: 18,
          fontWeight: "normal"
        }
      }}
      initialRouteName="Home"
    >
      <Drawer.Screen
        name="Home"
        component={dashboardStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="shop"
              family="GalioExtra"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Host"
        component={HostEventStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="ios-log-in"
              family="ionicon"
              color={focused ? "black" : materialTheme.COLORS.MUTED}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Recent Events"
        component={EventsNearMeStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="grid-on"
              family="material"
              color={focused ? "black" : materialTheme.COLORS.MUTED}
            />
          )
        }}
      />
      {/* <Drawer.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="circle-10"
              family="GalioExtra"
              color={focused ? materialTheme.COLORS.LABEL : materialTheme.COLORS.MUTED}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="circle-10"
              family="GalioExtra"
              color={focused ? materialTheme.COLORS.LABEL : materialTheme.COLORS.MUTED}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Customer Support"
        component={CustomerSupportStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="gears"
              family="font-awesome"
              color={focused ? materialTheme.COLORS.LABEL : materialTheme.COLORS.MUTED}
              style={{ marginRight: -3 }}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Sign Out"
        component={SignInScreen}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="md-person-add"
              family="ionicon"
              color={focused ? materialTheme.COLORS.LABEL : materialTheme.COLORS.MUTED}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Forgot Password"
        component={ForgotPasswordScreen}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="md-person-add"
              family="ionicon"
              color={focused ? materialTheme.COLORS.LABEL : materialTheme.COLORS.MUTED}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Sign Up"
        component={SignUpScreen}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="md-person-add"
              family="ionicon"
              color={focused ? materialTheme.COLORS.LABEL : materialTheme.COLORS.MUTED}
            />
          )
        }}
      />   
      <Drawer.Screen
        name="Sign In"
        component={SignInScreen}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="md-person-add"
              family="ionicon"
              color={focused ? materialTheme.COLORS.LABEL : materialTheme.COLORS.MUTED}
            />
          )
        }}
      />    */}
    </Drawer.Navigator>
  );
}

export default function OnboardingStack() {
  return (
    <Stack.Navigator initialRouteName="SIGN IN" mode="card" headerMode="none">
    <Stack.Screen
        name="SIGN IN"
        component={SignInScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Text size={theme.SIZES.FONT} navigation={navigation} scene={scene} style={{lineHeight: 60, height: 60, backgroundColor: "#F4BD74", marginTop: 22, fontSize: 20, textAlign: "center"}}>
              SIGN IN
            </Text>
          )
        }}
      />
      <Stack.Screen
        name="Sign Up"
        component={SignUpScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header back title="Back" navigation={navigation} scene={scene} />
          )
        }}
      />
      <Stack.Screen
        name="Home"
        component={dashboardStack}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              navigation={navigation}
              scene={scene}
            />
          )
        }}
      />
      <Stack.Screen
        name="FORGOT PASSWORD"
        component={ForgotPasswordScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              navigation={navigation}
              scene={scene}
            />
          )
        }}
      />    
      <Stack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
            back
            title="Privacy"
            scene={scene}
            navigation={navigation}
          />
          )
        }}
      />     
  </Stack.Navigator>
  )
}

function dashboardStack (props) {
  return (
      <Tab.Navigator    
      tabBarLabel={false}   
        initialRouteName="Feed"      
        tabBarOptions={
          {                                
          activeTintColor: '#FFFFFF',
          labelStyle: {
            fontSize: 10,
            numberOfLines:2
          },  
        style: {
          backgroundColor: "black",
          height: "8%",
      }}}>
        <Tab.Screen
          name="HomeStack"
          component={Events}
          options={{            
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        {/* <Tab.Screen
          name="Host Event"
          component={HostEventScreen}
          options={{
            tabBarLabel: 'Host Event',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="calendar" color={color} size={size} />
            ),
          }}
        /> */}       
        <Tab.Screen
          name="Host"
          component={HostEventScreen}
          options={{
            labelStyle:{
              color: "white", 
              numberOfLines:2
            },
            tabBarLabel: 'Host',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="calendar-account" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="UserStack"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="face-profile"
                color={color}
                size={size}
              />
            ),
          }}
        />      
          <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="settings"
                color={color}
                size={size}
              />
            ),
          }}
        /> 
         <Tab.Screen
          name="Logout"
          component={Logout}
          options={{
            tabBarLabel: 'Logout',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="logout" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
  );
}