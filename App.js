import CustomPlant from './src/components/CustomPlant/CustomPlant.js'
import MyProfile from './src/components/MyProfile/MyProfile.js'
import * as React from 'react';
import FindPlant from './src/components/FindPlant/FindPlant';
import {Box, Button, NativeBaseProvider} from "native-base"
import LoadingScreen from './src/components/LoadingScreen/LoadingScreen.js';
import { NativeBaseConfigProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import setUpDb from './src/hooks/SetUpDb.js';
import styles from './App.style.js'
import MyPlantsManagement from './src/components/MyPlantsManagement/MyPlantsManagement.js';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export function MyProfileNavigation() {
  return (
          <Stack.Navigator>
              <Stack.Screen name="MyProfile" component={MyProfile} />
              <Stack.Screen name="MyPlantsManagements" component={MyPlantsManagement} />
          </Stack.Navigator>
        )
}

export default function App() {

  const isDBLoadingComplete = setUpDb();
  if(!isDBLoadingComplete){
    return(
      <LoadingScreen />
    );
  } else {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: styles.navigation,
          headerStyle: styles.header,
          headerTitleStyle: {
            color: "#F7F6DC",
          }
        }}
      >
        <Tab.Screen
          name="My profile..."
          component={MyProfileNavigation}
          options={{
            tabBarIcon: ({ focused }) => (
              <AntDesign name="profile" size={30} color="#FFC090" />
            ),
          }}
        />
        <Tab.Screen
          name="Add plant..."
          component={FindPlant}
          options={{
            tabBarIcon: ({ focused }) => (
              <AntDesign name="pluscircle" size={40} color="#FFC090" />
            ),
          }}
        />
        <Tab.Screen
          name="Add custom plant..."
          component={CustomPlant}
          options={{
            tabBarIcon: ({ focused }) => (
              <Feather name="settings" size={30} color="#FFC090" />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>  
    </NativeBaseProvider>
  );
  }
  
}