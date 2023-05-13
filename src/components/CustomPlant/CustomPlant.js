import React, {useState, useEffect} from 'react';
import styles from './CustomPlant.style.js'
import {Box, Button, NativeBaseProvider, Heading, Input, Column, Row} from "native-base"
import { database } from '../../database/PlantsDb.js';

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
      <Box style={{width: 450}}>
        <Box style={styles.titleBox}>
          <Heading mt={3} fontSize="4xl" style={{marginTop: '20%', color: '#F7F6DC'}}>Adding custom plant...</Heading>
        </Box>
        <Box style={styles.mainBody}>
          <Box style={styles.choiceBox}>
            <Column space={4} alignItems="center">
            <Input 
              variant="rounded"
              placeholder="Input plant name:"
              onChangeText={newName => setName(newName)}
              placeholderTextColor="#F7F6DC"
              defaultValue={""}
              fontSize={'20'} 
              style={styles.inputField}
            />
             <Input 
              variant="rounded"
              placeholder="Input watering interval (in days):"
              onChangeText={newInterval => setInterval(newInterval)}
              placeholderTextColor="#F7F6DC"
              defaultValue={""}
              fontSize={'20'} 
              style={styles.inputField}
            />
            <Input 
              variant="rounded"
              placeholder="Input insolation (optional):"
              onChangeText={newSun => setSunlight(newSun)}
              defaultValue={""}
              placeholderTextColor="#F7F6DC"
              fontSize={'20'} 
              style={styles.inputField} />
            <Input 
              variant="rounded"
              placeholder="Input plant cycle (optional):"
              onChangeText={newCycle => setCycle(newCycle)}
              defaultValue={""}
              placeholderTextColor="#F7F6DC"
              fontSize={'20'} 
              style={styles.inputField} />
            <Input 
              variant="rounded"
              placeholder="Input plant edibility (optional):"
              onChangeText={newEdible => setEdible(newEdible)}
              defaultValue={""}
              placeholderTextColor="#F7F6DC"
              fontSize={'20'} 
              style={styles.inputField} />
            <Input 
              variant="rounded"
              placeholder="Is the plant poisonous?:"
              onChangeText={newPoison => setPoisonous(newPoison)}
              defaultValue={""}
              placeholderTextColor="#F7F6DC"
              fontSize={'20'} 
              style={styles.inputField} />
            <Input 
              variant="rounded"
              placeholder="Is the plan planted indoor?:"
              onChangeText={newIndoor => setIndoor(newIndoor)}
              defaultValue={""}
              placeholderTextColor="#F7F6DC"
              fontSize={'20'} 
              style={styles.inputField} />
            </Column>
          </Box>
          <Row style={{alignItems: 'center', padding: '10%'}}>
          <Button size="lg" style={{backgroundColor: '#FFC090', color: "#F7F6DC", marginRight: '10%'}}>Add Plant</Button>
          <Button size="lg" style={styles.button}> Export </Button>
          <Button size="lg" style={styles.button}> Drop </Button>
          </Row>
        </Box>
      </Box>
    </NativeBaseProvider>
  );
};

export default CustomPlant;