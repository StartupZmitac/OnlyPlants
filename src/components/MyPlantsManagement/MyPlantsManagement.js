import React, { useState, useEffect } from 'react';
import styles from './MyPlantsManagement.style.js'
import { Box, Button, NativeBaseProvider, Heading, View, ScrollView, Center, VStack, Column, Image } from "native-base"


const MyPlantsManagement = () => {
    const [plants] = useState([
        { key: 1, name: 'Plant 1', day: 28, month: 6, year: 2023 },
        { key: 2, name: 'Plant 2', day: 28, month: 6, year: 2023 },
        { key: 3, name: 'Plant 3', day: 28, month: 6, year: 2023 },
        { key: 4, name: 'Plant 4', day: 28, month: 6, year: 2023 },
        { key: 5, name: 'Plant 5', day: 29, month: 6, year: 2023 },
        { key: 6, name: 'Plant 6', day: 29, month: 6, year: 2023 },
        { key: 7, name: 'Plant 7', day: 30, month: 6, year: 2023 },
        { key: 8, name: 'Plant 8', day: 30, month: 6, year: 2023 },
        { key: 6, name: 'Plant 9', day: 30, month: 6, year: 2023 },
        { key: 7, name: 'Plant 10', day: 1, month: 7, year: 2023 },
        { key: 8, name: 'Plant 11', day: 1, month: 7, year: 2023 }
    ]);
    return (
        <NativeBaseProvider>
            <Box>
                <Box style={styles.mainBody}>
                    <Box style={styles.choiceBox}>
                        <ScrollView w={["200", "200"]} h="80">
                            <VStack flex="1">
                                {plants.map((item) => {
                                    return (<View>
                                        <Button mt="3" size="lg" style={{ backgroundColor: '#FFC090', color: "#F7F6DC", borderRadius: 50 }}>{item.name}</Button>
                                    </View>)
                                })}
                            </VStack>
                        </ScrollView>
                    </Box>
                </Box>
            </Box>
        </NativeBaseProvider>
    );
};

export default MyPlantsManagement;