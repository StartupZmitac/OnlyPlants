import * as SQLite from 'expo-sqlite';

export const createWatering = async (
  ) => {
    return tx.executeSql(
      "CREATE TABLE IF NOT EXISTS watering( watering_id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR NOT NULL UNIQUE, interval INTEGER NOT NULL);",
      [],
      (t, res) => {
        console.log(res)
      }
    );
  };