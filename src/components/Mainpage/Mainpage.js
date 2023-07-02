import React, { useRef, useEffect, useState } from "react";
import { Animated, Easing } from 'react-native'
import { NativeBaseProvider, Text, Icon, useToast, Box, Row, Button, Heading, Column, Checkbox, ScrollView, Center, VStack } from "native-base";
import { selectPlanted, updateDateWatered } from '../../database/PlantsDb.js'
import styles from './Mainpage.style.js'
import { AntDesign, Entypo } from '@expo/vector-icons';
import { updatePushNotification } from "../../notifications/Notifications.js";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { weatherConditions } from "../../weather/WeatherConditions.js";

const MainPage = () => {
    const [counter, setCounter] = useState(0);
    const clickRight = () => {
        setCounter((prevCounter) => {
          const newCounter = prevCounter + 1;
          return newCounter;
        });
      };
      
      const clickLeft = () => {
        setCounter((prevCounter) => {
          const newCounter = prevCounter - 1;
          return newCounter;
        });
      };

    const [plantsList, setPlantList] = useState([]); 

    function setAndParsePlantList(resultSet){
        var options = []
        for (let i = 0; i < resultSet.length; i++) {
            temp = JSON.stringify(resultSet.at(i));
            parsed = JSON.parse(temp);
            console.log(parsed)
            date_watered = new Date(parsed.date_watered)
            date_watered.setDate(date_watered.getDate()+parsed.interval)
            console.log(date_watered)
            options.push({id: parsed.id, name: parsed.custom_name, checked: false, date: date_watered, interval: parsed.interval, clickable:true});
            console.log("row: ", options[i]);
        }
        setPlantList(options);
    }

    useEffect(() => {
        selectPlanted(setAndParsePlantList);
      }, []);

    const getDayName = () => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const index = (new Date().getDay() + (counter % 7) + 7) % 7;
        console.log(days[index]);
        return days[index];
    }

    const getDateText = () => {
        now = new Date()
        now.setDate(now.getDate()+counter)
        return now
    }

    const waterPlant = (checkbox) => {
        now = new Date()
        checkbox.checked = true;
        console.log(now.toString());
        updateDateWatered(checkbox.id, now.toString())
        updatePushNotification(checkbox.name, checkbox.interval);

        toast.show({
            description: `Watered plant: ${checkbox.name}`
        });
    }

    const fetchWeather = (counter) => {
        lat = 50.27
        lon = 19.03
        fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weathercode,temperature_2m_max&timezone=Europe%2FBerlin`
        )
          .then(res => res.json())
          .then(json => {
            console.log(json)
            temperature = json.daily.temperature_2m_max[counter],
            weatherCondition = json.daily.weathercode[counter]
          }
          );
        return{temp:temperature, weather: Number(String(weatherCondition)[0])};
      }

    const getWeather = () => {
        if(counter>=0&&counter<7){
            info = fetchWeather(counter)
            console.log(info)
            return(
            <Row>
            <Center mr='4' mb='2'>
            <MaterialCommunityIcons
                  size={72}
                  name={weatherConditions[info.weather].icon}
                  color={'#fff'}
                />
            </Center>
            <Center ml='4' mb='2'>
            <Text bold fontSize="3xl" style={{ color: '#ffffff'}}>{info.temp}˚</Text>
            </Center>
            </Row>)
        }
        else{
            return
        }
        
    }

    const checkDate = (date) => {
        now = new Date()
        now.setDate(now.getDate()+counter)
        now.setHours(0, 0, 0, 0);
        
        date.date.setHours(0, 0, 0, 0);

        day = 1000*60*60*24;
        //check difference between dates, if modulo == interval
        difference = (now.getTime() - date.date.getTime())/day
        console.log(difference)
        
        if (date.date.getDate() === now.getDate()&&
        date.date.getMonth() === now.getMonth()&&
        date.date.getFullYear() === now.getFullYear()){
            date.clickable=true
            return true;
        }

        if(difference%date.interval==0&&difference>=0){
            console.log(date.name)
            date.clickable=false
            return true;
        }
        console.log(date.clickable)
        return false;

    }
    const chooseChoiceBoxStyle = () => {
        if(counter>=0&&counter<7){
            return true
        }
        else{
            return false
        }
    }
    const toast = useToast();

    return (
        <NativeBaseProvider>
            <Box style={styles.mainBody}>
                <Row>
                    <Button style={{bottom: '25%', marginRight: '5%', backgroundColor: '#FFC090', borderRadius: 50}} onPress={clickLeft}>
                        <AntDesign name="leftcircleo" size={24} color="#FFFFFF" />
                    </Button>
                    <Box style={styles.dayHeader}>
                        <Text bold fontSize="2xl" style={{ color: '#ffffff', bottom: '-9%' }}>{`${getDayName()} ${getDateText().getDate()}.${getDateText().getMonth()+1}`}</Text>
                    </Box>
                    <Button style={{bottom: '25%', marginLeft: '5%', backgroundColor: '#FFC090', borderRadius: 50}} onPress={clickRight}>
                        <AntDesign name="rightcircleo" size={24} color="#FFFFFF" />
                    </Button>
                </Row>
                <Box>
                    {getWeather()}
                </Box>
                <Box style={chooseChoiceBoxStyle()?styles.choiceBoxWeather:styles.choiceBox}>
                    <ScrollView w={["200", "200"]} h="80">
                    <VStack flex="1">
                    {plantsList.map((checkbox) => (
                            checkbox.checked === false &&
                            checkDate(checkbox) &&
                            (<Box key={checkbox.id} style={{
                                flexDirection: "row",
                                alignItems: "center",
                                paddingBottom: '5%',
                            }}>
                                <Box style={[styles.plantButton, {backgroundColor: checkbox.clickable ? '#FFC090' : '#c8ccc2'}]}>
                                    <Icon color="#FFFFFF" size={6} as={<Entypo name="drop" />} />
                                </Box>
                                <Button disabled={!checkbox.clickable} onPress={() => waterPlant(checkbox)} style={[styles.inputField, {backgroundColor: checkbox.clickable ? '#FFC090' : '#c8ccc2'}]}>
                                    <Text bold style={styles.label}>{checkbox.name}</Text>
                                </Button>
                            </Box>
                            )))}
                    </VStack>
                    </ScrollView>
                </Box>
            </Box>
        </NativeBaseProvider>
    );
}

export default MainPage;