
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Platform } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useState, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';
import CustomPlant from './src/components/CustomPlant/CustomPlant.js'
import * as React from 'react';
import FindPlant from './src/components/FindPlant/FindPlant';
import MyProfile from './src/components/MyProfile/MyProfile.js';
import {Box, Button, NativeBaseProvider} from "native-base"
import LoadingScreen from './src/components/LoadingScreen/LoadingScreen.js';
import { NativeBaseConfigProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import setUpDb from './src/hooks/SetUpDb.js';

// expo add expo-sqlite
// expo add expo-file-system
// expo add expo-document-picker
// expo add expo-sharing
// expo add expo-dev-client

/*
  For testing expo-document-picker on iOS we need a standalone app 
  which is why we install expo-dev-client
  
  If you don't have eas installed then install using the following command:
  npm install -g eas-cli
  eas login
  eas build:configure
  Build for local development on iOS or Android:
  eas build -p ios --profile development --local
  OR
  eas build -p android --profile development --local
  May need to install the following to build locally (which allows debugging)
  npm install -g yarn
  brew install fastlane
  After building install on your device:
  For iOS (simulator): https://docs.expo.dev/build-reference/simulators/
  For Android: https://docs.expo.dev/build-reference/apk/
  Run on installed app:
  expo start --dev-client
*/
//Tutaj generalnie troche zrobiłem bałagan, bo stack navigator będzie potrzebny do czegoś innego - narazie chcemy tab navigator
const Tab = createBottomTabNavigator();
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
        <Tab.Navigator>
          <Tab.Screen name="Add custom plant..." component={CustomPlant}/>
          <Tab.Screen name="Add plant..." component={MyProfile}/>
        </Tab.Navigator>  
      </NavigationContainer>   
    </NativeBaseProvider>
  );
  }
  
}
