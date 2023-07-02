import React, { useState, useEffect } from 'react';
import styles from './ManageGroups.style.js'
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Box, Button, Modal, NativeBaseProvider, Text, Row, Column, Image } from "native-base"
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const ManageGroups = ({ route }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState('');
    const [testGroups] = useState([
        { id: 1, name: 'Group 1', plants: [] },
        { id: 2, name: 'Group 2', plants: [] },
        { id: 3, name: 'Group 3', plants: [] },
    ]);
    const handleOpenModal = (group) => {
        setSelectedGroup(group);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    return (
        <NativeBaseProvider>
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
                <Box style={styles.mainBody}>
                    <Box style={styles.choiceBox}>
                        <Column style={styles.plantColumn}>
                            {testGroups.map((group) => (
                                <Box key={group.id} style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    paddingBottom: '5%',
                                }}>
                                    <Button style={styles.inputField} onPress={() => handleOpenModal(group)}>
                                        <Text bold style={styles.label}>{group.name}</Text>
                                    </Button>
                                </Box>
                            ))}
                        </Column>
                    </Box>
                    <Row style={{ alignItems: 'center', padding: '10%' }}>
                        <Button size="lg" style={styles.button}>Save</Button>
                    </Row>
                    <Modal borderRadius={50} isOpen={isModalOpen} onClose={handleCloseModal}>
                        <Modal.Content style={{ height: '50%', backgroundColor: '#F7F6DC', padding: '5%' }}>
                            <Box style={styles.infoBox}>
                                <Column>
                                    <Text bold fontSize="md" style={{ color: '#ffffff' }}>Other data...</Text>
                                </Column>
                            </Box>
                            <Column style={{ paddingTop: '20%' }}>
                                <Button size="lg" style={{ ...styles.button, marginBottom: '10%' }}>
                                    Button 1
                                </Button>
                                <Button size="lg" style={styles.button}>
                                    Button 2
                                </Button>
                            </Column>
                        </Modal.Content>
                    </Modal>
                </Box>

            </TouchableWithoutFeedback>
        </NativeBaseProvider>
    );
};

export default ManageGroups;
