import React, { useState, useEffect } from 'react';
import { RefreshControl } from 'react-native';
import styles from './MyPlantsManagement.style.js'
import { Box, Button, NativeBaseProvider, Modal, Text, Row, Blur, Heading, View, ScrollView, Center, VStack, Column, Image, useToast } from "native-base"
import { selectPlanted, deletePlanted } from '../../database/PlantsDb.js'
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { cancelPushNotification } from '../../notifications/Notifications.js';

const MyPlantsManagement = ({navigation}) => {
    const [selectedPlant, setSelectedPlant] = useState('');

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

    function deletePlant(plant)
    {
        deletePlanted(plant.key, () => {console.log("deleted")});
        toast.show({
            description: `Deleted ${plant.name}`
        });
        cancelPushNotification(plant.name);
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
                            <Button size="lg" style={{ ...styles.button, marginBottom: '10%' }} onPress={() => navigation.navigate('ModifyPlant', {id: selectedPlant.key})}>
                                Modify plant data
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