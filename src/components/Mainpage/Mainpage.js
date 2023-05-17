import React, { useRef, useEffect } from "react";
import {Animated, Easing} from 'react-native'
import { NativeBaseProvider, Text, View, Input, Box, Row, Button, Heading, Column, Checkbox } from "native-base";
import styles from './MainPage.style.js'

const MainPage = () => {
    return (
        <NativeBaseProvider >
            <Box>
                <Box style={styles.mainBody}>
                        
                            <Box style={styles.checkboxContainer}>
                                <Checkbox style={styles.label}>Flower 1</Checkbox>
                                <Checkbox style={styles.label}>Flower 2</Checkbox>
                                <Checkbox style={styles.label}>Flower 3</Checkbox>
                                <Checkbox style={styles.label}>Flower 4</Checkbox> 
                            </Box>
                        
                </Box>
            </Box>   
        </NativeBaseProvider>
    );
}

export default MainPage;