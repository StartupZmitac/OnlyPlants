import * as SQLite from 'expo-sqlite';
import React, {useState, useEffect} from 'react';
import * as FileSystem from 'expo-file-system';
const db = SQLite.openDatabase('onlyplants.db')

const createWatering = async (
  ) => {
    return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS watering( watering_id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR NOT NULL UNIQUE, interval INTEGER NOT NULL);",
          (t, res) => {
            console.log(res)
          }
        );
      },
      (t, error) => { console.log("db error"); console.log(error); resolve() },
      (t, success) => { resolve(success)}
    )
    })
};

//insert
const addPlant = (name, sunlight, cycle, edible, poisonous, indoor, interval, successFunc) => {
  db.transaction(tx => {
    tx.executeSql('INSERT INTO plants (name, sunlight, cycle, edible, poisonous, indoor, custom, watering) values (?,?,?,?,?,?,?,?);', [name, sunlight, cycle, edible, poisonous, indoor, true, interval],
      (txObj, success) => {successFunc()},
      (txObj, error) => {console.log(error);}
    );
  })
}

const addPlantAPI = (name, sunlight, cycle, edible, poisonous, indoor, interval, successFunc) => {
  db.transaction(tx => {
    tx.executeSql('INSERT INTO plants (name, sunlight, cycle, edible, poisonous, indoor, custom, watering) values (?,?,?,?,?,?,?,?);', [name, sunlight, cycle, edible, poisonous, indoor, false, interval],
      (txObj, success) => {successFunc()},
      (txObj, error) => {console.log(error);}
    );
  })
}

const addWatering = (name, interval, successFunc) => {
  db.transaction(tx => {
    tx.executeSql('INSERT INTO watering (name, interval) values (?,?);', [name, interval],
      (txObj, success) => {successFunc()},
      (txObj, error) => {console.log(error);}
    );
  })
}

const addLocation = (name, location, successFunc) => {
  db.transaction(tx => {
    tx.executeSql('INSERT INTO location (name, location) values (?,?);', [name, location],
      (txObj, success) => {successFunc()},
      (txObj, error) => {console.log(error);}
    );
  })
}

const addGroups = (name, first_name, location_id, successFunc) => {
  db.transaction(tx => {
    tx.executeSql('INSERT INTO groups (name, first_name, location_id) values (?,?,?);', [name, first_name, location_id],
      (txObj, success) => {successFunc()},
      (txObj, error) => {console.log(error);}
    );
  })
}

const addUserInfo = (pet, username, successFunc) => {
  db.transaction(tx => {
    tx.executeSql('INSERT INTO user_info (pet, username) values (?,?);', [pet, username],
      (txObj, success) => {successFunc()},
      (txObj, error) => {console.log(error);}
    );
  })
}

const addPlanted = (date_planted, date_watered, date_notified, interval, custom_name, inside, plant_id, group_id, location_id, successFunc) => {
  db.transaction(tx => {
    tx.executeSql('INSERT INTO planted (date_planted, date_watered, date_notified, interval, custom_name, inside, plant_id, group_id, location_id) values (?,?,?,?,?,?,?,?,?);', [date_planted, date_watered, date_notified, interval, custom_name, inside, plant_id, group_id, location_id],
      (txObj, success) => {successFunc()},
      (txObj, error) => {console.log(error);}
    );
  })
}

//delete
const deletePlant = (plant_id, successFunc) => {
  db.transaction(tx => {
    tx.executeSql('DELETE FROM plants WHERE id=?', [plant_id],
    (txObj, success) => {successFunc()},
    (txObj, error) => {console.log(error);}
    );
  })
}

const deleteWatering = (watering_id, successFunc) => {
  db.transaction(tx => {
    tx.executeSql('DELETE FROM watering WHERE watering_id=?', [watering_id],
    (txObj, success) => {successFunc()},
    (txObj, error) => {console.log(error);}
    );
  })
}

const deleteLocation = (location_id, successFunc) => {
  db.transaction(tx => {
    tx.executeSql('DELETE FROM location WHERE location_id=?', [location_id],
    (txObj, success) => {successFunc()},
    (txObj, error) => {console.log(error);}
    );
  })
}

const deleteGroups = (group_id, successFunc) => {
  db.transaction(tx => {
    tx.executeSql('DELETE FROM location WHERE group_id=?', [group_id],
    (txObj, success) => {successFunc()},
    (txObj, error) => {console.log(error);}
    );
  })
}

const deleteUserInfo = (id, successFunc) => {
  db.transaction(tx => {
    tx.executeSql('DELETE FROM user_info WHERE id=?', [id],
    (txObj, success) => {successFunc()},
    (txObj, error) => {console.log(error);}
    );
  })
}

const deletePlanted = (id, successFunc) => {
  db.transaction(tx => {
    tx.executeSql('DELETE FROM planted WHERE id=?', [id],
    (txObj, success) => {successFunc()},
    (txObj, error) => {console.log(error);}
    );
  })
}

//select
const selectAllPlants = (getAllPlants) => {
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

const selectAllWatering = (getAllWatering) => {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM watering', [],
    (_, {rows: {_array}}) => {
      getAllWatering(_array)
    });
  },
  (t, error) => { console.log("db error load watering"); console.log(error) },
  (_t, _success) => { console.log("loaded watering")}
  );
}

const selectAllLocation = (getAllLocation) => {
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

const selectAllGroups = (getAllGroups) => {
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

const selectUserInfo = (getAllUserInfo) => {
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

const selectPlanted = (getAllPlanted) => {
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


const dropEverything = () => {
  db.transaction(tx => {
    tx.executeSql("DROP TABLE IF EXISTS watering;")
    tx.executeSql("DROP TABLE IF EXISTS location;")
    tx.executeSql("DROP TABLE IF EXISTS user_info;")
    tx.executeSql("DROP TABLE IF EXISTS plants;")
    tx.executeSql("DROP TABLE IF EXISTS planted;")
    tx.executeSql("DROP TABLE IF EXISTS groups;")
      },
      (t, error) => { console.log("db error dropping tables"); console.log(error) },
      (_t, _success) => { console.log("dropped tables")}
    )
}

const exportDb = async () => {
  if (Platform.OS === "android") {
    const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
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

export const database = {
  createWatering,
  dropEverything,
  exportDb,
  addGroups,
  addLocation,
  addPlant,
  addPlantAPI,
  addUserInfo,
  addWatering,
  deleteWatering,
  selectAllWatering
}