import React, {useState, useEffect} from 'react';
import {TouchableWithoutFeedback, Keyboard} from 'react-native';
import {Box, Button, NativeBaseProvider, Heading, Input, Column, Row, Select} from "native-base"
import { Entypo } from '@expo/vector-icons'; 
import styles from './CustomPlant.style.js'
import { database } from '../../database/PlantsDb.js'

const CustomPlant = () => {
  const [name, setName] = useState('');
  const [interval, setInterval] = useState('');
  const [sunlight, setSunlight] = useState('');
  const [cycle, setCycle] = useState('');
  const [edible, setEdible] = useState('');
  const [poisonous, setPoisonous] = useState('');
  const [indoor, setIndoor] = useState('');

  async function exportDb() {
    try {
      await database.exportDb()
      console.log('exported')
    } catch (e) {
      console.warn(e);
    }
  }
  
  useEffect(() => {

  }, []);
  
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
                defaultValue={""}
                fontSize={'20'} 
                style={styles.inputField}
              />
              <Input 
                variant="rounded"
                placeholder="Watering interval (in days)"
                onChangeText={newInterval => setInterval(newInterval)}
                placeholderTextColor="#F7F6DC"
                defaultValue={""}
                fontSize={'20'} 
                inputMode='numeric'
                style={styles.inputField}
              />
              <Select selectedValue={sunlight}
                minWidth="290"
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
                minWidth="290"
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
              <Select selectedValue={poisonous}
                minWidth="290"
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
                minWidth="290"
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
              <Select selectedValue={indoor}
                minWidth="290"
                accessibilityLabel="Is the plant indoor?"
                placeholder="Is the plant indoor?"
                placeholderTextColor="#F7F6DC"
                backgroundColor="#FFC090"
                variant="rounded"
                color="#F7F6DC"
                fontSize={'20'}
                dropdownIcon={<Entypo name="chevron-small-down" size={24} color="#F7F6DC"/>}
                _selectedItem={{
                bg: "#FFC090"
                }} mt={1} onValueChange={itemValue => setIndoor(itemValue)}>
                  <Select.Item label="Indoor" value="1" />
                  <Select.Item label="Outdoor" value="0" />
              </Select>
              </Column>
            </Box>
            <Row style={{alignItems: 'center', padding: '10%'}}>
            <Button size="lg" style={{backgroundColor: '#FFC090', color: "#F7F6DC"}}>Add Plant</Button>
           
            </Row>
          </Box>
        </Box>
      </TouchableWithoutFeedback>
    </NativeBaseProvider>
  );
};
/*
  <Button size="lg" style={styles.button}> Export </Button>
  <Button size="lg" style={styles.button}> Drop </Button>
*/
export default CustomPlant;