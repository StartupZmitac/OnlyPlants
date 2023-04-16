import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { writeNewPlant } from './firebaseConfig'
export default function App() {
  console.log('hello')
  writeNewPlant()
  return (
    <View style={styles.container}>
      <Text>kocham piwo</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});