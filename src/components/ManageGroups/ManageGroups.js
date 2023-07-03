import React, { useState, useEffect } from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Box, Button, Modal, NativeBaseProvider, Input, Text, Row, Column, ScrollView, useToast} from 'native-base';
import { RefreshControl } from 'react-native';
import styles from './ManageGroups.style.js';
import { selectPlanted, selectAllGroups, deleteGroup, modifyGroup, selectAllLocation } from '../../database/PlantsDb.js'
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const ManageGroups = ({navigation}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
    const [selectedGroupName, setSelectedGroupName] = useState('');
    const [selectedGroupId, setSelectedGroupId] = useState(0);
    const [newGroupName, setNewGroupName] = useState('');
    const [selectedPlant, setSelectedPlant] = useState('');
    const [groupList, setGroupList] = useState([]);
    const [plantList, setPlantList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const toast = useToast();

    function setAndParsePlantList(resultSet) {
        var options = []
        for (let i = 0; i < resultSet.length; i++) {
            temp = JSON.stringify(resultSet.at(i));
            parsed = JSON.parse(temp);
            console.log(parsed)
            options.push({key: parsed.id, name: parsed.custom_name, group: parsed.group_id_fk});
            console.log("row: ", options[i]);
        }
        setPlantList(options);
    }

    function setAndParseGroupList(resultSet) {
        var options = []
        for (let i = 0; i < resultSet.length; i++) {
            temp = JSON.stringify(resultSet.at(i));
            parsed = JSON.parse(temp);
            console.log(parsed)
            options.push({key: parsed.group_id, name: parsed.name});
            console.log("row: ", options[i]);
        }
        setGroupList(options);
    }

    function handleModifyGroup() {
      if (!newGroupName) {
        toast.show({
            description: `Error: New name cannot be empty!`
          });
          return;
      }
      modifyGroup(selectedGroupId, newGroupName);
      toast.show({
        description: `Changes saved!`
      });
    }

    function handleDeleteGroup() {
      toast.show({
        description: `Deleted ${selectedGroupName}!`
      });
      console.log(selectedGroupId);
      deleteGroup(selectedGroupId, () => {});
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        selectPlanted(setAndParsePlantList);
        selectAllGroups(setAndParseGroupList);
        setTimeout(() => {
          setRefreshing(false);
        }, 2000);
    }, []);  

    useEffect(() => {
      selectPlanted(setAndParsePlantList);
      selectAllGroups(setAndParseGroupList);
    }, []);

    const handleOpenModal = (group) => {
        setSelectedGroupId(group.key);
        setSelectedGroupName(group.name);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <NativeBaseProvider>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <Box style={styles.mainBody}>
                    <Box style={styles.choiceBox}>
                      <ScrollView w="300" h="80" refreshControl={
                          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                      }>
                        <Column style={styles.plantColumn}>
                            {groupList.map((group) => (
                                <Box
                                    key={group.id}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        paddingBottom: '5%',
                                    }}
                                >
                                    <Button
                                        style={styles.inputField}
                                        onPress={() => handleOpenModal(group)}
                                    >
                                        <Text bold style={styles.label}>
                                            {group.name}
                                        </Text>
                                    </Button>
                                </Box>
                            ))}
                        </Column>
                      </ScrollView>
                    </Box>
                    <Row style={{ alignItems: 'center', padding: '10%' }}>
                        <Button size="lg" style={styles.button} onPress={() => navigation.navigate('AddGroup')}>
                            Add group
                        </Button>
                    </Row>
                    <Modal borderRadius={50} isOpen={isModalOpen} onClose={handleCloseModal}>
                        <Modal.Content style={{ height: '60%', backgroundColor: '#F7F6DC', padding: '5%', }}>
                            <Column>
                                <Input
                                    variant="rounded"
                                    placeholder={selectedGroupName}
                                    onChangeText={(newName) => setNewGroupName(newName)}
                                    placeholderTextColor="#F7F6DC"
                                    color="#F7F6DC"
                                    defaultValue={selectedGroupName}
                                    fontSize={18}
                                    style={styles.inputField}
                                    marginBottom="8%"
                                />
                                <Box style={{ backgroundColor: '#B1D7B4', borderRadius: 50, padding: '7%', }}>
                                    <ScrollView w="100%" h="73%">
                                        {plantList.filter((plant) => {
                                            if(plant.group == selectedGroupId) {
                                                console.log(plant);
                                                return plant;
                                            }}).map((plant) => {
                                                console.log(plant);
                                                return(
                                                  <Button key={plant.key} style={{ backgroundColor: '#7FB77E', borderRadius: 50, marginBottom: '5%', }} >
                                                    <Text bold style={styles.label}>
                                                      {plant.name}
                                                    </Text>
                                                  </Button>
                                                );
                                        })}
                                    </ScrollView>
                                </Box>
                            </Column>
                            <Row style={{ position: 'absolute', bottom: '5%', width: '100%', left: '8%', }}>
                                <Button size="lg" style={{ ...styles.button, marginRight: '10%', width: '45%' }} onPress={handleModifyGroup}>
                                    Save
                                </Button>
                                <Button size="lg" style={{ ...styles.button, width: '45%' }} onPress={handleDeleteGroup}>
                                    Delete
                                </Button>
                            </Row>
                        </Modal.Content>
                    </Modal>
                </Box>
            </TouchableWithoutFeedback>
        </NativeBaseProvider>
    );
};

export default ManageGroups;
