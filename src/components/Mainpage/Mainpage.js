import React, { useRef, useEffect, useState } from "react";
import { Animated, Easing } from 'react-native'
import { NativeBaseProvider, Text, Icon, useToast, Box, Row, Button, Heading, Column, Checkbox } from "native-base";
import styles from './Mainpage.style.js'
import { Entypo } from '@expo/vector-icons';

const MainPage = () => {
    
    const getCurrentDate=()=>{
 
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        console.warn(date + '-' + month + '-' + year);
        //Alert.alert(date + '-' + month + '-' + year);
        // You can turn it in to your desired format
        return date;// + '-' + month + '-' + year;//format: d-m-y;
  }
    const [checkboxes] = useState([
        { id: 1, name: 'Flower 1 (13.06)', checked: false, day: 13, month: 6, year: 2023 },
        { id: 2, name: 'Flower 2 (13.06)', checked: false, day: 13, month: 6, year: 2023 },
        { id: 3, name: 'Flower 3 (13.06)', checked: false, day: 13, month: 6, year: 2023 },
        { id: 4, name: 'Flower 4 (13.06)', checked: false, day: 13, month: 6, year: 2023 },
        { id: 5, name: 'Flower 1 (14.06)', checked: false, day: 14, month: 6, year: 2023 },
        { id: 6, name: 'Flower 2 (14.06)', checked: false, day: 14, month: 6, year: 2023 },
        { id: 7, name: 'Flower 1 (15.06)', checked: false, day: 15, month: 6, year: 2023 },
        { id: 8, name: 'Flower 2 (15.06)', checked: false, day: 15, month: 6, year: 2023 },
    ]);


    const waterPlant = (checkbox) => {
        checkbox.checked = true;
        toast.show({
            description: `Deleted plant called: ${checkbox.name}`
        });
    }

    const toast = useToast();
    const currentDate = getCurrentDate();

    return (
        <NativeBaseProvider>
            <Box style={styles.mainBody}>
                <Box style={styles.choiceBox}>
                    <Box style={styles.checkboxContainer}>
                        {checkboxes.map((checkbox) => (
                             checkbox.checked === false && 
                             checkbox.day === new Date().getDate() &&
                             checkbox.month === new Date().getMonth()+1 &&
                             checkbox.year === new Date().getFullYear() && 
                             (<Box key={checkbox.id} style={{
                                flexDirection: "row",
                                alignItems: "center",
                                paddingBottom: '5%',
                            }}>
                                <Box style={styles.plantButton}>
                                    <Icon color="#FFFFFF" size={6} as={<Entypo name="drop" />} />
                                </Box>
                                <Button onPress={() => waterPlant(checkbox)} style={styles.inputField}>
                                    <Text bold style={styles.label}>{checkbox.name}</Text>
                                </Button>
                            </Box>
                        )))}
                    </Box>
                </Box>
            </Box>
        </NativeBaseProvider>
    );
}

export default MainPage;