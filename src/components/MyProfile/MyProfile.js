import React, {useState, useEffect} from 'react';
import styles from './MyProfile.style.js'
import {Box, Button, NativeBaseProvider, Column, Image} from "native-base"
import { deleteDb, dropEverything, exportDb } from '../../database/PlantsDb.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyPlantsManagement from '../MyPlantsManagement/MyPlantsManagement.js';

const MyProfile = ( { navigation } ) =>{

    return (
        <NativeBaseProvider>
            <Box>
                <Box style={styles.mainBody}>
                    <Box style={styles.choiceBox}>
                        <Box style={styles.photoBox}>
                        <Image source = {{uri:'https://media.npr.org/assets/img/2021/11/10/white-tailed-deer-1-ac07593f0b38e66ffac9178fb0c787ca75baea3d.jpg'}}
                            alt="My Profile Image"
                            style = {styles.profileImage}
                        />
                        </Box>
                        <Column space={5} alignItems="flex-end" position="absolute" bottom="5%">
                        <Button size="lg" onPress={() => {navigation.navigate('MyPlantsManagement')} } style={styles.button}> My plants </Button>
                        <Button size="lg" style={styles.button}> Group plants </Button>
                        <Button size="lg" style={styles.button}> Pets </Button>
                        <Button size="lg" onPress={deleteDb} style={styles.button}> Drop Database </Button>
                        <Button size="lg" onPress={exportDb} style={styles.button}> Export Database </Button>
                        </Column>
                    </Box>
                </Box>
            </Box>
    </NativeBaseProvider>
        
    );
};

export default MyProfile;