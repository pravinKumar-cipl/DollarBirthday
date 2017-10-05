import {
  StyleSheet,
  Platform
  } from 'react-native';

  import {Dimensions} from 'react-native';
  const { width, height } = Dimensions.get('window');

  const styles = StyleSheet.create({

    backgroundImage: {
     flex: 1,
     width:  width,
     height: height,
     resizeMode: 'stretch'
    },
    baseContainer: {

     width: width,
     height: height,

   },
  titleContainer: {
    width: width,
    marginTop: 40,
    alignItems: 'center',
    backgroundColor:'transparent',
    height:'36%',
  },

   titleTextFirst: {
     fontSize: 18,
     color:'#efd7fe',
    fontFamily:'OpenSans-Semibold'
   },

   titleTextSecond: {
     fontSize: 25,
     fontWeight: 'bold',
     color:'#ffffff',
     fontFamily:'OpenSans-Semibold'
   },

TextInputStyle: {
    width: '100%',
    height: 30,
    fontSize:14,
    paddingBottom:0,
    marginBottom:0,
    paddingRight:18,
    fontFamily:'Open Sans',
  },
  TextInputContainer: {
   width:'95%',
   alignSelf: 'center',
  },
TextInputIcon: {
   width: 18,
   height: 18,
   borderBottomWidth: 1,
   resizeMode:'contain',
   position:'absolute',
   zIndex: 99,
   right:0,
   top:6,
 },
 signInButtonContainer: {

   width: '100%',
   height:40,
   marginTop: 5,
   backgroundColor:'#84ce6f',
   justifyContent:'center',
   alignItems:'center'
 },

 facebookButtonContainer: {

   width: '100%',
   height:50,
   marginTop: 20,
   backgroundColor:'#426cb1',
   justifyContent:'center',
   alignItems:'center',
   marginBottom:20,
 },

 signInButton: {

   fontSize: 18,
   color:'#ffffff',
   fontFamily:'OpenSans-Semibold'
 },

 dob_label: {

   fontSize: 14,
   color:'#000000',
   backgroundColor:'transparent',
   fontFamily:'Open Sans'
 },

 date_picker:{
   width: '100%',
   alignSelf: 'center',
   backgroundColor:'transparent',
   marginBottom:1,
   },

   dateInput:{
        alignItems : 'flex-start',
        padding : 5,
        borderWidth : 0,
        borderBottomColor : '#e0e0e0',
        borderBottomWidth : 1,

      },
   dateIcon:{
         position: 'absolute',
         right: 0,
         top:20,
         width: 12,
         height: 12,
         marginLeft: 0
      },
   errorMsg: {

    backgroundColor: 'transparent',
    color:'#ff0000',
    fontSize: 16,
    width:'95%',
    alignSelf:'center',
  },

 orDivider: {

   fontSize: 16,
   color:'#000000',
   alignSelf:'center',
   marginTop:20,
   backgroundColor:'transparent',
   fontStyle: 'italic'
 },

 term_service: {

   fontSize: 14,
   color:'#b7b7b7',
   fontFamily:'Open Sans',
   marginTop:5,
   backgroundColor:'transparent',
   fontFamily:'Open Sans'
 },

 facebookButton:{
   width:'100%',
   height:'100%',
   resizeMode:'contain'
 },

login_button: {

      fontSize: 14,
      color:'#5e3a93',
      marginTop: 5,
      alignSelf:'flex-end',
      backgroundColor:'transparent',
      fontFamily:'Open Sans'
    },
    button_below:{
      fontSize: 9,
      color:'#C2C2C2',
      marginTop: 5,
      alignSelf:'center',
      backgroundColor:'transparent',
      fontFamily:'Open Sans'
    },
linkColor:{
    color:'#5e3a93',
  },
activityloder:{
    position:'absolute',
    flex:1,
    width:width,
    height:height,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
    },
    formgroup:{
      backgroundColor:'transparent',
      height:'100%',
      overflow:'hidden',
      width: '100%',
    },inputBorderBottom: {
      borderBottomWidth: 1,
      borderBottomColor: '#e0e0e0'
      },

  });

  export default styles;