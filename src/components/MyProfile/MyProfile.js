import React, {useState, useEffect} from 'react';
import styles from './MyProfile.style.js'
import {Box, Button, NativeBaseProvider, Column, Image} from "native-base"


const MyProfile = () =>{

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
                        <Column space={3} alignItems="flex-end" position="absolute" bottom="15%">
                        <Button size="lg" style={styles.button}> My plants </Button>
                        <Button size="lg" style={styles.button}> Group plants </Button>
                        <Button size="lg" style={styles.button}> Pets </Button>
                        </Column>
                    </Box>
                </Box>
            </Box>
        </NativeBaseProvider>
    );
};

export default MyProfile;