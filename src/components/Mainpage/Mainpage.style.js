import { StyleSheet } from 'react-native';
export default StyleSheet.create({
    mainBody: {
        backgroundColor: '#B1D7B4',
        alignItems: 'center',
        paddingTop: '10%',
        height: '100%'
      },
      titleBox: {
        backgroundColor: '#7FB77E',
        alignItems: 'center'
      },
      checkboxContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: '5%',
      },
      choiceBox: {
        display: 'flex',
        backgroundColor: '#F7F6DC',
        height: '90%',
        width: '80%',
        alignItems: 'flex-start',
        borderRadius: 50,
        paddingLeft: '5%',
        paddingTop: '5%'
      },
      plantButton:{
        display: 'flex',
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFC090',
        borderRadius: 50,
        aspectRatio: 1,
        marginRight: '5%'
      },
      label: {
        color: '#FFFFFF',
        fontSize: 21.5, 
      },
      inputField:{
        backgroundColor: '#FFC090',
        borderRadius: 50,
      },
  });