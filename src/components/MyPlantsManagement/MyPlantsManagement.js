import React, { useState, useEffect } from 'react';
import { RefreshControl } from 'react-native';
import styles from './MyPlantsManagement.style.js'
import { Box, Button, NativeBaseProvider, Modal, Text, Row, Blur, Heading, View, ScrollView, Center, VStack, Column, Image, useToast } from "native-base"
import { selectPlanted, deletePlanted } from '../../database/PlantsDb.js'

const MyPlantsManagement = () => {
    const [selectedPlant, setSelectedPlant] = useState('');
    /*
    const [plants] = useState([
        { key: 1, name: 'Plant 1', day: 28, month: 6, year: 2023 },
        { key: 2, name: 'Plant 2', day: 28, month: 6, year: 2023 },
        { key: 3, name: 'Plant 3', day: 28, month: 6, year: 2023 },
        { key: 4, name: 'Plant 4', day: 28, month: 6, year: 2023 },
        { key: 5, name: 'Plant 5', day: 29, month: 6, year: 2023 },
        { key: 6, name: 'Plant 6', day: 29, month: 6, year: 2023 },
        { key: 7, name: 'Plant 7', day: 30, month: 6, year: 2023 },
        { key: 8, name: 'Plant 8', day: 30, month: 6, year: 2023 },
        { key: 9, name: 'Plant 9', day: 30, month: 6, year: 2023 },
        { key: 10, name: 'Plant 10', day: 1, month: 7, year: 2023 },
        { key: 11, name: 'Plant 11', day: 1, month: 7, year: 2023 }
    ]);
    */
    const [plants, setPlants] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const toast = useToast();
    
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      selectPlanted(setAndParsePlantList);
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }, []);  

    const handleOpenModal = (plant) => {
        setSelectedPlant(plant);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    function setAndParsePlantList(resultSet){
        var options = []
        for (let i = 0; i < resultSet.length; i++) {
            temp = JSON.stringify(resultSet.at(i));
            parsed = JSON.parse(temp);
            console.log(parsed)
            date_watered = new Date(parsed.date_watered)
            date_watered.setDate(date_watered.getDate()+parsed.interval)
            console.log(date_watered)
            options.push({key: parsed.id, name: parsed.custom_name, checked: false, day: date_watered.getDate(), month: date_watered.getMonth()+1, year: date_watered.getFullYear()});
            console.log("row: ", options[i]);
        }
        setPlants(options);
    }

    function manageGroups()
    {
        //todo: implement function
        console.log("groups managed")
    }

    function changeName()
    {
        //todo: implement function
        console.log("changed name")
    }

    function deletePlant(plant)
    {
        deletePlanted(plant.key, () => {console.log("deleted")});
        toast.show({
            description: `Deleted ${plant.name}`
        });
    }

    useEffect(() => {
        selectPlanted(setAndParsePlantList);
    }, []);

    return (
        <NativeBaseProvider>
            <Box style={styles.mainBody}>
                <Box style={styles.choiceBox}>
                    <ScrollView w="200" h="80" refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }>
                        <VStack flex="1">
                            {plants.map((item) => (
                                <View key={item.key}>
                                    <Button mt="3" size="lg" onPress={() => handleOpenModal(item)} style={{ backgroundColor: '#FFC090', color: '#F7F6DC', borderRadius: 50 }}>
                                        {item.name}
                                    </Button>

                                </View>
                            ))}
                        </VStack>
                    </ScrollView>
                </Box>
                <Modal borderRadius={50} isOpen={isModalOpen} onClose={handleCloseModal}>
                    <Modal.Content style={{ height: '50%', backgroundColor: '#F7F6DC', padding: '5%' }}>
                        <Box style={styles.infoBox}>
                            <Column>
                                <Text bold fontSize="md" style={{ color: '#ffffff' }}>Plant name: {selectedPlant.name} </Text>
                                <Text bold fontSize="md" style={{ color: '#ffffff' }}>When to water: {selectedPlant.day}/{selectedPlant.month}/{selectedPlant.year}</Text>
                                <Text bold fontSize="md" style={{ color: '#ffffff' }}>Other data...</Text>
                            </Column>
                        </Box>
                        <Column style={{ paddingTop: '20%' }}>
                            <Button size="lg" style={{ ...styles.button, marginBottom: '10%' }} onPress={changeName}>
                                Change name
                            </Button>
                            <Button size="lg" style={{ ...styles.button, marginBottom: '10%' }} onPress={manageGroups}>
                                Manage groups
                            </Button>
                            <Button size="lg" style={styles.button} onPress={() => deletePlant(selectedPlant)}>
                                Remove plant
                            </Button>
                        </Column>
                    </Modal.Content>
                </Modal>
            </Box>
        </NativeBaseProvider>
    );
};
export default MyPlantsManagement;