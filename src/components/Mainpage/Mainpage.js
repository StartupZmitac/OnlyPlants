import React, { useRef, useEffect } from "react";
import {Animated, Easing} from 'react-native'
import { NativeBaseProvider, Text, View, Input, Box, Row, Button, Heading, Column, CheckBox } from "native-base";
import styles from './MainPage.style.js'

const MainPage = () => {
    return (
        <NativeBaseProvider >
           <Box style={styles.mainBody}>
           <Column space={4} alignItems="center">
            <Input 
              variant="rounded"
              placeholder="Flower 1"
              //onChangeText={newName => setName(newName)}
              placeholderTextColor="#F7F6DC"
              defaultValue={""}
              fontSize={'20'} 
            />
            </Column>
            </Box>
        </NativeBaseProvider>
    );
}

export default MainPage;