import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { writeNewPlant } from './firebaseConfig'
export default function App() {
  console.log('hello')
  writeNewPlant()
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