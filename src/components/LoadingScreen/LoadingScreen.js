import React, { useRef, useEffect } from "react";
import {Animated, Easing} from 'react-native'
import { NativeBaseProvider, Text, View, Input, Box, Row, Button, Heading } from "native-base";
import styles from './LoadingScreen.style.js'

const LoadingScreen = () => {
    const progress = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        animateProgressBar();

      }, []);
      const animateProgressBar = () => {
        Animated.timing(progress, {
          toValue: 1,
          duration: 2000,
          easing: Easing.bezier(.215, .61, .355, 1),
          useNativeDriver: false
        }).start();
      };
    const width = progress.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '100%'],
      extrapolate: 'clamp',
    });
    return (
        <NativeBaseProvider >
            <Box style={styles.mainBody} >
                <Box style={styles.logoSlot}>
                    <Text bold fontSize="5xl" style={{ color: '#ffffff' }}>LOGO</Text> 
                </Box>
                <Box style={styles.loadingBarSpace}>
                    <Box style={styles.loadingBar}>
                        <Animated.View style={[styles.progressBar, { width: width}]} />
                    </Box>
                </Box>
                </Box>
        </NativeBaseProvider>
    );
}

export default LoadingScreen;
