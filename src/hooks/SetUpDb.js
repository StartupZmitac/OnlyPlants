// force the state to clear with fast refresh in Expo
// @refresh reset
import React, {useEffect} from 'react';

import { addWatering, createTables, dropEverything, initWatering } from '../database/PlantsDb';

export default function setUpDb() {
  const [isDBLoadingComplete, setDBLoadingComplete] = React.useState(false);

  useEffect(() => {
    async function loadDataAsync() {
      try {
        createTables();
        initWatering();
        sleep(1500).then(()=>setDBLoadingComplete(true))
      } catch (e) {
        console.warn(e);
      }
    }
    loadDataAsync();
  }, []);

  return isDBLoadingComplete;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}