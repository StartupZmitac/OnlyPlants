import { StyleSheet, Dimensions } from 'react-native';
export default StyleSheet.create({
  mainBody: {
    backgroundColor: '#B1D7B4',
    alignItems: 'center',
    paddingTop: '10%',
    paddingBottom: '10%',
    height: '100%'
  },
  choiceBox: {
    backgroundColor: '#F7F6DC',
    height: '100%',
    width: '80%',
    alignItems: 'center',
    borderRadius: 50,
    padding: '5%',
    paddingTop: '10%'
  },
  inputField:{
    backgroundColor: '#FFC090',
    width: '60%',
    height: '100%',
  },
  titleBox: {
    backgroundColor: '#7FB77E',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#FFC090',
    color: "#F7F6DC",
    variant: "rounded",
    borderRadius: 50,
    width: '100%',
    alignItems: 'center'
  },
  photoBox: {
    backgroundColor: '#B1D7B4',
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').width * 0.5,
    borderRadius: Math.round((Dimensions.get('window').height + Dimensions.get('window').width) / 2),
    alignItems: 'center'
  }
  });