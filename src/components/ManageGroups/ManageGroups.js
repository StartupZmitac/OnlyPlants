import React, { useState, useEffect } from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Box, Button, Modal, NativeBaseProvider, Input, Text, Row, Column, ScrollView, useToast} from 'native-base';
import { RefreshControl } from 'react-native';
import styles from './ManageGroups.style.js';
import { selectPlanted, selectAllGroups, deleteGroup, modifyGroup, selectAllLocation } from '../../database/PlantsDb.js'

const ManageGroups = ({ route }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
    const [selectedGroupName, setSelectedGroupName] = useState('');
    const [selectedGroupId, setSelectedGroupId] = useState(0);
    const [selectedPlant, setSelectedPlant] = useState('');
    const [groupList, setGroupList] = useState([]);
    const [plantList, setPlantList] = useState([]);
    /*
    const testPlants = [
        { id: 1, name: 'Plant 1' },
        { id: 2, name: 'Plant 2' },
        { id: 3, name: 'Plant 3' },
        { id: 4, name: 'Plant 4' },
        { id: 5, name: 'Plant 5' },
        { id: 6, name: 'Plant 6' },
        { id: 7, name: 'Plant 7' },
        { id: 8, name: 'Plant 8' },
        { id: 9, name: 'Plant 9' },
    ];

    const testGroups = [
        { id: 1, name: 'Group 1', plants: [] },
        { id: 2, name: 'Group 2', plants: [] },
        { id: 3, name: 'Group 3', plants: [] },
    ];
    */

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

    const handleOpenSecondModal = (plant) => {
        setSelectedPlant(plant);
        setIsSecondModalOpen(true);
    };

    const handleCloseSecondModal = () => {
        setIsSecondModalOpen(false);
    };

    return (
        <NativeBaseProvider>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <Box style={styles.mainBody}>
                    <Box style={styles.choiceBox}>
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
                    </Box>
                    <Row style={{ alignItems: 'center', padding: '10%' }}>
                        <Button size="lg" style={styles.button}>
                            Add group
                        </Button>
                    </Row>
                    <Modal borderRadius={50} isOpen={isModalOpen} onClose={handleCloseModal}>
                        <Modal.Content style={{ height: '60%', backgroundColor: '#F7F6DC', padding: '5%', }}>
                            <Column>
                                <Input
                                    variant="rounded"
                                    placeholder={selectedGroupName}
                                    onChangeText={(newName) => setCustomName(newName)}
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
                                <Button size="lg" style={{ ...styles.button, marginRight: '10%', width: '45%' }} >
                                    Save
                                </Button>
                                <Button size="lg" style={{ ...styles.button, width: '45%' }}>
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
