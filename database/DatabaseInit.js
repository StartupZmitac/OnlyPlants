// import React, {useState, useEffect} from 'react';
// import {Text, TextInput, View, Button} from 'react-native';
// import * as FileSystem from 'expo-file-system';
// import * as SQLite from 'expo-sqlite';

// //const [db, setDb] = useState(SQLite.openDatabase('PlantsDatabase.db'));


// const init_database = () =>{
// db.transaction(tx => {
//     //tx.executeSql("DROP TABLE IF EXISTS custom")
//     tx.executeSql(```CREATE TABLE IF NOT EXISTS watering
//     (
//       id INTEGER PRIMARY KEY,
//       name TEXT NOT NULL,
//       interval INTEGER NOT NULL
//     );```)
//     tx.executeSql(```CREATE TABLE IF NOT EXISTS location
//     (
//       id INTEGER PRIMARY KEY,
//       name TEXT NOT NULL,
//       location TEXT NOT NULL
//     );```)
//     tx.executeSql(```CREATE TABLE IF NOT EXISTS group
//     (
//       id INTEGER PRIMARY KEY,
//       name TEXT NOT NULL,
//       location_id INTEGER NOT NULL,
//       FOREIGN KEY (location_id) REFERENCES location(id)
//     );```)
//     tx.executeSql(```CREATE TABLE IF NOT EXISTS user_info
//     (
//       id INTEGER PRIMARY KEY,
//       pet INTEGER NOT NULL,
//       username TEXT NOT NULL
//     );```)
//     tx.executeSql(```CREATE TABLE IF NOT EXISTS plants
//     (
//       id INTEGER PRIMARY KEY,
//       name TEXT NOT NULL,
//       sunlight INTEGER NOT NULL,
//       cycle INTEGER NOT NULL,
//       edible INTEGER NOT NULL,
//       poisonous INTEGER NOT NULL,
//       indoor INTEGER NOT NULL,
//       custom INTEGER NOT NULL,
//       watering INTEGER NOT NULL,
//       FOREIGN KEY (watering) REFERENCES watering(id)
//     );```)
//     tx.executeSql(```CREATE TABLE IF NOT EXISTS planted
//     (
//       id INTEGER PRIMARY KEY,
//       date_planted TEXT NOT NULL,
//       date_watered TEXT NOT NULL,
//       date_notified TEXT NOT NULL,
//       interval INTEGER NOT NULL,
//       custom_name TEXT NOT NULL,
//       inside INTEGER NOT NULL,
//       plant_id INTEGER NOT NULL,
//       group_id INTEGER NOT NULL,
//       location_id INTEGER NOT NULL,
//       FOREIGN KEY (plant_id) REFERENCES plants(id),
//       FOREIGN KEY (group_id) REFERENCES group(id),
//       FOREIGN KEY (location_id) REFERENCES location(id)
//     );```)
//   });
// };
// export default init_database;
