import React, {useState, useEffect} from 'react';
import {Text, TextInput, View, Button} from 'react-native';
import '../../../database/PlantsDB'
import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';

const CustomPlant = () => {
  const [name, setName] = useState('');
  const [interval, setInterval] = useState('');
  const [sunlight, setSunlight] = useState('');
  const [cycle, setCycle] = useState('');
  const [edible, setEdible] = useState('');
  const [poisonous, setPoisonous] = useState('');
  const [indoor, setIndoor] = useState('');
  const [db, setDb] = useState(SQLite.openDatabase('PlantsDatabasev2.db'));

  const exportDb = async () => {
    if (Platform.OS === "android") {
      const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permissions.granted) {
        const base64 = await FileSystem.readAsStringAsync(
          FileSystem.documentDirectory + 'SQLite/PlantsDatabasev2.db',
          {
            encoding: FileSystem.EncodingType.Base64
          }
        );

        await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, 'PlantsDatabasev2.db', 'application/octet-stream')
        .then(async (uri) => {
          await FileSystem.writeAsStringAsync(uri, base64, { encoding : FileSystem.EncodingType.Base64 });
        })
        .catch((e) => console.log(e));
      } else {
        console.log("Permission not granted");
      }
    } else {
      await Sharing.shareAsync(FileSystem.documentDirectory + 'SQLite/PlantsDatabasev2.db');
    }
  }

  const addPlant = () => {
    db.transaction(tx => {
      tx.executeSql('INSERT INTO plants (name, sunlight, cycle, edible, poisonous, indoor, custom, watering) values (?,?,?,?,?,?,?,?);', [name, sunlight, cycle, edible, poisonous, indoor, true, 1],
        (txObj, resultSet) => {},
        (txObj, error) => console.log(error)
      );
    })
  }

  const drop_everything = () => {
    db.transaction(tx => {
      tx.executeSql("DROP TABLE IF EXISTS watering;")
      tx.executeSql("DROP TABLE IF EXISTS location;")
      tx.executeSql("DROP TABLE IF EXISTS user_info;")
      tx.executeSql("DROP TABLE IF EXISTS plants;")
      tx.executeSql("DROP TABLE IF EXISTS planted;")
      tx.executeSql("DROP TABLE IF EXISTS groups;")
        }
      )
  }

  const init_database = () => {

    db._db.exec(
      [{ sql: 'PRAGMA foreign_keys = ON;', args: [] }],
      false,
      () => console.log('Foreign keys turned on'),
    );
  
    db.transaction(tx => {
      
      tx.executeSql("CREATE TABLE IF NOT EXISTS watering( watering_id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR NOT NULL UNIQUE, interval INTEGER NOT NULL);", ()  => {
      }, (t, res) => {
        console.log(res)
      })
      tx.executeSql("CREATE TABLE IF NOT EXISTS location( location_id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR NOT NULL UNIQUE, location VARCHAR NOT NULL UNIQUE);", ()  => {
      }, (t, res) => {
        console.log(res);
      })
      tx.executeSql("CREATE TABLE IF NOT EXISTS groups( group_id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR NOT NULL UNIQUE, first_name VARCHAR, location_id INTEGER, CONSTRAINT fk_location FOREIGN KEY (location_id) REFERENCES location(location_id));", ()  => {
      }, (t, res) => {
        console.log(res);
      })
      tx.executeSql("CREATE TABLE IF NOT EXISTS user_info (id INTEGER PRIMARY KEY, pet INTEGER NOT NULL, username TEXT NOT NULL UNIQUE);", ()  => {
      }, (t, res) => {
        console.log(res);
      })
      tx.executeSql("CREATE TABLE IF NOT EXISTS plants ( id INTEGER PRIMARY KEY, name TEXT NOT NULL UNIQUE, sunlight INTEGER NOT NULL, cycle INTEGER NOT NULL, edible INTEGER NOT NULL, poisonous INTEGER NOT NULL, indoor INTEGER NOT NULL, custom INTEGER NOT NULL, watering INTEGER NOT NULL, FOREIGN KEY (watering) REFERENCES watering(id));", ()  => {
      }, (t, res) => {
        console.log(res);
      })
      tx.executeSql("CREATE TABLE IF NOT EXISTS planted(id INTEGER PRIMARY KEY, date_planted TEXT NOT NULL, date_watered TEXT NOT NULL, date_notified TEXT NOT NULL, interval INTEGER NOT NULL, custom_name TEXT NOT NULL, inside INTEGER NOT NULL, plant_id INTEGER NOT NULL, group_id INTEGER NOT NULL, location_id INTEGER NOT NULL, FOREIGN KEY (plant_id) REFERENCES plants(id), FOREIGN KEY (group_id) REFERENCES groups(id), FOREIGN KEY (location_id) REFERENCES location(id));", ()  => {
      }, (t, res) => {
        console.log(res);
      })

      tx.executeSql("INSERT INTO watering (name, interval) values ('frequent', 2);") //admin page to add these
      tx.executeSql("INSERT INTO location (name, location) values ('Katowice', '50.270908, 19.039993');")
    });
  }

  useEffect(() => {
    init_database();
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
      <Button title="Drop" onPress={drop_everything}/>
    </View>
  );
};

export default CustomPlant;