import React, {useState, useEffect} from 'react';
import styles from './MyProfile.style.js'
import {Box, Button, NativeBaseProvider, Column, Image, List} from "native-base"
import { deleteDb, dropEverything, exportDb, selectPlanted } from '../../database/PlantsDb.js';
import { NavigationContainer, } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { cancelAllPushNotifications, cancelPushNotification } from '../../notifications/Notifications.js';
import {TouchableOpacity} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';


//const db = SQLite.openDatabase('onlyplants.db')

const MyProfile = ( { navigation } ) =>{

    const [image, setImage] = useState(null);
    const [plantedList, setPlantedList] = useState([]);

    useEffect(() => {
      selectPlanted(setPlantedList);
    }, []);
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

    const saveToCSV = async () =>{
      if (Platform.OS === "android") {
        const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
        console.log(permissions);
        if (permissions.granted) {
          const base64 = await FileSystem.readAsStringAsync(
            FileSystem.documentDirectory + 'SQLite/onlyplants.db',
            {
              encoding: FileSystem.EncodingType.UTF8
            }
          );
        }
    
          await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, 'onlyplantsCSV.csv', 'application/octet-stream')
          .then(async (uri) => {
            const firstLine = ["Date Planted", "Date Watered", "Date Notified", "Interval In Days", "Name", "Is Inside?", "\n"]
            await FileSystem.writeAsStringAsync(uri, 'Date Planted', { encoding : FileSystem.EncodingType.UTF8 });
            await FileSystem.writeAsStringAsync(uri, 'Date Watered', { encoding : FileSystem.EncodingType.UTF8 });
            await FileSystem.writeAsStringAsync(uri, 'Date Notified', { encoding : FileSystem.EncodingType.UTF8 });
            await FileSystem.writeAsStringAsync(uri, 'Interval In Days', { encoding : FileSystem.EncodingType.UTF8 });
            await FileSystem.writeAsStringAsync(uri, 'Name', { encoding : FileSystem.EncodingType.UTF8 });
            await FileSystem.writeAsStringAsync(uri, 'Is Inside?', { encoding : FileSystem.EncodingType.UTF8 });
            await FileSystem.writeAsStringAsync(uri, '\n', { encoding : FileSystem.EncodingType.UTF8 });
             
            //  for(i=0; i<firstLine.length; i++)
            //  {
            //    //tempPlanted = JSON.stringify(plantedList.at(i)).split(":").slice(1).join(":");
            //    //newPlanted = tempPlanted.split(":")[1];
            //   await FileSystem.writeAsStringAsync(uri, firstLine[i], { encoding : FileSystem.EncodingType.UTF8 });
            
            //    }
            tempPlanted=''
            for(i=0; i<plantedList.length; i++)
            {
              tempPlanted += JSON.stringify(plantedList.at(i)) +'\n';
              //parsedPlanted = JSON.parse(tempPlanted);
              //newPlanted = tempPlanted.split(":")[1];
              
            }
            await FileSystem.writeAsStringAsync(uri, tempPlanted, { encoding : FileSystem.EncodingType.UTF8 });
        //     data = null;
        //     db.transaction(tx => {
        //       tx.executeSql('SELECT * FROM planted', [], (_, { rows }) => {
        //         data = rows._array; // Get the query results as an array               
        //       });
        //     })
        //     const csvString = data.map(row => Object.values(row).join(',')).join('\n'); // Convert data to CSV string formatconst csvString = data.map(row => Object.values(row).join(',')).
        //     await FileSystem.writeAsStringAsync(uri, csvString, { encoding : FileSystem.EncodingType.UTF8 });
        //   })
        //   .catch((e) => console.log(e));
        // } else {
        //   console.log("Permission not granted");
        // }
      })}
       else {
        //await Sharing.shareAsync(FileSystem.documentDirectory + 'SQLite/onlyplants.db');
      }
    }

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
                          <Button size="lg" onPress={() => {saveToCSV();}} style={styles.button}> Export CSV </Button>
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