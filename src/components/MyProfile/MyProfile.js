import React, {useState, useEffect} from 'react';
import styles from './MyProfile.style.js'
import {Box, Button, NativeBaseProvider, Heading, Input, Column, Row} from "native-base"

const MyProfile = () =>{

    return (
        <NativeBaseProvider>
            <Box>
                <Box style={styles.mainBody}>
                    <Box style={styles.choiceBox}>
                        <Box style={styles.photoBox}></Box>
                        <Column space={3} alignItems="flex-end" position="absolute" bottom={10}>
                        <Button size="lg" style={styles.button}> Test1 </Button>
                        <Button size="lg" style={styles.button}> Test2 </Button>
                        <Button size="lg" style={styles.button}> Test3 </Button>
                        </Column>
                    </Box>
                </Box>
            </Box>
        </NativeBaseProvider>
    );
};

export default MyProfile;