import { StyleSheet } from 'react-native';
export default StyleSheet.create({
    mainBody: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#7FB77E',
        justifyContent: 'center', 
        alignItems: 'center',
        
      },
    logoSlot:{
        bottom: '15%',
        backgroundColor: "#B1D7B4",
        width: '80%',
        height: '35%',
        borderRadius: 75,
        justifyContent: "center",
        alignItems: "center",    
        textAlign: "center",
    },
    loadingBarSpace:{
        top: '8%',
        backgroundColor: "#B1D7B4",
        width: '100%',
        height: '20%'
    },
    loadingBar: {
        top: '30%',
        backgroundColor: "#F7F6DC",
        height: "30%",
        width: "100%",
    },
    progressBar:{
        backgroundColor: "#FFC090",
        height: '100%',
        width: '10%',
    },

  choiceBox: {
    backgroundColor: '#F7F6DC',
    height: '80%',
    width: '80%',
    alignItems: 'center',
    borderRadius: 50,
    padding: '5%',
    fontSize: 20,
  },
  inputField:{
    backgroundColor: '#FFC090',
    color: "#F7F6DC",
    width: '30%',
    height: '100%',
    
  },
  titleBox: {
    backgroundColor: '#7FB77E',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#FFC090',
    color: "#F7F6DC"
  }
  });