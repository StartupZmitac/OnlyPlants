import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator, TextInput} from 'react-native';
import styles from './FindPlant.style.js'
import { NativeBaseProvider, Box, Button, Heading, Input, Row } from 'native-base';
import { addPlantAPI, selectAllWatering } from '../../database/PlantsDb.js'

// @flow
const FindPlant = () => {
  let [isLoading, setIsLoading] = useState(true);
  let [error, setError] = useState();
  let [response, setResponse] = useState();
  let [query, setQuery] = useState('');
  let [wateringOptions, setWateringOptions] = useState([]);
  let [name, setName] = useState('');
  let [interval, setInterval] = useState('');
  let [sunlight, setSunlight] = useState('');
  let [cycle, setCycle] = useState('');
  let [edible, setEdible] = useState('');
  let [poisonous, setPoisonous] = useState('');

  useEffect(() => {
    selectAllWatering(setWateringOptions)
  }, []);

  const handleCall = () => {
    const apiKey = 'sk-ROVe642993dacc8c4178';
    fetch(`https://perenual.com/api/species-list?q=${query}&key=${apiKey}`)
      .then(res => res.json())  
      .then(
        (result) => {
          console.log('callin')
          console.log(query);
          //console.log(result);
          setIsLoading(false);
          setName(result.data[0].common_name); //protect from undefined
          setCycle(result.data[0].cycle);
          setSunlight(result.data[0].sunlight.join());
          setEdible(null); //what happens if i put .edible?
          setPoisonous(null);
          //watering
          console.log(wateringOptions.find(({ name }) => name === result.data[0].watering).watering_id);
          setInterval(wateringOptions.find(({ name }) => name === result.data[0].watering).watering_id)
          setResponse(result);
        },
        (error) => {
          setIsLoading(false);
          setError(error);
        }
      )
  }

  const addPlantDB = () => {
    addPlantAPI(name, sunlight, cycle, edible, poisonous, interval, plantAdded);
  }

  const plantAdded = () => {
  }

  const getContent = () => {
    if (isLoading) {
      return null;
    }

    if (error) {
      return <Text>{error}</Text>
    }

    if(typeof(response)!== 'undefined'){
      //shows plant details and a button to add plant - this adds it to plants
      //navigate to plant plant component to actually plant it

      responseJson = JSON.stringify(response)
      if(responseJson.includes("Surpassed API Rate Limit")){
        seconds = responseJson.slice(65,70)
        return <Text>{`Too many API calls :( Retry in ${seconds} seconds`}</Text>;
      }
      return (
              <NativeBaseProvider>
                <Box>
                  <Text>{name}</Text>
                  <Row style={{alignItems: 'center', padding: '5%'}}>
                    <Button size="lg" onPress={addPlantDB} style={{backgroundColor: '#FFC090', color: "#F7F6DC"}}>Add</Button>
                  </Row>
                </Box>
              </NativeBaseProvider>
      );
    }
  };

  return (
    <NativeBaseProvider>
      <Box>
        <Box style={styles.mainBody}>
          <Input 
              bold
              variant="rounded"
              placeholder="Search..."
              onChangeText={text => setQuery(text)}
              placeholderTextColor="#F7F6DC"
              defaultValue={""}
              fontSize={'20'} 
              width={'80%'}
              style={styles.inputField}
          />
          <Box style={styles.choiceBox}>
            {getContent()}
          </Box>
          <Row style={{alignItems: 'center', padding: '5%'}}>
          <Button size="lg" onPress={handleCall} style={{backgroundColor: '#FFC090', color: "#F7F6DC"}}>Find</Button>
          
          </Row>
        </Box>
      </Box>
    </NativeBaseProvider>
  );
}

export default FindPlant