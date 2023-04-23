import React, {useState, useEffect} from 'react';
import {Text, TextInput, View, Button} from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';



    

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
    <View style={{padding: 10}}>
      <Text style={{padding: 10, fontSize: 42}}>
        Add custom plant
      </Text>
      <TextInput
        style={{height: 40}}
        placeholder="Input plant name:"
        onChangeText={newName => setName(newName)}
        defaultValue={""}
      />
      <TextInput
        style={{height: 40}}
        placeholder="Input watering interval (in days):"
        onChangeText={newInterval => setInterval(newInterval)}
        defaultValue={""}
      />
      <TextInput
        style={{height: 40}}
        placeholder="Input insolation (optional):"
        onChangeText={newSun => setSunlight(newSun)}
        defaultValue={""}
      />
      <TextInput
        style={{height: 40}}
        placeholder="Input plant cycle (optional):"
        onChangeText={newCycle => setCycle(newCycle)}
        defaultValue={""}
      />
      <TextInput
        style={{height: 40}}
        placeholder="Input plant edibility (optional):"
        onChangeText={newEdible => setEdible(newEdible)}
        defaultValue={""}
      />
      <TextInput
        style={{height: 40}}
        placeholder="Is the plant poisonous?:"
        onChangeText={newPoison => setPoisonous(newPoison)}
        defaultValue={""}
      />
      <TextInput
        style={{height: 40}}
        placeholder="Is the plan planted indoor?:"
        onChangeText={newIndoor => setIndoor(newIndoor)}
        defaultValue={""}
      />
      <Button title="Add Plant" onPress={addPlant}/>
      <Button title="Export Database" onPress={exportDb}/>
    </View>
  );
};

export default CustomPlant;