import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator, TextInput} from 'react-native';
import styles from './FindPlant.style.js'
import { NativeBaseProvider, Box, Button, Heading, Input, Row, ScrollView, Center, VStack} from 'native-base';
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
  let [index, setIndex] = useState();

  useEffect(() => {
    //selectAllWatering(setWateringOptions)
  }, []);

  const handleCall = () => {
    const apiKey = 'sk-ROVe642993dacc8c4178';
    fetch(`https://perenual.com/api/species-list?q=${query}&key=${apiKey}`)
      .then(res => res.json())  
      .then(
        (result) => {
          setIsLoading(false);

          setResponse(result);
          console.log(response)

        },
        (error) => {
          setIsLoading(false);
          setError(error);
        }
      )
  }

  const parseResponse = (response) => {
    records = []
    for(const key in response.data){
      record = response.data[key]
      console.log(key, response.data[key])
      if(record.cycle.indexOf("I'm sorry")==-1){
        records.push(
          {
            data: response.data[key],
            index: key
          }

        )
      }
    }
    console.log(records)
    return records
  }

  const addPlantDB = () => {
    //TODO: first check if this plant is already in db, then proceed
    addPlantAPI(name, sunlight, cycle, edible, poisonous, 3, ()=>{});
  }

  const plantAdded = (index) => {
    //setting chosen plant - do this only after user picks

    setName(response.data[index].scientific_name[0]); //protect from undefined
    setCycle(response.data[index].cycle);
    setSunlight(response.data[index].sunlight.join());
    setEdible(null); 
    setPoisonous(null);

    //watering - todo 
    //setInterval(wateringOptions.find(({ name }) => name === response.data[index].watering).watering_id)
    console.log(name, cycle, sunlight, interval)

  }

  const getContent = () => {
    if (isLoading) {
      return null;
    }

    if (error) {
      return <Text>{error}</Text>
    }

    if(typeof(response)!== 'undefined'){
      //navigate to plant plant component to actually plant it
      responseJson = JSON.stringify(response)
      if(responseJson.includes("Surpassed API Rate Limit")){
        seconds = responseJson.slice(65,70)
        return <Text>{`Too many API calls :( Retry in ${seconds} seconds`}</Text>;
      }
      if(response.total == 0){
        return <Text>{'No results'}</Text>;
      }
      else{
      records = parseResponse(response)
      return (
              <NativeBaseProvider>
                <Box>
                <ScrollView w={["200", "300"]} h="80">
                  <Center mb="4">
                    <Heading fontSize="xl" style={{color: "#0b3b0c"}}>Results:</Heading>
                  </Center>
                  <VStack flex="1">
                    {records.map((item) => {
                      return (<View>
                                <Button mt="3" size="lg" onPress={()=>{plantAdded(item.index)}} style={{backgroundColor: '#FFC090', color: "#F7F6DC"}}>{item.data.scientific_name}</Button>
                              </View>)
                  })}
                  </VStack>
                </ScrollView>
                <Center  mb="4">
                <Row style={{alignItems: 'center', padding: '5%'}}>
                    <Button size="lg" onPress={addPlantDB} style={{backgroundColor: '#FFC090', color: "#F7F6DC"}}>Add</Button>
                  </Row>
                  </Center>
                  
                </Box>
              </NativeBaseProvider>
      );
      }
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
          <Button mt="3" size="lg" onPress={handleCall} style={{backgroundColor: '#FFC090', color: "#F7F6DC"}}>Find</Button>
          <Box style={styles.choiceBox}>
            {getContent()}
          </Box>
          <Row style={{alignItems: 'center', padding: '5%'}}>
          </Row>
        </Box>
      </Box>
    </NativeBaseProvider>
  );
}

export default FindPlant