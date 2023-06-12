import React, {useState, useEffect} from 'react';
import styles from './MyPlantsManagement.style.js'
import {Box, Button, NativeBaseProvider, Column, Image} from "native-base"


const MyPlantsManagement = () =>{

    return (
        <NativeBaseProvider>
            <Box>
                <Box style={styles.mainBody}>
                    <Box style={styles.choiceBox}>

                    </Box>
                </Box>
            </Box>
        </NativeBaseProvider>
    );
};

export default MyPlantsManagement;