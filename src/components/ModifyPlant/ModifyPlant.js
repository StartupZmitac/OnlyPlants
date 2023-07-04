import React, { useState, useEffect } from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Box, Button, NativeBaseProvider, Input, Column, Row, Select, useToast, Text } from "native-base"
import { selectAllGroups, select1Planted, modifyPlanted, selectPlanted } from '../../database/PlantsDb.js'
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from './ModifyPlant.style.js'

const ModifyPlant = ({route}) => {

  const [groupId, setGroupId] = useState('');
  const [defaultGroup, setDefaultGroup] = useState('');
  const [plant, setPlant] = useState('');
  const [groupList, setGroupList] = useState([]);
  const [parsedGroupList, setParsedGroupList] = useState([]);
  const [customName, setCustomName] = useState('');
  const [oldName, setOldName] = useState('');
  const [plantId, setPlantId] = useState('');
  const [plants, setPlants] = useState([]);
  const toast = useToast();
  var tempId;

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

  function setAndParsePlant(queryResult) {
    temp = JSON.stringify(queryResult.at(0));
    parsed = JSON.parse(temp);
    var tempName = parsed.custom_name;
    console.log("custom name: ", parsed.custom_name)
    var tempGroupId = parsed.group_id_fk;
    console.log(tempGroupId);
    tempId = tempGroupId;
    if (tempGroupId == null) {
      setDefaultGroup("no group assigned");
    }
    else {
      console.log("else entered", parsedGroupList.length)
      selectAllGroups(setAndParseGroupList);
    }
    setPlant(parsed);
    setCustomName(tempName);
    setOldName(tempName);
}

function setAndParseGroupList(resultSet) {
  var options = []
  for (let i = 0; i < resultSet.length; i++) {
      temp = JSON.stringify(resultSet.at(i));
      parsed = JSON.parse(temp);
      options.push({id: parsed.group_id, name: parsed.name});
  }
  for (let i = 0; i < options.length; i++) {
    console.log("plant group: ", tempId);
    if (options.at(i).id == tempId) {
      setDefaultGroup(options.at(i).name);
    }
  }
  setParsedGroupList(options);
}

function saveChanges() {
  if (customName !== oldName)
  {
    for (let i = 0; i < plants.length; i++) {
      temp = JSON.stringify(plants.at(i));
      parsed = JSON.parse(temp);
      if (parsed.custom_name == customName) {
        toast.show({
          description: `Error: Custom names have to be unique!`
        });
        return;
      }
    }
  }
  if (customName.length == 0) {
    toast.show({
      description: `Error: No name entered!`
    });
    return;
  }
  let tempGroupId = groupId;
  if (tempGroupId == -1) {
    tempGroupId = null;
  }
  modifyPlanted(plantId, tempGroupId, customName);
  toast.show({
    description: `Changes saved!`
  });
}

  useEffect(() => {
    selectAllGroups(setGroupList);
    temp = JSON.stringify(route.params);
    parsed = JSON.parse(temp);
    select1Planted(parsed.id, setAndParsePlant);
    setPlantId(parsed.id);
    selectPlanted(setPlants);
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
                  placeholder={plant.custom_name}
                  onChangeText={newName => setCustomName(newName)}
                  placeholderTextColor="#F7F6DC"
                  color="#F7F6DC"
                  defaultValue={customName}
                  fontSize={'18'}
                  marginBottom='5%'
                  style={styles.inputField}
                />
                <Select selectedValue={groupId}
                  width='100%'
                  placeholder={defaultGroup}
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
                <Text color="#B1D7B4" fontSize={'12'} alignSelf='stretch' textAlign='center' fontWeight='bold'> Note: Watering interval for the whole group is assumed to be equal to that of the first plant in the group</Text>
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
export default ModifyPlant;