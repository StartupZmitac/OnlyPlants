import React, {useState, useEffect} from 'react';
import {TouchableWithoutFeedback, Keyboard} from 'react-native';
import {Box, Button, NativeBaseProvider, Heading, Input, Column, Row, Select, extendTheme, Text} from "native-base"
import { addPlanted, exportDb, selectAllWatering, selectAllPlants, selectAllGroups, selectAllLocation, selectWatering, selectPlant, dropEverything, addGroups, addLocation, deleteDb} from '../../database/PlantsDb.js'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Entypo } from '@expo/vector-icons'; 
import styles from './PlantPlant.style.js'

const PlantPlant = () => {
    const [datePlanted, setDatePlanted] = useState('');
    const [dateWatered, setDateWatered] = useState('');
    const [dateNotified, setDateNotified] = useState('');
    const [interval, setInterval] = useState('');
    const [customName, setCustomName] = useState('');
    const [inside, setInside] = useState('');
    const [plantId, setPlantId] = useState('');
    const [groupId, setGroupId] = useState('');
    const [locationId, setLocationId] = useState('');
    const [wateringOptions, setWateringOptions] = useState([]);
    const [plantList, setPlantList] = useState([]);
    const [groupList, setGroupList] = useState([]);
    const [locationList, setLocationList] = useState([]);
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [datePlantedString, setDatePlantedString] = useState('');
    const [dateWateredString, setDateWateredString] = useState('');
    const [plant, setPlant] = useState([]);
    const [water, setWater] = useState([]);
    const [plantedPressed, setPlantedPressed] = useState('');
    const [wateredPressed, setWateredPressed] = useState('');
    
    async function exportDatabase() {
        try {
          await exportDb();
          console.log('exported');
        } catch (e) {
          console.warn(e);
        }
      }
    
      function addFakeNulls() {
        addLocation("No location", "NULL", ()=>{console.log("null location added")});
        addGroups("No group", "NULL", 1 , ()=>{console.log("null group added")});
      }
      
      useEffect(() => {
        addFakeNulls();
        selectAllWatering(setWateringOptions);
        selectAllPlants(setPlantList);
        selectAllGroups(setGroupList);
        selectAllLocation(setLocationList);
        //dropEverything();
        //deleteDb();
      }, []);

      function getInterval() {
        selectPlant(plantId, setPlant);
        tempPlant = JSON.stringify(plant);
        parsedPlant = JSON.parse(tempPlant);
        selectWatering(parsedPlant.at(0).watering, setWater);
        tempWater = JSON.stringify(water);
        parsedWater = JSON.parse(tempWater);
        setInterval(parsedWater.at(0).interval);
      }

      function plantsToPlantList() {
        var options = []
        for (let i = 0; i < plantList.length; i++)
        {
          temp = JSON.stringify(plantList.at(i));
          parsed = JSON.parse(temp);
          options.push(<Select.Item label={parsed.name} value={parsed.id} key={parsed.id}></Select.Item>);
        }
        return (options);
      }

      function groupsToGroupList() {
        var options = []
        for (let i = 0; i < groupList.length; i++)
        {
          temp = JSON.stringify(groupList.at(i));
          parsed = JSON.parse(temp);
          options.push(<Select.Item label={parsed.name} value={parsed.id} key={parsed.id}></Select.Item>);
        }
        return (options);
      }

      function locationsToLocationList() {
        var options = []
        for (let i = 0; i < locationList.length; i++)
        {
          temp = JSON.stringify(locationList.at(i));
          parsed = JSON.parse(temp);
          options.push(<Select.Item label={parsed.name} value={parsed.id} key={parsed.id}></Select.Item>);
        }
        return (options);
      }

      function addToDatabase() {
        getInterval();
        if (!groupId || groupId === '')
        {
          setGroupId('1');
        }
        if (!locationId || locationId === '')
        {
          setLocationId('1');
        }
        if (!customName || customName === '')
        {
          setCustomName('NULL');
        }
        console.log(datePlanted, dateWatered, dateNotified, interval, customName, inside, plantId, groupId, locationId);
        addPlanted(datePlanted, dateWatered, dateNotified, interval, customName, inside, plantId, groupId, locationId, ()=>{console.log("planted")});
      }

      const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        console.log(wateredPressed);
        if (wateredPressed === true)
        {
          setDateWatered(currentDate.valueOf());
          setDateWateredString(dateWatered.getDate() + "/" + dateWatered.getMonth() + "/" + dateWatered.getFullYear());
          setDateNotified(dateWatered.valueOf());
          console.log(dateWatered.toString());
        }
        if (plantedPressed === true)
        {
          setDatePlanted(currentDate.valueOf());
          setDatePlantedString(datePlanted.getDate() + "/" + datePlanted.getMonth() + "/" + datePlanted.getFullYear());
          console.log(datePlanted.toString());
        }
        //setDate(currentDate);
        
      };

      //Adnroid only
      const showDatepicker = () => {
        DateTimePickerAndroid.open({
          value: date,
          onChange,
          mode: "date",
          is24Hour: true,
        });
      };

      const showDatepickerPlanted = () => {
        setPlantedPressed(true);
        
        showDatepicker();
        /*
        setDatePlanted(date.valueOf());
        setDatePlantedString(date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear());
        */
        setPlantedPressed(false);
      }

      const showDatepickerWatered = () => {
        console.log(wateredPressed);
        showDatepicker();
        /*
        setDateWatered(date.valueOf());
        setDateWateredString(date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear());
        setDateNotified(date.valueOf());
        */
      }
      
      return (
        <NativeBaseProvider>
        <TouchableWithoutFeedback onPress = {() => {Keyboard.dismiss();}}>
            <Box>
            <Box style={styles.mainBody}>
                <Box style={styles.choiceBox}>
                <Column space={4} alignItems="center">
                <Select selectedValue={plantId}
                    width='100%'
                    accessibilityLabel="Choose a plant"
                    placeholder="Choose a plant"
                    placeholderTextColor="#F7F6DC"
                    backgroundColor="#FFC090"
                    variant="rounded"
                    color="#F7F6DC"
                    fontSize={'20'}
                    dropdownIcon={<Entypo name="chevron-small-down" size={24} color="#F7F6DC"/>}
                    _selectedItem={{
                    bg: "#FFC090"
                    }} mt={1} onValueChange={itemValue => setPlantId(itemValue)}>
                      {plantsToPlantList()}
                </Select>
                <Input 
                    variant="rounded"
                    placeholder="Custom name (optional)"
                    onChangeText={newName => setCustomName(newName)}
                    placeholderTextColor="#F7F6DC"
                    color="#F7F6DC"
                    defaultValue={""}
                    fontSize={'20'} 
                    style={styles.inputField}
                />
                <Button size="lg" 
                        height='11%' 
                        width='100%'
                        borderRadius='50'
                        onPress={showDatepickerPlanted} style={styles.button}> 
                        <Text color="#F7F6DC" fontSize={'18'} > Day planted: {datePlantedString} </Text> 
                        </Button>
                <Button size="lg"
                        height='11%'
                        width='100%'
                        borderRadius='50'
                        onPress={()=>{setWateredPressed("aaaaa"); showDatepickerWatered(); setWateredPressed("test");}} style={styles.button}>
                        <Text color="#F7F6DC" fontSize={'18'} > Day watered: {dateWateredString} </Text>
                        </Button>
                <Select selectedValue={inside}
                  width='100%'
                  accessibilityLabel="Planted indoor?"
                  placeholder="Planted indoor?"
                  placeholderTextColor="#F7F6DC"
                  backgroundColor="#FFC090"
                  variant="rounded"
                  color="#F7F6DC"
                  fontSize={'20'}
                  dropdownIcon={<Entypo name="chevron-small-down" size={24} color="#F7F6DC"/>}
                  _selectedItem={{
                  bg: "#FFC090"
                  }} mt={1} onValueChange={itemValue => setInside(itemValue)}>
                    <Select.Item label="Outdoor" value="0" />
                    <Select.Item label="Indoor" value="1" />
                </Select>
                <Select selectedValue={groupId}
                    width='100%'
                    accessibilityLabel="Group (optional)"
                    placeholder="Group (optional)"
                    placeholderTextColor="#F7F6DC"
                    backgroundColor="#FFC090"
                    variant="rounded"
                    color="#F7F6DC"
                    fontSize={'20'}
                    dropdownIcon={<Entypo name="chevron-small-down" size={24} color="#F7F6DC"/>}
                    _selectedItem={{
                    bg: "#FFC090"
                    }} mt={1} onValueChange={itemValue => setGroupId(itemValue)}>
                      {groupsToGroupList()}
                </Select>
                <Select selectedValue={locationId}
                    width='100%'
                    accessibilityLabel="Location (optional)"
                    placeholder="Location (optional)"
                    placeholderTextColor="#F7F6DC"
                    backgroundColor="#FFC090"
                    variant="rounded"
                    color="#F7F6DC"
                    fontSize={'20'}
                    dropdownIcon={<Entypo name="chevron-small-down" size={24} color="#F7F6DC"/>}
                    _selectedItem={{
                    bg: "#FFC090"
                    }} mt={1} onValueChange={itemValue => setLocationId(itemValue)}>
                      {locationsToLocationList()}
                </Select>
                </Column>
            </Box>
                <Row style={{alignItems: 'center', padding: '10%'}}>
                <Button size="lg" onPress={addToDatabase} style={styles.button}>Plant the plant</Button>
                <Button size="lg" onPress={exportDatabase} style={styles.button}> Export </Button>
                </Row>
            </Box>
            </Box>
        </TouchableWithoutFeedback>
        </NativeBaseProvider>
      );
}

export default PlantPlant;