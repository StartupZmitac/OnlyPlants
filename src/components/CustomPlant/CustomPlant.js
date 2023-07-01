import React, {useState, useEffect} from 'react';
import {TouchableWithoutFeedback, Keyboard} from 'react-native';
import {Box, Button, NativeBaseProvider, Heading, Input, Column, Row, Select, extendTheme} from "native-base"
import { Entypo } from '@expo/vector-icons'; 
import styles from './CustomPlant.style.js'
import { addPlant, addPlanted, dropEverything, exportDb, selectAllWatering,} from '../../database/PlantsDb.js'

const CustomPlant = ( { navigation } ) => {
  const [name, setName] = useState('');
  const [interval, setInterval] = useState('');
  const [sunlight, setSunlight] = useState('');
  const [cycle, setCycle] = useState('');
  const [edible, setEdible] = useState('');
  const [poisonous, setPoisonous] = useState('');
  const [wateringOptions, setWateringOptions] = useState([]);
  
  async function exportDatabase() {
    try {
      await exportDb()
      console.log('exported')
    } catch (e) {
      console.warn(e);
    }
  }
  
  useEffect(() => {
    selectAllWatering(setWateringOptions)
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

  function addToDatabase()
  {
    addPlant(name, sunlight, cycle, edible, poisonous, interval, ()=>{console.log("plant added to plants")});
  }

  return (
    <NativeBaseProvider>
      <TouchableWithoutFeedback onPress = {() => {Keyboard.dismiss();}}>
        <Box>
          <Box style={styles.mainBody}>
            <Box style={styles.choiceBox}>
              <Column space={4} alignItems="center">
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
                accessibilityLabel="Watering frequency"
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
              <Select selectedValue={sunlight}
                width='100%'
                accessibilityLabel="Insolation"
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
              </Select>
              <Select selectedValue={cycle}
                width='100%'
                accessibilityLabel="Plant cycle"
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
              </Select>
              <Select selectedValue={edible}
                width='100%'
                accessibilityLabel="Is the plant edible?"
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
              </Select>
              <Select selectedValue={poisonous}
                width='100%'
                accessibilityLabel="Is the plant poisonous?"
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
              </Select>
              </Column>
            </Box>
            <Row style={{alignItems: 'center', padding: '10%'}}>
            <Button size="lg" onPress={() => {navigation.navigate('PlantPlant'); addToDatabase()}}  style={styles.button}>Add Plant</Button>
            </Row>
          </Box>
        </Box>
      </TouchableWithoutFeedback>
    </NativeBaseProvider>
  );
};
export default CustomPlant;