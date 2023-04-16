import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Platform } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useState, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';

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


export default function App() {
  const [db, setDb] = useState(SQLite.openDatabase('PlantsDatabase.db'));
  const [isLoading, setIsLoading] = useState(true);
  const [plants, setPlants] = useState([]);
  const [currentPlant, setCurrentPlant] = useState(undefined);

 

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

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS plants (id INTEGER PRIMARY KEY AUTOINCREMENT, plant TEXT)')
    });

    db.transaction(tx => {
      tx.executeSql('SELECT * FROM plants', null,
        (txObj, resultSet) => setPlants(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });

    setIsLoading(false);
  }, [db]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading plants...</Text>
      </View>
    );
  }

  const addPlant = () => {
    db.transaction(tx => {
      tx.executeSql('INSERT INTO plants (plant) values (?)', [currentPlant],
        (txObj, resultSet) => {
          let existingPlants = [...plants];
          existingPlants.push({ id: resultSet.insertId, plant: currentPlant});
          setPlants(existingPlants);
          setCurrentPlant(undefined);
        },
        (txObj, error) => console.log(error)
      );
    });
  }

  const deletePlant = (id) => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM plants WHERE id = ?', [id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            let existingPlants = [...plants].filter(plant => plant.id !== id);
            setPlants(existingPlants);
          }
        },
        (txObj, error) => console.log(error)
      );
    });
  };

  const updatePlant = (id) => {
    db.transaction(tx => {
      tx.executeSql('UPDATE plants SET plant = ? WHERE id = ?', [currentPlant, id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            let existingPlants = [...plants];
            const indexToUpdate = existingPlants.findIndex(plant => plant.id === id);
            existingPlants[indexToUpdate].plant = currentPlant;
            setPlants(existingPlants);
            setCurrentPlant(undefined);
          }
        },
        (txObj, error) => console.log(error)
      );
    });
  };

  const showPlant = () => {
    return plants.map((plant, index) => {
      return (
        <View key={index} style={styles.row}>
          <Text>{plant.plant}</Text>
          <Button title='Delete' onPress={() => deletePlant(plant.id)} />
          <Button title='Update' onPress={() => updatePlant(plant.id)} />
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <TextInput value={currentPlant} placeholder='plant' onChangeText={setCurrentPlant} />
      <Button title="Add Plant" onPress={addPlant} />
      {showPlant()}
      <Button title="Export Db" onPress={exportDb} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    margin: 8
  }
});