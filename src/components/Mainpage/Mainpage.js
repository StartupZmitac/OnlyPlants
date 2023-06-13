import React, { useRef, useEffect, useState } from "react";
import { Animated, Easing } from 'react-native'
import { NativeBaseProvider, Text, Icon, useToast, Box, Row, Button, Heading, Column, Checkbox } from "native-base";
import styles from './Mainpage.style.js'
import { Entypo } from '@expo/vector-icons';

const MainPage = () => {
    const [counter, setCounter] = useState(0);
    const clickRight = () => {
        setCounter((prevCounter) => {
          const newCounter = prevCounter + 1;
          console.warn(newCounter);
          return newCounter;
        });
      };
      
      const clickLeft = () => {
        setCounter((prevCounter) => {
          const newCounter = prevCounter - 1;
          console.warn(newCounter);
          return newCounter;
        });
      };

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


    const getDayName = () => {
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[new Date().getDay()+counter];
    }


    const waterPlant = (checkbox) => {
        checkbox.checked = true;
        toast.show({
            description: `Deleted plant called: ${checkbox.name}`
        });
    }

    const toast = useToast();

    return (
        <NativeBaseProvider>
            <Box style={styles.mainBody}>
                <Row>
                    <Button style={{bottom: '25%', marginRight: '5%'}} onPress={clickLeft}>
                        L
                    </Button>
                    <Box style={styles.dayHeader}>
                        <Text bold fontSize="3xl" style={{ color: '#ffffff' }}>{getDayName()}</Text>
                    </Box>
                    <Button style={{bottom: '25%', marginLeft: '5%'}} onPress={clickRight}>
                        R
                    </Button>
                </Row>

                <Box style={styles.choiceBox}>
                    <Box style={styles.checkboxContainer}>
                        {checkboxes.map((checkbox) => (
                            checkbox.checked === false &&
                            checkbox.day === new Date().getDate()+counter &&
                            checkbox.month === new Date().getMonth() + 1 &&
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