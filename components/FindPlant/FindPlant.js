import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator, TextInput} from 'react-native';
import styles from './FindPlant.style.js'

const FindPlant = () => {
  let [isLoading, setIsLoading] = useState(true);
  let [error, setError] = useState();
  let [response, setResponse] = useState();
  let [query, setQuery] = useState('');

  useEffect(() => {
    const apiKey = 'sk-ROVe642993dacc8c4178';
    fetch(`https://perenual.com/api/species-list?q=${query}&key=${apiKey}`)
      .then(res => res.json())  
      .then(
        (result) => {
          setIsLoading(false);
          setResponse(result);
        },
        (error) => {
          setIsLoading(false);
          setError(error);
        }
      )
  }, []);

  const getContent = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" />;
    }

    if (error) {
      return <Text>{error}</Text>
    }
    
    if(typeof(response)!== 'undefined'){
      console.log(response);
      return <Text>{response.data[0].common_name}</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        onSubmitEditing={text => setQuery(text)}
        placeholder="insert plant name"
      />
      {getContent()}
      <StatusBar style="auto" />
    </View>
  );
}

export default FindPlant