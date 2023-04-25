import React, {useState, useEffect} from 'react';
import {TextInput, View, Text} from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import styles from './CustomPlant.style.js'
import {Box, Button, IconButton, NativeBaseProvider, Heading, Container, Input, Column, Row} from "native-base"

const CustomPlant = () => {
  //const [currentPlant, setCurrentPlant] = useState(undefined);
  const [name, setName] = useState('');
  //const [watering, setWatering] = useState('');
  const [interval, setInterval] = useState('');
  const [sunlight, setSunlight] = useState('');
  const [cycle, setCycle] = useState('');
  const [edible, setEdible] = useState('');
  const [poisonous, setPoisonous] = useState('');
  const [indoor, setIndoor] = useState('');
  const [db, setDb] = useState(SQLite.openDatabase('PlantsDatabase.db'));

  const exportDb = async () => {
    if (Platform.OS === "android") {
      const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permissions.granted) {
        const base64 = await FileSystem.readAsStringAsync(
          FileSystem.documentDirectory + 'SQLite/PlantsDatabase.db',
          {
            encoding: FileSystem.EncodingType.Base64
          }
        );

        await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, 'PlantsDatabase.db', 'application/octet-stream')
        .then(async (uri) => {
          await FileSystem.writeAsStringAsync(uri, base64, { encoding : FileSystem.EncodingType.Base64 });
        })
        .catch((e) => console.log(e));
      } else {
        console.log("Permission not granted");
      }
    } else {
      await Sharing.shareAsync(FileSystem.documentDirectory + 'SQLite/PlantsDatabase.db');
    }
  }

  const addPlant = () => {
    db.transaction(tx => {
      tx.executeSql('INSERT INTO custom (name, interval, sunlight, cycle, edible, poisonous, indoor) values (?,?,?,?,?,?,?)', [name, interval, sunlight, cycle, edible, poisonous, indoor],
        (txObj, resultSet) => {},
        (txObj, error) => console.log(error)
      );
    });
  }

  useEffect(() => {
    db.transaction(tx => {
      //tx.executeSql("DROP TABLE IF EXISTS custom")
      tx.executeSql("CREATE TABLE IF NOT EXISTS custom (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT,"
      + "interval INTEGER, sunlight TEXT, cycle TEXT, edible INTEGER, poisonous INTEGER, indoor INTEGER)")
    });
  }, [db]);
  
  return (
    <NativeBaseProvider>
      <Box style={{width: 450}}>
        <Box style={styles.titleBox}>
          <Heading mt={3} fontSize="4xl" style={{marginTop: '20%', color: '#F7F6DC'}}>Adding custom plant...</Heading>
        </Box>
        <Box style={styles.mainBody}>
          <Box style={styles.choiceBox}>
            <Column space={4} alignItems="center">
            <Input 
              variant="rounded"
              placeholder="Input insolation (optional):"
              onChangeText={newSun => setSunlight(newSun)}
              defaultValue={""}
              placeholderTextColor="#F7F6DC"
              fontSize={'20'} 
              style={styles.inputField} />
            <Input 
              variant="rounded"
              placeholder="Input plant cycle (optional):"
              onChangeText={newCycle => setCycle(newCycle)}
              defaultValue={""}
              placeholderTextColor="#F7F6DC"
              fontSize={'20'} 
              style={styles.inputField} />
            <Input 
              variant="rounded"
              placeholder="Input plant edibility (optional):"
              onChangeText={newEdible => setEdible(newEdible)}
              defaultValue={""}
              placeholderTextColor="#F7F6DC"
              fontSize={'20'} 
              style={styles.inputField} />
            <Input 
              variant="rounded"
              placeholder="Is the plant poisonous?:"
              onChangeText={newPoison => setPoisonous(newPoison)}
              defaultValue={""}
              placeholderTextColor="#F7F6DC"
              fontSize={'20'} 
              style={styles.inputField} />
            <Input 
              variant="rounded"
              placeholder="Is the plan planted indoor?:"
              onChangeText={newIndoor => setIndoor(newIndoor)}
              defaultValue={""}
              placeholderTextColor="#F7F6DC"
              fontSize={'20'} 
              style={styles.inputField} />
            </Column>
          </Box>
          <Row style={{alignItems: 'center', padding: '10%'}}>
          <Button size="lg" onPress={addPlant} style={{backgroundColor: '#FFC090', color: "#F7F6DC", marginRight: '10%'}}>Add Plant</Button>
          <Button size="lg" onPress={exportDb} style={styles.button}> Export </Button>
          </Row>
        </Box>
      </Box>
    </NativeBaseProvider>
  );
};

export default CustomPlant;   
   