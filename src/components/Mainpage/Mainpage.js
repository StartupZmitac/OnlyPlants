import React, { useRef, useEffect, useState } from "react";
import { Animated, Easing } from 'react-native'
import { NativeBaseProvider, Text, Icon, useToast, Box, Row, Button, Heading, Column, Checkbox } from "native-base";
import styles from './Mainpage.style.js'
import { Entypo } from '@expo/vector-icons';

const MainPage = () => {
    const toast = useToast();
    const [checkboxes, setCheckboxes] = useState([
        { id: 1, name: 'Flower 1', checked: false },
        { id: 2, name: 'Flower 2', checked: false },
        { id: 3, name: 'Flower 3', checked: false },
        { id: 4, name: 'Flower 4', checked: false },
    ]);


    const handleCheckboxChange = (id) => {
        setCheckboxes((prevState) => {
            const updatedCheckboxes = prevState.map((checkbox) => {
                if (checkbox.id === id) {
                    return { ...checkbox, checked: !checkbox.checked };
                }
                return checkbox;
            });
            return updatedCheckboxes;
        });
    };
    const waterPlant = (name) => {
        toast.show({
            description: `Deleted plant called: ${name}`
        });
    }
    return (
        <NativeBaseProvider>
            <Box style={styles.mainBody}>
                <Box style={styles.choiceBox}>
                    <Box style={styles.checkboxContainer}>
                        {checkboxes.map((checkbox) => (
                            <Box key={checkbox.id} style={{
                                flexDirection: "row",
                                alignItems: "center",
                                paddingBottom: '5%',
                            }}>
                                <Box style={styles.plantButton}>
                                    <Icon color="#FFFFFF" size={6} as={<Entypo name="drop" />} />
                                </Box>
                                <Button onPress={() => waterPlant(checkbox.name)} style={styles.inputField}>
                                    <Text bold style={styles.label}>{checkbox.name}</Text>
                                </Button>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
        </NativeBaseProvider>
    );

}

export default MainPage;