import React, {useState, useEffect} from 'react';
import {TouchableWithoutFeedback, Keyboard} from 'react-native';
import {Box, Button, NativeBaseProvider, Heading, Input, Column, Row, Select, extendTheme, useToast, Text } from "native-base"
import { Entypo } from '@expo/vector-icons'; 
import styles from './CustomPlant.style.js'
import { addPlant, selectAllPlants, dropEverything, exportDb, selectAllWatering,} from '../../database/PlantsDb.js'

const CustomPlant = ( { navigation } ) => {
  const [name, setName] = useState('');
  const [interval, setInterval] = useState('');
  const [sunlight, setSunlight] = useState('');
  const [cycle, setCycle] = useState('');
  const [edible, setEdible] = useState('');
  const [poisonous, setPoisonous] = useState('');
  const [wateringOptions, setWateringOptions] = useState([]);
  const [plants, setPlants] = useState([]);
  const toast = useToast();

  async function exportDatabase() {
    try {
      await exportDb()
      console.log('exported')
    } catch (e) {
      console.warn(e);
    }
  }
  
  useEffect(() => {
    selectAllWatering(setWateringOptions);
    selectAllPlants(setPlants);
    //dropEverything();
  }, []);
  
  function wateringList() {
    var options = []
    for (let i = 0; i < wateringOptions.length; i++)
    {
      temp = JSON.stringify(wateringOptions.at(i));
      parsed = JSON.parse(temp);
      options.push(<Select.Item label={parsed.name + " watering"} value={parsed.watering_id} key={parsed.watering_id}></Select.Item>);
    }
    return (options)
  }

  function handleAddPlant() {
    for (let i = 0; i < plants.length; i++) {
      temp = JSON.stringify(plants.at(i));
      parsed = JSON.parse(temp);
      if (parsed.name === name) {
        toast.show({
          description: `Error: Names have to be unique!`
        });
        return;
      }
    }
    addToDatabase()
    navigation.navigate('PlantPlant')
  }

  function addToDatabase()
  {
    let tempSunlight = sunlight;
    let tempCycle = cycle;
    let tempPoison = poisonous;
    let tempEdible = edible;
    if (name.length === 0) {
      toast.show({
        description: `Error: No name entered!`
      });
      return;
    }
    if (interval.length === 0) {
      toast.show({
        description: `Error: No watering frequency selected!`
      });
      return;
    }
    if (tempSunlight == -1) {
      tempSunlight = null;
    }
    if (tempCycle == -1) {
      tempCycle = null;
    }
    if (tempPoison == -1) {
      tempPoison = null;
    }
    if (tempEdible == -1) {
      tempEdible = null;
    }
    addPlant(name, tempSunlight, tempCycle, tempEdible, tempPoison, interval, ()=>{console.log("plant added to plants")});
  }

  return (
    <NativeBaseProvider>
      <TouchableWithoutFeedback onPress = {() => {Keyboard.dismiss();}}>
        <Box>
          <Box style={styles.mainBody}>
            <Box style={styles.choiceBox}>
              <Column space={4} alignItems="center">
              <Text color="#B1D7B4" fontSize={'16'} alignSelf='flex-start' fontWeight='bold'> Required: </Text>
              <Input 
                variant="rounded"
                placeholder="Plant name"
                onChangeText={newName => setName(newName)}
                placeholderTextColor="#F7F6DC"
                color="#F7F6DC"
                defaultValue={""}
                fontSize={'20'} 
                style={styles.inputField}
              />
              <Select selectedValue={interval}
                width='100%'
                placeholder="Watering frequency"
                placeholderTextColor="#F7F6DC"
                backgroundColor="#FFC090"
                variant="rounded"
                color="#F7F6DC"
                fontSize={'20'}
                dropdownIcon={<Entypo name="chevron-small-down" size={24} color="#F7F6DC"/>}
                _selectedItem={{
                bg: "#FFC090"
                }} mt={1} onValueChange={itemValue => setInterval(itemValue)}>
                  {wateringList()}
              </Select>
              <Text color="#B1D7B4" fontSize={'16'} alignSelf='flex-start' fontWeight='bold'> Optional: </Text>
              <Select selectedValue={sunlight}
                width='100%'
                placeholder="Insolation"
                placeholderTextColor="#F7F6DC"
                backgroundColor="#FFC090"
                variant="rounded"
                color="#F7F6DC"
                fontSize={'20'}
                dropdownIcon={<Entypo name="chevron-small-down" size={24} color="#F7F6DC"/>}
                _selectedItem={{
                bg: "#FFC090"
                }} mt={1} onValueChange={itemValue => setSunlight(itemValue)}>
                  <Select.Item label="Full shade" value="0" />
                  <Select.Item label="Part shade" value="1" />
                  <Select.Item label="Patially in sun" value="2" />
                  <Select.Item label="Fully in sun" value="3" />
                  <Select.Item label="Unknown insolation (no value)" value="-1" />
              </Select>
              <Select selectedValue={cycle}
                width='100%'
                placeholder="Plant cycle"
                placeholderTextColor="#F7F6DC"
                backgroundColor="#FFC090"
                variant="rounded"
                color="#F7F6DC"
                fontSize={'20'}
                dropdownIcon={<Entypo name="chevron-small-down" size={24} color="#F7F6DC"/>}
                _selectedItem={{
                bg: "#FFC090"
                }} mt={1} onValueChange={itemValue => setCycle(itemValue)}>
                  <Select.Item label="Perennial" value="0" />
                  <Select.Item label="Annual" value="1" />
                  <Select.Item label="Biennial" value="2" />
                  <Select.Item label="Biannual" value="3" />
                  <Select.Item label="Unknown cycle (no value)" value="-1" />
              </Select>
              <Select selectedValue={edible}
                width='100%'
                placeholder="Is the plant edible?"
                placeholderTextColor="#F7F6DC"
                backgroundColor="#FFC090"
                variant="rounded"
                color="#F7F6DC"
                fontSize={'20'}
                dropdownIcon={<Entypo name="chevron-small-down" size={24} color="#F7F6DC"/>}
                _selectedItem={{
                bg: "#FFC090"
                }} mt={1} onValueChange={itemValue => setEdible(itemValue)}>
                  <Select.Item label="Edible" value="1" />
                  <Select.Item label="Inedible" value="0" />
                  <Select.Item label="Unknown edibility (no value)" value="-1" />
              </Select>
              <Select selectedValue={poisonous}
                width='100%'
                placeholder="Is the plant poisonous?"
                placeholderTextColor="#F7F6DC"
                backgroundColor="#FFC090"
                variant="rounded"
                color="#F7F6DC"
                fontSize={'20'}
                dropdownIcon={<Entypo name="chevron-small-down" size={24} color="#F7F6DC"/>}
                _selectedItem={{
                bg: "#FFC090"
                }} mt={1} onValueChange={itemValue => setPoisonous(itemValue)}>
                  <Select.Item label="Poisonous" value="1" />
                  <Select.Item label="Not poisonous" value="0" />
                  <Select.Item label="Unknown if poisonous (no value)" value="-1" />
              </Select>
              </Column>
            </Box>
            <Row style={{alignItems: 'center', padding: '10%'}}>
            <Button size="lg" onPress={handleAddPlant}  style={styles.button}>Add Plant</Button>
            </Row>
          </Box>
        </Box>
      </TouchableWithoutFeedback>
    </NativeBaseProvider>
  );
};
export default CustomPlant;