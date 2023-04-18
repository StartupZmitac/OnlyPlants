import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import FindPlant from './src/components/FindPlant/FindPlant';

const App = () => { 
  return (
    <View style={styles.container}>
      <FindPlant />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    },
});
export default App