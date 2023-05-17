import styles from './Mainpage.style.js'
import { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator, TextInput} from 'react-native';
import { NativeBaseProvider, Box, Button, Heading, Input, Row } from 'native-base';

const Mainpage = () => {
    return (
        //Pomiędzy tagami NativeBaseProvider piszesz cały kod który jest wyświetlany.
        <NativeBaseProvider>
        <Box>
        <Box style={styles.mainBody}>
          <Box style={styles.checkBox}>
          <CheckBox checked={true} color="green"/>
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
      </Box>
      </Box>
        </NativeBaseProvider>
      );

}

export default Mainpage