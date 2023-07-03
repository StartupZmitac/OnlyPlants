import React, { useRef, useEffect, useState } from "react";
import { Animated, Easing } from 'react-native'
import { NativeBaseProvider, Text, Icon, useToast, Box, Row, Button, Heading, Column, Checkbox, ScrollView, Center, VStack } from "native-base";
import { selectPlanted, updateDateWatered } from '../../database/PlantsDb.js'
import styles from './Mainpage.style.js'
import { AntDesign, Entypo } from '@expo/vector-icons';
import { updatePushNotification } from "../../notifications/Notifications.js";

const MainPage = () => {
    const [counter, setCounter] = useState(0);
    const clickRight = () => {
        setCounter((prevCounter) => {
            const newCounter = prevCounter + 1;
            return newCounter;
        });
    };

    const clickLeft = () => {
        setCounter((prevCounter) => {
            const newCounter = prevCounter - 1;
            return newCounter;
        });
    };

    const [plantsList, setPlantList] = useState([]);

    function setAndParsePlantList(resultSet) {
        var options = []
        for (let i = 0; i < resultSet.length; i++) {
            temp = JSON.stringify(resultSet.at(i));
            parsed = JSON.parse(temp);
            console.log(parsed)
            date_watered = new Date(parsed.date_watered)
            date_watered.setDate(date_watered.getDate() + parsed.interval)
            console.log(date_watered)
            options.push({ id: parsed.id, name: parsed.custom_name, checked: false, date: date_watered, interval: parsed.interval, clickable: true });
            console.log("row: ", options[i]);
        }
        setPlantList(options);
    }

    useEffect(() => {
        selectPlanted(setAndParsePlantList);
    }, []);

    const getDayName = () => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const index = (new Date().getDay() + (counter % 7) + 7) % 7;
        return days[index];
    }

    const getDateText = () => {
        now = new Date()
        now.setDate(now.getDate() + counter)
        return now
    }

    const waterPlant = (checkbox) => {
        now = new Date()
        checkbox.checked = true;
        console.log(now.toString());
        updateDateWatered(checkbox.id, now.toString())
        updatePushNotification(checkbox.name, checkbox.interval);

        toast.show({
            description: `Watered plant: ${checkbox.name}`
        });
    }
    const checkDate = (date) => {
        now = new Date()
        now.setDate(now.getDate() + counter)
        now.setHours(0, 0, 0, 0);

        date.date.setHours(0, 0, 0, 0);

        day = 1000 * 60 * 60 * 24;
        //check difference between dates, if modulo == interval
        difference = (now.getTime() - date.date.getTime()) / day
        console.log(difference)

        if (date.date.getDate() === now.getDate() &&
            date.date.getMonth() === now.getMonth() &&
            date.date.getFullYear() === now.getFullYear()) {
            date.clickable = true
            return true;
        }

        if (difference % date.interval == 0 && difference >= 0) {
            console.log(date.name)
            date.clickable = false
            return true;
            //here we can have unclickable forecast
        }
        console.log(date.clickable)
        return false;

    }
    const toast = useToast();

    return (
        <NativeBaseProvider>
            <Box style={styles.mainBody}>
                <Row>
                    <Button style={{ bottom: '25%', marginRight: '5%', backgroundColor: '#FFC090', borderRadius: 50 }} onPress={clickLeft}>
                        <AntDesign name="leftcircleo" size={24} color="#FFFFFF" />
                    </Button>
                    <Box style={styles.dayHeader}>
                        <Text bold fontSize="2xl" style={{ color: '#ffffff', bottom: '-9%' }}>{`${getDayName()} ${getDateText().getDate()}.${getDateText().getMonth() + 1}`}</Text>
                    </Box>
                    <Button style={{ bottom: '25%', marginLeft: '5%', backgroundColor: '#FFC090', borderRadius: 50 }} onPress={clickRight}>
                        <AntDesign name="rightcircleo" size={24} color="#FFFFFF" />
                    </Button>
                </Row>
                <Box style={styles.choiceBox}>
                    <ScrollView w="80%" h="70%">
                        <VStack flex="1">
                            {plantsList.map((checkbox) => (
                                checkbox.checked === false &&
                                checkDate(checkbox) &&
                                (<Box key={checkbox.id} style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    paddingBottom: '5%',
                                }}>
                                    <Box style={[styles.plantButton, { backgroundColor: checkbox.clickable ? '#FFC090' : '#c8ccc2' }]}>
                                        <Icon color="#FFFFFF" size={6} as={<Entypo name="drop" />} />
                                    </Box>
                                    <Button disabled={!checkbox.clickable} onPress={() => waterPlant(checkbox)} style={[styles.inputField, { backgroundColor: checkbox.clickable ? '#FFC090' : '#c8ccc2' }]}>
                                        <Text bold style={styles.label}>{checkbox.name}</Text>
                                    </Button>
                                </Box>
                                )))}
                        </VStack>
                    </ScrollView>
                </Box>
            </Box>
        </NativeBaseProvider>
    );
}

export default MainPage;