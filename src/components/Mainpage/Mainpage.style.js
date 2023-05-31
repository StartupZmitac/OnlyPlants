import { StyleSheet } from 'react-native';
export default StyleSheet.create({
    mainBody: {
        backgroundColor: '#B1D7B4',
        alignItems: 'flex-start',
        paddingTop: '20%',
        height: '100%'
      },
      choiceBox: {
        backgroundColor: '#F7F6DC',
        height: '78%',
        width: '80%',
        alignItems: 'center',
        borderRadius: 50,
        padding: '5%'
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
      label: {
        color: '#FFFFFF',
        fontSize: 20,
        
      },
      checkboxContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginBottom: 20,
        padding: '5%', 
      },


      
      clear: {
        clear: 'both',
      },
      checkBox: {
        display: 'block',
        cursor: 'pointer',
        width: 30,
        height: 30,
        borderWidth: 3,
        borderColor: 'rgba(255, 255, 255, 0)',
        borderRadius: 10,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0px 0px 0px 2px #fff',
      },
      checkBoxDiv: {
        width: 60,
        height: 60,
        backgroundColor: '#fff',
        top: -52,
        left: -52,
        position: 'absolute',
        transform: [{ rotateZ: '45deg' }],
        zIndex: 100,
      },
      checkedCheckBoxDiv: {
        left: -10,
        top: -10,
      },
      checkBoxInput: {
        position: 'absolute',
        left: 50,
        visibility: 'hidden',
      },
      transition: {
        transitionDuration: '300ms',
        transitionTimingFunction: 'ease',
      },
  });