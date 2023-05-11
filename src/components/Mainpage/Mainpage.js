import styles from './Mainpage.style.js'
import { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator, TextInput} from 'react-native';
import { NativeBaseProvider, Box, Button, Heading, Input, Row } from 'native-base';

const Mainpage = () => {
    return (
        //Pomiędzy tagami NativeBaseProvider piszesz cały kod który jest wyświetlany.
        <NativeBaseProvider>
            
        </NativeBaseProvider>
      );

}

export default Mainpage