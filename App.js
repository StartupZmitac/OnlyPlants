
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Platform } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useState, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';
import CustomPlant from './src/components/CustomPlant/CustomPlant.js'
import * as React from 'react';
import FindPlant from './src/components/FindPlant/FindPlant';
import {Box, Button, NativeBaseProvider} from "native-base"
import LoadingScreen from './src/components/LoadingScreen/LoadingScreen.js';
import { NativeBaseConfigProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainPage from './src/components/MainPage/MainPage.js';


// expo add expo-sqlite
// expo add expo-file-system
// expo add expo-document-picker
// expo add expo-sharing
// expo add expo-dev-client

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Add custom plant..." component={CustomPlant}/>
          <Tab.Screen name="Add plant..." component={FindPlant}/>
          <Tab.Screen name="Current day" component={MainPage}/>
        </Tab.Navigator>  
      </NavigationContainer>   
    </NativeBaseProvider>
  );
}
