import React, { useState, useEffect, useRef } from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Box, Button, NativeBaseProvider, Heading, Input, Column, Row, Select, extendTheme, Text, useToast } from "native-base"
import { addPlanted, exportDb, selectAllWatering, selectAllPlants, selectAllGroups, selectAllLocation, selectInterval, selectPlanted, dropEverything, addGroups, addLocation, deleteDb } from '../../database/PlantsDb.js'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Entypo } from '@expo/vector-icons';
import styles from './PlantPlant.style.js'
import { schedulePushNotification } from '../../notifications/Notifications.js';

const PlantPlant = () => {
  const [datePlanted, setDatePlanted] = useState('');
  const [dateWatered, setDateWatered] = useState('');
  const [dateNotified, setDateNotified] = useState('');
  const [customName, setCustomName] = useState('');
  const [inside, setInside] = useState('');
  const [plantId, setPlantId] = useState('');
  const [groupId, setGroupId] = useState('');
  const [locationId, setLocationId] = useState('');
  const [plantList, setPlantList] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [plantedList, setPlantedList] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [datePlantedString, setDatePlantedString] = useState('');
  const [dateWateredString, setDateWateredString] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [plantedDatePressed, setPlantedDatePressed] = useState(false);
  const [wateredDatePressed, setWateredDatePressed] = useState(false);
  const toast = useToast();
  
  async function exportDatabase() {
    try {
      await exportDb();
      console.log('exported');
    } catch (e) {
      console.warn(e);
    }
  }

  useEffect(() => {
    selectAllPlants(setPlantList);
    selectAllGroups(setGroupList);
    selectAllLocation(setLocationList);
    selectPlanted(setPlantedList);
    //dropEverything();
    //deleteDb();
  }, []);

  

  function parseAndAddToDb(_interval) {
    const today = Date.now();
    if (plantId.length === 0) {
      toast.show({
        description: `Error: No plant selected!`
      });
      return;
    }
    console.log("parsing");
    temp = JSON.stringify(_interval.at(0));
    console.log("temp: ", temp)
    parsed = JSON.parse(temp);
    console.log("parsed: ", parsed.interval);
    
    plantName = customName;
    if (plantName.length === 0) {
      console.log("no name");
      for (let i = 0; i < plantList.length; i++) {
        tempPlant = JSON.stringify(plantList.at(i));
        parsedPlant = JSON.parse(tempPlant);
        if (parsedPlant.id === plantId) {
          plantName = parsedPlant.name;
        }
      }
      let counter = 1;
      for (let i = 0; i < plantedList.length; i++) {
        tempPlanted = JSON.stringify(plantedList.at(i));
        parsedPlanted = JSON.parse(tempPlanted);
        if (parsedPlanted.plant_id_fk === plantId) {
          counter++;
        }
      }
      plantName = plantName + " " + counter;
    }
    for (let i = 0; i < plantedList.length; i++) {
      tempPlanted = JSON.stringify(plantedList.at(i));
      parsedPlanted = JSON.parse(tempPlanted);
      if (parsedPlanted.custom_name === plantName) {
        toast.show({
          description: `Error: Custom names have to be unique!`
        });
        return;
      }
    }
    console.log("test: ", inside == 1)
    console.log(inside)
    if (!(inside == 0 || inside == 1)) {
      toast.show({
        description: `Error: Not specified if plant is planted inside or outside!`
      });
      return;
    }
    if (datePlanted > today) {
      toast.show({
        description: `Error: Plant planted in the future!`
      });
      return;
    }
    if (dateWatered > today) {
      toast.show({
        description: `Error: Plant watered in the future!`
      });
      return;
    }
    if (dateWatered.length === 0) {
      toast.show({
        description: `Error: Date of last watering not selected!`
      });
      return;
    }
    if (datePlanted.length === 0) {
      toast.show({
        description: `Error: Date of planting not selected!`
      });
      return;
    }
    let tempGroupId = groupId;
    let tempLocationId = locationId;
    if (tempGroupId == -1) {
      tempGroupId = null;
    }
    if (tempLocationId == -1) {
      tempLocationId = null;
    }
    console.log(datePlanted, dateWatered, dateNotified, parsed.interval, plantName, inside, plantId, tempGroupId, tempLocationId);
    addPlanted(datePlanted.toString(), dateWatered.toString(), dateNotified.toString(), parsed.interval, plantName, inside, plantId, tempGroupId, tempLocationId, () => { console.log("planted") });
    schedulePushNotification(plantName, parsed.interval);
    toast.show({
      description: `Plant planted: ${plantName}`
    });
    selectPlanted(setPlantedList);  //update local copy of planted table
  }

  function plantsToPlantList() {
    var options = []
    for (let i = 0; i < plantList.length; i++) {
      temp = JSON.stringify(plantList.at(i));
      parsed = JSON.parse(temp);
      options.push(<Select.Item label={parsed.name} value={parsed.id} key={parsed.id}></Select.Item>);
    }
    return (options);
  }

  function groupsToGroupList() {
    var options = []
    for (let i = 0; i < groupList.length; i++) {
      temp = JSON.stringify(groupList.at(i));
      parsed = JSON.parse(temp);
      options.push(<Select.Item label={parsed.name} value={parsed.group_id} key={parsed.group_id}></Select.Item>);
    }
    options.push(<Select.Item label="none" value="-1" key="0"></Select.Item>);
    return (options);
  }

  function locationsToLocationList() {
    var options = []
    for (let i = 0; i < locationList.length; i++) {
      temp = JSON.stringify(locationList.at(i));
      parsed = JSON.parse(temp);
      options.push(<Select.Item label={parsed.name} value={parsed.location_id} key={parsed.location_id}></Select.Item>);
    }
    options.push(<Select.Item label="none" value="-1" key="0"></Select.Item>);
    return (options);
  }

  function addToDatabase() {
    selectInterval(plantId, parseAndAddToDb);
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
    if (plantedDatePressed === true) {
      setDatePlanted(date);
      //console.warn("A date has been picked: ", date);
      var month = date.getMonth() + 1;
      setDatePlantedString(date.getDate() + "/" + month + "/" + date.getFullYear());
      setPlantedDatePressed(false);
    }
    if (wateredDatePressed === true) {
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
      <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
        <Box>
          <Box style={styles.mainBody}>
            <Box style={styles.choiceBox}>
              <Column style={styles.plantColumn}>
                <Select selectedValue={plantId}
                  width='100%'
                  accessibilityLabel="Choose a plant"
                  placeholder="Choose a plant"
                  placeholderTextColor="#F7F6DC"
                  backgroundColor="#FFC090"
                  variant="rounded"
                  color="#F7F6DC"
                  fontSize={'18'}
                  marginBottom='5%'
                  dropdownIcon={<Entypo name="chevron-small-down" size={24} color="#F7F6DC" />}
                  _selectedItem={{
                    bg: "#FFC090"
                  }} mt={1} onValueChange={(itemValue) => {setPlantId(itemValue)}}>
                  {plantsToPlantList()}
                </Select>
                <Input
                  variant="rounded"
                  placeholder="Custom name (optional)"
                  onChangeText={newName => setCustomName(newName)}
                  placeholderTextColor="#F7F6DC"
                  color="#F7F6DC"
                  defaultValue={""}
                  fontSize={'18'}
                  marginBottom='5%'
                  style={styles.inputField}
                />
                  <Button
                    borderRadius='50'
                    backgroundColor='#FFC090'
                    marginBottom='6%'
                    justifyContent={'flex-start'}
                    onPress={showDatePickerPlanted}>
                    <Text color="#F7F6DC" fontSize={'18'}> Day planted: {datePlantedString}</Text>
                  </Button>

                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />
                <Button
                  height='11%'
                  width='100%'
                  marginBottom='5%'
                  borderRadius='50'
                  justifyContent={'flex-start'}
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
                  marginBottom='5%'
                  color="#F7F6DC"
                  fontSize={'18'}
                  dropdownIcon={<Entypo name="chevron-small-down" size={24} color="#F7F6DC" />}
                  _selectedItem={{
                    bg: "#FFC090"
                  }} mt={1} onValueChange={itemValue => {setInside(itemValue)}}>
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
                  marginBottom='5%'
                  fontSize={'18'}
                  dropdownIcon={<Entypo name="chevron-small-down" size={24} color="#F7F6DC" />}
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
                  fontSize={'18'}
                  dropdownIcon={<Entypo name="chevron-small-down" size={24} color="#F7F6DC" />}
                  _selectedItem={{
                    bg: "#FFC090"
                  }} mt={1} onValueChange={itemValue => setLocationId(itemValue)}>
                  {locationsToLocationList()}
                </Select>
                <Text color="#B1D7B4" fontSize={'12'} alignSelf='stretch' textAlign='center' fontWeight='bold'> Note: Watering interval for the whole group is assumed to be equal to that of the first plant in the group</Text>
              </Column>
            </Box>
            <Row style={{ alignItems: 'center', padding: '10%' }}>
              <Button size="lg" onPress={addToDatabase} style={styles.button}>Plant the plant</Button>
            </Row>
          </Box>
        </Box>
      </TouchableWithoutFeedback>
    </NativeBaseProvider>
  );
}

export default PlantPlant;