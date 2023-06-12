import * as SQLite from 'expo-sqlite';
import React, {useState, useEffect} from 'react';
import * as FileSystem from 'expo-file-system';
const db = SQLite.openDatabase('onlyplants.db')

export const createTables = async (
  ) => {
    return new Promise((resolve, reject) => {
      db._db.exec(
        [{ sql: 'PRAGMA foreign_keys = ON;', args: [] }],
        false,
        () => console.log('Foreign keys turned on'),
      );

      db.transaction(
        tx => {
          tx.executeSql("CREATE TABLE IF NOT EXISTS watering( watering_id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR NOT NULL UNIQUE, interval INTEGER NOT NULL);", ()  => {
          }, (t, res) => {
            console.log(res)
          })
          tx.executeSql("CREATE TABLE IF NOT EXISTS location( location_id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR NOT NULL UNIQUE, location VARCHAR UNIQUE);", ()  => {
          }, (t, res) => {
            console.log(res);
          })
          tx.executeSql("CREATE TABLE IF NOT EXISTS groups( group_id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR NOT NULL UNIQUE, first_name VARCHAR, location_id INTEGER, CONSTRAINT fk_location FOREIGN KEY (location_id) REFERENCES location(location_id));", ()  => {
          }, (t, res) => {
            console.log(res);
          })
          tx.executeSql("CREATE TABLE IF NOT EXISTS user_info (id INTEGER PRIMARY KEY, pet INTEGER DEFAULT 0 NOT NULL, username TEXT NOT NULL UNIQUE);", ()  => {
          }, (t, res) => {
            console.log(res);
          })
          tx.executeSql("CREATE TABLE IF NOT EXISTS plants ( id INTEGER PRIMARY KEY, name TEXT NOT NULL UNIQUE, sunlight INTEGER, cycle INTEGER, edible INTEGER, poisonous INTEGER, custom INTEGER NOT NULL, watering INTEGER NOT NULL, FOREIGN KEY (watering) REFERENCES watering(watering_id));", ()  => {
          }, (t, res) => {
            console.log(res);
          })
          tx.executeSql("CREATE TABLE IF NOT EXISTS planted(id INTEGER PRIMARY KEY, date_planted TEXT NOT NULL, date_watered TEXT NOT NULL, date_notified TEXT, interval INTEGER NOT NULL, custom_name TEXT, inside INTEGER NOT NULL, plant_id_fk INTEGER NOT NULL, group_id_fk INTEGER, location_id_fk INTEGER, FOREIGN KEY (plant_id_fk) REFERENCES plants(id), FOREIGN KEY (group_id_fk) REFERENCES groups(group_id), FOREIGN KEY (location_id_fk) REFERENCES location(location_id));", ()  => {
          }, (t, res) => {
            console.log(res);
          })
        },
        (t, error) => { console.log("db error"); console.log(error); resolve() },
        (t, success) => { resolve(success)}
      )
    })
};

//insert
export const addPlant = (name, sunlight, cycle, edible, poisonous, interval, successFunc) => {
  db.transaction(tx => {
    tx.executeSql('INSERT INTO plants (name, sunlight, cycle, edible, poisonous, custom, watering) values (?,?,?,?,?,?,?);', [name, sunlight, cycle, edible, poisonous, true, interval],
      (txObj, success) => {successFunc()},
      (txObj, error) => {console.log(error);}
    );
  })
}

export const addPlantAPI = (name, sunlight, cycle, edible, poisonous, interval, successFunc) => {
  db.transaction(tx => {
    tx.executeSql('INSERT INTO plants (name, sunlight, cycle, edible, poisonous, custom, watering) values (?,?,?,?,?,?,?);', [name, sunlight, cycle, edible, poisonous, false, interval],
      (txObj, success) => {successFunc()},
      (txObj, error) => {console.log(error);}
    );
  })
}

export const addWatering = (name, interval, successFunc) => {
  db.transaction(tx => {
    tx.executeSql('INSERT INTO watering (name, interval) values (?,?);', [name, interval],
      (txObj, success) => {successFunc()},
      (txObj, error) => {console.log(error);}
    );
  })
}

export const addLocation = (name, location, successFunc) => {
  db.transaction(tx => {
    tx.executeSql('INSERT INTO location (name, location) values (?,?);', [name, location],
      (txObj, success) => {successFunc()},
      (txObj, error) => {console.log(error);}
    );
  })
}

export const addGroups = (name, first_name, location_id, successFunc) => {
  db.transaction(tx => {
    tx.executeSql('INSERT INTO groups (name, first_name, location_id) values (?,?,?);', [name, first_name, location_id],
      (txObj, success) => {successFunc()},
      (txObj, error) => {console.log(error);}
    );
  })
}

export const addUserInfo = (pet, username, successFunc) => {
  db.transaction(tx => {
    tx.executeSql('INSERT INTO user_info (pet, username) values (?,?);', [pet, username],
      (txObj, success) => {successFunc()},
      (txObj, error) => {console.log(error);}
    );
  })
}

export const addPlanted = (date_planted, date_watered, date_notified, interval, custom_name, inside, plant_id, group_id, location_id, successFunc) => {
  db.transaction(tx => {
    tx.executeSql('INSERT INTO planted (date_planted, date_watered, date_notified, interval, custom_name, inside, plant_id_fk, group_id_fk, location_id_fk) values (?,?,?,?,?,?,?,?,?);', [date_planted, date_watered, date_notified, interval, custom_name, inside, plant_id, group_id, location_id],
      (txObj, success) => {successFunc()},
      (txObj, error) => {console.log(error);}
    );
  })
}

//delete
export const deletePlant = (plant_id, successFunc) => {
  db.transaction(tx => {
    tx.executeSql('DELETE FROM plants WHERE id=?', [plant_id],
    (txObj, success) => {successFunc()},
    (txObj, error) => {console.log(error);}
    );
  })
}

export const deleteWatering = (watering_id, successFunc) => {
  db.transaction(tx => {
    tx.executeSql('DELETE FROM watering WHERE watering_id=?', [watering_id],
    (txObj, success) => {successFunc()},
    (txObj, error) => {console.log(error);}
    );
  })
}

export const deleteLocation = (location_id, successFunc) => {
  db.transaction(tx => {
    tx.executeSql('DELETE FROM location WHERE location_id=?', [location_id],
    (txObj, success) => {successFunc()},
    (txObj, error) => {console.log(error);}
    );
  })
}

export const deleteGroups = (group_id, successFunc) => {
  db.transaction(tx => {
    tx.executeSql('DELETE FROM location WHERE group_id=?', [group_id],
    (txObj, success) => {successFunc()},
    (txObj, error) => {console.log(error);}
    );
  })
}

export const deleteUserInfo = (id, successFunc) => {
  db.transaction(tx => {
    tx.executeSql('DELETE FROM user_info WHERE id=?', [id],
    (txObj, success) => {successFunc()},
    (txObj, error) => {console.log(error);}
    );
  })
}

export const deletePlanted = (id, successFunc) => {
  db.transaction(tx => {
    tx.executeSql('DELETE FROM planted WHERE id=?', [id],
    (txObj, success) => {successFunc()},
    (txObj, error) => {console.log(error);}
    );
  })
}

//select
export const selectAllPlants = (getAllPlants) => {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM plants', [],
    (_, {rows: {_array}}) => {
      getAllPlants(_array)
    });
  },
  (t, error) => { console.log("db error load plants"); console.log(error) },
  (_t, _success) => { console.log("loaded plants")}
  );
}

export const selectPlant = (id, getPlant) => {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM plants WHERE id=?', [id],
    (_, {rows: {_array}}) => {
      //console.log(_array)
      getPlant(_array)
    });
  },
  (_t, error) => { console.log("db error load plants"); console.log(error) },
  (_t, _success) => { console.log("loaded plant")}
  );
}

export const selectAllWatering = (getAllWatering) => {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM watering', [],
    (_, {rows: {_array}}) => {
      //_array.forEach((entry)=>{console.log(entry)})
      getAllWatering(_array)
    });
  },
  (_t, error) => { console.log("db error load watering"); console.log(error) },
  (_t, _success) => { console.log("loaded watering")}
  );
}

export const selectWatering = (id, getWatering) => {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM watering WHERE watering_id=?', [id],
    (_, {rows: {_array}}) => {
      //console.log(id)
      getWatering(_array)
    });
  },
  (_t, error) => { console.log("db error load watering"); console.log(error) },
  (_t, _success) => { console.log("loaded watering (singular)")}
  );
}

export const selectAllLocation = (getAllLocation) => {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM location', [],
    (_, {rows: {_array}}) => {
      getAllLocation(_array)
    });
  },
  (t, error) => { console.log("db error load locations"); console.log(error) },
  (_t, _success) => { console.log("loaded locations")}
  );
}

export const selectAllGroups = (getAllGroups) => {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM groups', [],
    (_, {rows: {_array}}) => {
      getAllGroups(_array)
    });
  },
  (t, error) => { console.log("db error load groups"); console.log(error) },
  (_t, _success) => { console.log("loaded gorups")}
  );
}

export const selectUserInfo = (getAllUserInfo) => {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM user_info', [],
    (_, {rows: {_array}}) => {
      getAllUserInfo(_array)
    });
  },
  (t, error) => { console.log("db error load users"); console.log(error) },
  (_t, _success) => { console.log("loaded users")}
  );
}

export const selectPlanted = (getAllPlanted) => {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM planted', [],
    (_, {rows: {_array}}) => {
      getAllPlanted(_array)
    });
  },
  (t, error) => { console.log("db error load planted"); console.log(error) },
  (_t, _success) => { console.log("loaded planted")}
  );
}

export const selectInterval = (plantId, getInterval) => {
  db.transaction(tx => {
    tx.executeSql('SELECT interval FROM plants JOIN watering ON plants.watering = watering.watering_id where plants.id = ?', [plantId],
    (_, {rows: {_array}}) => {
      getInterval(_array)
    });
  },
  (t, error) => { console.log("db error select interval from plant"); console.log(error) },
  (_t, _success) => { console.log("loaded select interval from plant")}
  );
}

//others
export const initWatering = () => {
  addWatering('Frequent', 3, ()=>{});
  addWatering('Average', 6, ()=>{});
  addWatering('Minimum', 9, ()=>{});
}

export const dropEverything = () => {
  db.transaction(tx => {
    //tx.executeSql("DELETE FROM planted;")
    //tx.executeSql("DELETE FROM plants;")
    tx.executeSql("DELETE FROM groups")
    //tx.executeSql("DELETE FROM location")
    //tx.executeSql("DELETE FROM watering;")
    
    //tx.executeSql("DELETE FROM user_info;")
    //tx.executeSql("DROP TABLE IF EXISTS watering;")
    
    //tx.executeSql("DROP TABLE IF EXISTS user_info;")
    //tx.executeSql("DROP TABLE IF EXISTS plants;")
    //tx.executeSql("DROP TABLE IF EXISTS planted;")
    //tx.executeSql("DROP TABLE IF EXISTS groups;")
    //tx.executeSql("DROP TABLE IF EXISTS location;")
      },
      (t, error) => { console.log("db error dropping tables"); console.log(error) },
      (_t, _success) => { console.log("dropped tables")}
    )
}

export const deleteDb = () => {
  db.closeAsync();
  db.deleteAsync();
}

export const exportDb = async () => {
  if (Platform.OS === "android") {
    const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
    console.log(permissions);
    if (permissions.granted) {
      
      const base64 = await FileSystem.readAsStringAsync(
        FileSystem.documentDirectory + 'SQLite/onlyplants.db',
        {
          encoding: FileSystem.EncodingType.Base64
        }
      );

      await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, 'onlyplants.db', 'application/octet-stream')
      .then(async (uri) => {
        await FileSystem.writeAsStringAsync(uri, base64, { encoding : FileSystem.EncodingType.Base64 });
      })
      .catch((e) => console.log(e));
    } else {
      console.log("Permission not granted");
    }
  } else {
    await Sharing.shareAsync(FileSystem.documentDirectory + 'SQLite/onlyplants.db');
  }
}
