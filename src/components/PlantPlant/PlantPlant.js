import React, {useState, useEffect} from 'react';
import {TouchableWithoutFeedback, Keyboard} from 'react-native';
import {Box, Button, NativeBaseProvider, Heading, Input, Column, Row, Select, extendTheme, Text} from "native-base"
import { addPlanted, exportDb, selectAllWatering, selectAllPlants, selectAllGroups, selectAllLocation, selectWatering, selectPlant, dropEverything, addGroups, addLocation, deleteDb} from '../../database/PlantsDb.js'
import DateTimePickerModal from "react-native-modal-datetime-picker";
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
    const [datePlantedString, setDatePlantedString] = useState('');
    const [dateWateredString, setDateWateredString] = useState('');
    const [plant, setPlant] = useState([]);
    const [water, setWater] = useState([]);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [plantedDatePressed, setPlantedDatePressed] = useState(false);
    const [wateredDatePressed, setWateredDatePressed] = useState(false);
    
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

      const showDatePickerPlanted = () => {
        setPlantedDatePressed(true);
        setDatePickerVisibility(true);
      };

      const showDatePickerWatered = () => {
        setWateredDatePressed(true);
        setDatePickerVisibility(true);
      };
    
      const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };
    
      const handleConfirm = (date) => {
        //console.warn("called by plated button:", plantedDatePressed);
        hideDatePicker();
        if (plantedDatePressed === true)
        {
          setDatePlanted(date);
          //console.warn("A date has been picked: ", date);
          var month = date.getMonth() + 1;
          setDatePlantedString(date.getDate() + "/" + month + "/" + date.getFullYear());
          setPlantedDatePressed(false);
        }
        if (wateredDatePressed === true)
        {
          setDateWatered(date);
          setDateNotified(date);
          //console.warn("A date has been picked: ", date);
          var month = date.getMonth() + 1;
          setDateWateredString(date.getDate() + "/" + month + "/" + date.getFullYear());
          setWateredDatePressed(false);
        }
      };

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
                        onPress={showDatePickerPlanted} style={styles.button}> 
                        <Text color="#F7F6DC" fontSize={'18'} > Day planted: {datePlantedString} </Text> 
                </Button>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />
                <Button size="lg"
                        height='11%'
                        width='100%'
                        borderRadius='50'
                        onPress={showDatePickerWatered} style={styles.button}>
                        <Text color="#F7F6DC" fontSize={'18'} > Day watered: {dateWateredString} </Text>
                        </Button>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />
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