import React, { useState, useEffect } from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Box, Button, NativeBaseProvider, Input, Column, Row, Select, useToast } from "native-base"
import { selectAllLocation, addGroups, selectAllGroups } from '../../database/PlantsDb.js'
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from './AddGroup.style.js'

const AddGroup = () => {

  const [name, setName] = useState('');
  const [locationId, setLocationId] = useState('');
  const [locationList, setLocationList] = useState([]);
  const [groupList, setGroupList] = useState([]);

  const toast = useToast();

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

  function setAndParseGroup(queryResult) {
    temp = JSON.stringify(queryResult.at(0));
    parsed = JSON.parse(temp);
    var tempName = parsed.custom_name;
    console.log("custom name: ", parsed.custom_name)
    var tempGroupId = parsed.group_id_fk;
    console.log(tempGroupId);
    if (tempGroupId === null) {
      setDefaultGroup("no group assigned");
    }
    else {
      for (let i = 0; i < groupList.length; i++) {
        tempGroup = JSON.stringify(groupList.at(i));
        parsedGroup = JSON.parse(temp);
        if (parsedGroup.group_id === tempGroupId) {
          setDefaultGroup(parsedGroup.name);
        }
      }
    }
    setPlant(parsed);
    setCustomName(tempName);
}

function saveChanges() {
  let tempLocation = locationId;
  if (name.length === 0) {      // check if name isn't empty
    toast.show({
        description: `Error: No name chosen!`
      });
    return;
  }
  for (let i = 0; i < groupList.length; i++) {      //check if name is unique
    tempGroup = JSON.stringify(groupList.at(i));
    parsedGroup = JSON.parse(temp);
    if (parsedGroup.name === name) {
      toast.show({
        description: `Error: Name has to be unique!`
      });
      return;
    }
  }
  if (tempLocation == -1) {     //if no location option selected
    tempLocation = null;
  }
  addGroups(name, name, tempLocation, () => {console.log("group added")});
  toast.show({
    description: `Changes saved!`
  });
}

  useEffect(() => {
    selectAllLocation(setLocationList);
    selectAllGroups(setGroupList);
  }, []);

  return (
    <NativeBaseProvider>
      <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
        <Box>
          <Box style={styles.mainBody}>
            <Box style={styles.choiceBox}>
            <Column style={styles.plantColumn}>
                <Input
                  variant="rounded"
                  placeholder="Group name"
                  onChangeText={newName => setName(newName)}
                  placeholderTextColor="#F7F6DC"
                  color="#F7F6DC"
                  fontSize={'18'}
                  marginBottom='5%'
                  style={styles.inputField}
                />
                <Select selectedValue={locationId}
                  width='100%'
                  placeholder="Location (optional)"
                  placeholderTextColor="#F7F6DC"
                  backgroundColor="#FFC090"
                  variant="rounded"
                  color="#F7F6DC"
                  marginBottom='5%'
                  fontSize={'18'}
                  dropdownIcon={<Entypo name="chevron-small-down" size={24} color="#F7F6DC" />}
                  _selectedItem={{
                    bg: "#FFC090"
                  }} mt={1} onValueChange={itemValue => setLocationId(itemValue)}>
                  {locationsToLocationList()}
                </Select>
              </Column>
          </Box>
            <Row style={{ alignItems: 'center', padding: '10%' }}>
            <Button size="lg" onPress={saveChanges} style={styles.button}>Save</Button>
            </Row>
          </Box>
        </Box>
      </TouchableWithoutFeedback>
    </NativeBaseProvider>
  );
}
export default AddGroup;