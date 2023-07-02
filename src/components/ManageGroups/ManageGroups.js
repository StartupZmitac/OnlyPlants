import React, { useState, useEffect } from 'react';
import styles from './ManageGroups.style.js'
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Box, Button, NativeBaseProvider, Column, Image } from "native-base"
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const ManageGroups = ({ route }) => {

    return (
        <NativeBaseProvider>
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
                <Box>
                    <Box style={styles.mainBody}>
                        <Box style={styles.choiceBox}>
                            <Column style={styles.plantColumn}>
                                {testGroups.map((group) => (
                                    (<Box key={group.id} style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        paddingBottom: '5%',
                                    }}>
                                        <Button style={styles.inputField}>
                                            <Text bold style={styles.label}>{group.name}</Text>
                                        </Button>
                                    </Box>
                                    )))}
                            </Column>
                        </Box>
                        <Row style={{ alignItems: 'center', padding: '10%' }}>
                            <Button size="lg" style={styles.button}>Save</Button>
                        </Row>
                    </Box>
                </Box>
            </TouchableWithoutFeedback>
        </NativeBaseProvider>
    );
};

export default ManageGroups;