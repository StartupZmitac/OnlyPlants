// force the state to clear with fast refresh in Expo
// @refresh reset
import React, {useEffect} from 'react';

import { database } from '../database/PlantsDb';

export default function setUpDb() {
  const [isDBLoadingComplete, setDBLoadingComplete] = React.useState(false);

  useEffect(() => {
    async function loadDataAsync() {
      try {
        //TODO: do all setup when starting up app
        database.prepareForeignKeys();
        database.createWatering();
        setDBLoadingComplete(true);
      } catch (e) {
        console.warn(e);
      }
    }

    loadDataAsync();
  }, []);

  return isDBLoadingComplete;
}