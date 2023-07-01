import React, { useState, useEffect } from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Box, Button, NativeBaseProvider, Input, Column, Row, Select, useToast } from "native-base"
import { selectAllGroups, select1Planted, modifyPlanted } from '../../database/PlantsDb.js'
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from './ModifyPlant.style.js'

const ModifyPlant = ({route}) => {

  const [groupId, setGroupId] = useState('');
  const [defaultGroup, setDefaultGroup] = useState('');
  const [plant, setPlant] = useState('');
  const [groupList, setGroupList] = useState([]);
  const [customName, setCustomName] = useState('');
  const [plantId, setPlantId] = useState('');
  const toast = useToast();

  function groupsToGroupList() {
    var options = []
    for (let i = 0; i < groupList.length; i++) {
      temp = JSON.stringify(groupList.at(i));
      parsed = JSON.parse(temp);
      options.push(<Select.Item label={parsed.name} value={parsed.group_id} key={parsed.group_id}></Select.Item>);
    }
    return (options);
  }

  function setAndParsePlant(queryResult) {
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
  modifyPlanted(plantId, groupId, customName);
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