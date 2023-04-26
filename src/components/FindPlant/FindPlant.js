import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator, TextInput} from 'react-native';
import styles from './FindPlant.style.js'
import { NativeBaseProvider, Box, Button, Heading, Input, Row } from 'native-base';

// @flow
const FindPlant = () => {
  let [isLoading, setIsLoading] = useState(true);
  let [error, setError] = useState();
  let [response, setResponse] = useState();
  let [query, setQuery] = useState('monstera');

  useEffect(() => {
    
  }, []);

  const handleCall = () => {
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
  }

  const getContent = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" />;
    }

    if (error) {
      return <Text>{error}</Text>
    }

    if(typeof(response)!== 'undefined'){

      console.log(query);
      console.log(response);
      responseJson = JSON.stringify(response)
      if(responseJson.includes("Surpassed API Rate Limit")){
        seconds = responseJson.slice(65,70)
        return <Text>{`Too many API calls :( Retry in ${seconds} seconds`}</Text>;
      }
      return <Text>{response.data[0].common_name}</Text>;
    }
  };

  return (
    <NativeBaseProvider>
      <Box>
        <Box style={styles.mainBody}>
          <Input 
              variant="rounded"
              placeholder="Search..."
              onChangeText={text => setQuery(text)}
              placeholderTextColor="#F7F6DC"
              defaultValue={""}
              fontSize={'20'} 
              width={'80%'}
              style={styles.inputField}
          />
          <Box style={styles.choiceBox}>
            {getContent()}
          </Box>
          <Row style={{alignItems: 'center', padding: '5%'}}>
          <Button size="lg" onPress={handleCall} style={{backgroundColor: '#FFC090', color: "#F7F6DC"}}>Find</Button>
          </Row>
        </Box>
      </Box>
    </NativeBaseProvider>
  );
}

export default FindPlant