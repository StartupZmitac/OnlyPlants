import React, {useState, useEffect} from 'react';
import styles from './MyProfile.style.js'
import {Box, Button, NativeBaseProvider, Column, Image} from "native-base"
import { deleteDb, dropEverything, exportDb } from '../../database/PlantsDb.js';
import { NavigationContainer, } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { cancelAllPushNotifications, cancelPushNotification } from '../../notifications/Notifications.js';
import {TouchableOpacity} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyProfile = ( { navigation } ) =>{

    const [image, setImage] = useState(null);

    //setImage('https://media.npr.org/assets/img/2021/11/10/white-tailed-deer-1-ac07593f0b38e66ffac9178fb0c787ca75baea3d.jpg');

    const storeData = async (value) => {
        try {
          await AsyncStorage.setItem('image', value);
        } catch (e) {
          // saving error
        }
      };
      
      const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('image');
          if (value !== null) {
            // value previously stored
            setImage(value);
          }
        } catch (e) {
          // error reading value
        }
      };
    
      useEffect(() => {    
        getData();
      });

    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      //console.log(result);
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
        storeData(result.assets[0].uri);
      }
    };

    return (
        <NativeBaseProvider>
            <Box>
                <Box style={styles.mainBody}>
                    <Box style={styles.choiceBox}>
                        <Box style={styles.photoBox}>
                        <TouchableOpacity onPress={pickImage}>
                        <Image source = {{uri: image}}
                            alt="My Profile Image"
                            style = {styles.profileImage}
                        />
                        </TouchableOpacity>
                        </Box>
                        <Column space={3} alignItems="flex-end" position="absolute" bottom="5%">
                        <Button size="lg" onPress={() => {navigation.navigate('MyPlantsManagement')} } style={styles.button}> My plants </Button>
                        <Button size="lg" onPress={() => {navigation.navigate('ManageGroups')} } style={styles.button}> Group plants </Button>
                        <Button size="lg" onPress={() => {cancelAllPushNotifications();}} style={styles.button}> Pets </Button>
                        {
                          //<Button size="lg" onPress={deleteDb} style={styles.button}> Drop Database </Button>
                          //<Button size="lg" onPress={exportDb} style={styles.button}> Export Database </Button>
                          }
                        </Column>
                    </Box>
                </Box>
            </Box>
    </NativeBaseProvider>
        
    );
};

export default MyProfile;