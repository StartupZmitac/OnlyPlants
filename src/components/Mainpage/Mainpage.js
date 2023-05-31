import React, { useRef, useEffect, useState } from "react";
import {Animated, Easing} from 'react-native'
import { NativeBaseProvider, Text, View, Input, Box, Row, Button, Heading, Column, Checkbox } from "native-base";
import styles from './MainPage.style.js'


const MainPage = () => {
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

    return (
        <NativeBaseProvider>
                <Box style={styles.mainBody}>
                    <Box style={styles.checkboxContainer}>
                        {checkboxes.map((checkbox) => (
                            <Box style={{ 
                                flexDirection: "row",
                                 alignItems: "center",
                                }}>
                                <Checkbox
                                    value={checkbox.checked}
                                    onValueChange={() => handleCheckboxChange(checkbox.id)}
                                    aria-label="test"
                                />
                                <Box style={{margin: 8}}><Text style={styles.label} bold>{checkbox.name}</Text></Box>
                            </Box>
                        ))}
                    </Box>
                </Box>
        </NativeBaseProvider>
    );
                        
}

export default MainPage;