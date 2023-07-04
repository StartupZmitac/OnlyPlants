import React, { useRef, useEffect, useState } from "react";
import { Animated, Easing } from 'react-native'
import { NativeBaseProvider, Text, Icon, useToast, Box, Row, Button, Heading, Column, Checkbox, ScrollView, Center, VStack } from "native-base";
import { selectPlanted, updateDateWatered, selectAllGroups } from '../../database/PlantsDb.js'
import styles from './Mainpage.style.js'
import { AntDesign, Entypo } from '@expo/vector-icons';
import { updatePushNotification } from "../../notifications/Notifications.js";

const MainPage = () => {
    const [counter, setCounter] = useState(0);
    const [plantsList, setPlantList] = useState([]);
    const [groupList, setGroupList] = useState([]);
    const [stateList, setStateList] = useState([]);

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

    function setAndParsePlantList(resultSet) {
        var options = []
        for (let i = 0; i < resultSet.length; i++) {
            temp = JSON.stringify(resultSet.at(i));
            parsed = JSON.parse(temp);
            date_watered = new Date(parsed.date_watered)
            date_watered.setDate(date_watered.getDate() + parsed.interval)
            options.push({ id: parsed.id, name: parsed.custom_name, checked: false, date: date_watered, interval: parsed.interval, group: parsed.group_id_fk, clickable: true });
        }
        setPlantList(options);
    }

    function setAndParseGroupList(resultSet) {
        var options = []
        var states = [];
        for (let i = 0; i < resultSet.length; i++) {
            temp = JSON.stringify(resultSet.at(i));
            parsed = JSON.parse(temp);
            console.log(parsed)
            options.push({id: parsed.group_id, name: parsed.name});
            states.push({groupId: parsed.group_id, checked: false});
        }
        setGroupList(options);
        setStateList(states);
    }

    useEffect(() => {
        selectPlanted(setAndParsePlantList);
        selectAllGroups(setAndParseGroupList);
    }, []);

    const getDayName = () => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const index = (new Date().getDay() + (counter % 7) + 7) % 7;
        return days[index];
    }

    const getDateText = () => {
        now = new Date()
        now.setDate(now.getDate() + counter)
        return now
    }

    const waterGroup = (checkbox) => {
        now = new Date()
        //console.log("watering group", checkbox)
        var tempStates = []
        for (let i = 0; i < stateList.length; i++) {
            if (stateList.at(i).groupId == checkbox.id) {
                tempStates.push({groupId: stateList.at(i).groupId, checked: true});
                console.log("watering grop: ", stateList.at(i).groupId)
            }
            else {
                if (stateList.at(i).checked === false) {
                    tempStates.push({groupId: stateList.at(i).groupId, checked: false});
                }
            }
        }
        console.log("current states: ", tempStates)
        setStateList(tempStates);
        console.log(now.toString());
        var groupedPlants = plantsList.filter((plant) => {
            if (plant.group == checkbox.id) {
              console.log("watering plant: ", plant);
              return plant;
            }
          });
        for (let i = 0; i < groupedPlants.length; i ++) {
          updateDateWatered(groupedPlants.at(i).id, now.toString())
        }
        updatePushNotification(checkbox.name, checkbox.interval);
        toast.show({
            description: `Watered group: ${checkbox.name}`
        });
    }

    const waterPlant = (checkbox) => {
      now = new Date()
      checkbox.checked = true;
      updateDateWatered(checkbox.id, now.toString());
      console.log(now.toString());
      updatePushNotification(checkbox.name, checkbox.interval);
      toast.show({
        description: `Watered plant: ${checkbox.name}`
      });
    }

    const displayPlants = () => {
        var plantsNotGrouped = plantsList.filter((plant) => {
          if (plant.group == null) {
            return plant;
          }
        });

        var groupedPlants = plantsList.filter((plant) => {
          if (plant.group !== null) {
            return plant;
          }
        });

        var groupsToDisplay = checkGroups(groupedPlants);

        console.log("groups to display: ", groupsToDisplay);
        return ((plantsNotGrouped.filter((checkbox) => {
            if(checkbox.checked === false && checkDate(checkbox)) {
                return checkbox;
              }
            }).map((checkbox) => {
              return (<Box key={checkbox.id} style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingBottom: '5%',
                }}>
                <Box style={[styles.plantButton, { backgroundColor: checkbox.clickable ? '#FFC090' : '#c8ccc2' }]}>
                  <Icon color="#FFFFFF" size={6} as={<Entypo name="drop" />} />
                </Box>
                <Button disabled={!checkbox.clickable} onPress={() => waterPlant(checkbox)} style={[styles.inputField, { backgroundColor: checkbox.clickable ? '#FFC090' : '#c8ccc2' }]}>
                    <Text bold style={styles.label}>{checkbox.name}</Text>
                </Button>
              </Box>
            )})).concat(groupsToDisplay.filter((checkbox) => {
                var state = true;
                for (let i = 0; i < stateList.length; i++) {
                    if (stateList.at(i).groupId == checkbox.id) {
                        state = stateList.at(i).checked;
                    }
                }
                console.log("group watered: ", state);
                if(state === false && checkDate(checkbox)) {
                    return checkbox;
                  }
                }).map((checkbox) => {
                  return (<Box key={checkbox.id} style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingBottom: '5%',
                    }}>
                    <Box style={[styles.plantButton, { backgroundColor: checkbox.clickable ? '#FFC090' : '#c8ccc2' }]}>
                      <Icon color="#FFFFFF" size={6} as={<Entypo name="drop" />} />
                    </Box>
                    <Button disabled={!checkbox.clickable} onPress={() => waterGroup(checkbox)} style={[styles.inputField, { backgroundColor: checkbox.clickable ? '#FFC090' : '#c8ccc2' }]}>
                        <Text bold style={styles.label}>{checkbox.name}</Text>
                    </Button>
                  </Box>
                )})));
    }

    const checkGroups = (groupedPlants) => {
      var groupsToDisplay = [];
      var groupIds = [];
      var groupIntervals = [];
      var groupWateringDates = [];
      //console.log("plants: ", groupedPlants);
      for (let i = 0; i < groupedPlants.length; i++) {
        if (!groupIds.includes(groupedPlants.at(i).group)) {
          console.log(groupedPlants.at(i));
          groupIds.push(groupedPlants.at(i).group);
          groupIntervals.push(groupedPlants.at(i).interval);
          var date_watered = new Date(groupedPlants.at(i).date);
          date_watered.setDate(date_watered.getDate() + groupedPlants.at(i).interval);
          groupWateringDates.push(date_watered);
        }
      }
      console.log("ids: ", groupIds);
      console.log("intervals: ", groupIntervals);
      console.log("dates: ", groupWateringDates);
      for (let i = 0; i < groupIds.length; i++) {
        var groupName;
        for (let j = 0; j < groupList.length; j++) {
          if (groupList.at(j).id == groupIds.at(i)) {
            groupName = groupList.at(j).name;
          }
        }
        console.log(groupName);
        groupsToDisplay.push({id: groupIds.at(i), name: groupName,
          interval: groupIntervals.at(i), clickable: true, checked: false, date: groupWateringDates.at(i)});
      }
      return groupsToDisplay;
    }

    const checkDate = (date) => {
        now = new Date()
        now.setDate(now.getDate() + counter)
        now.setHours(0, 0, 0, 0);

        date.date.setHours(0, 0, 0, 0);

        day = 1000 * 60 * 60 * 24;
        //check difference between dates, if modulo == interval
        difference = (now.getTime() - date.date.getTime()) / day
        console.log(difference)

        if (date.date.getDate() === now.getDate() &&
            date.date.getMonth() === now.getMonth() &&
            date.date.getFullYear() === now.getFullYear()) {
            date.clickable = true
            return true;
        }

        if (difference % date.interval == 0 && difference >= 0) {
            console.log(date.name)
            date.clickable = false
            return true;
            //here we can have unclickable forecast
        }
        console.log(date.clickable)
        return false;

    }
    const toast = useToast();

    return (
        <NativeBaseProvider>
            <Box style={styles.mainBody}>
                <Row>
                    <Button style={{ bottom: '25%', marginRight: '5%', backgroundColor: '#FFC090', borderRadius: 50 }} onPress={clickLeft}>
                        <AntDesign name="leftcircleo" size={24} color="#FFFFFF" />
                    </Button>
                    <Box style={styles.dayHeader}>
                        <Text bold fontSize="2xl" style={{ color: '#ffffff', bottom: '-9%' }}>{`${getDayName()} ${getDateText().getDate()}.${getDateText().getMonth() + 1}`}</Text>
                    </Box>
                    <Button style={{ bottom: '25%', marginLeft: '5%', backgroundColor: '#FFC090', borderRadius: 50 }} onPress={clickRight}>
                        <AntDesign name="rightcircleo" size={24} color="#FFFFFF" />
                    </Button>
                </Row>
                <Box style={styles.choiceBox}>
                    <ScrollView w="80%" h="70%">
                        <VStack flex="1">
                            {displayPlants()}
                        </VStack>
                    </ScrollView>
                </Box>
            </Box>
        </NativeBaseProvider>
    );
}

export default MainPage;