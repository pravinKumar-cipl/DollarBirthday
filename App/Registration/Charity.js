import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  Image,ScrollView, ImageBackground
} from 'react-native';

import images from '../Constant/Images';
import styles from './Style/CharityStyle';
import DatePicker from 'react-native-datepicker';
import { Dropdown } from 'react-native-material-dropdown';

export default class SignUp extends Component {


  constructor(props){

   super(props);

   this.state = {'date': new Date(Date.now())};
 }


  render(){
    let data = [{
      value: 'Banana',
    }, {
      value: 'Mango',
    }, {
      value: 'Pear',
    }];

  return(
<Image style = {styles.backgroundImage} source = {images.loginbackground}>
<View style = {styles.titleContainer}>
  <Text style = {styles.titleTextFirst}>Join the</Text>
  <Text style = {styles.titleTextSecond}>Dollar Birthday Club!</Text>
  <Image style = {styles.logo} source = {images.baseLogo}/>
</View>
<View style = {[styles.TextInputContainer]}>
  <Text style = {styles.heading1}>Giving is Living</Text>
</View>
<View style = {[styles.TextInputContainer]}>
  <Text style = {styles.subhead1}>Setup a default charity to send a donation</Text>
  <Text style = {styles.subhead1}>to everytime you send a gift to a friend.</Text>
</View>
<ScrollView keyboardShouldPersistTaps="always">
  <View style = {styles.EmailTextInputContainer}>
    <Dropdown
          label='Choose a Charity'
          style = {styles.TextInputStyle}
          containerStyle ={{marginTop:-30}}
          baseColor = '#B3B3B3'
          data={data}
          onChangeText = {(value,index,data)=>{console.log(data[index]);}}
        />
  </View>
  <View style = {styles.TextInputContainer}>
    <TextInput
    style = {styles.TextInputStyle}
    keyboardType = 'default'
    placeholderTextColor = "#b7b7b7"
    placeholder = 'Donation Value'
    underlineColorAndroid = 'transparent'
    multiline = {false} maxLength = {100}
    />
    <Text style = {styles.TextInputLine} />
    <Image style = {styles.TextInputIcon} source = {images.dollarIcon}/>
  </View>
  <View style = {[styles.TextInputContainer]}>
    <TouchableOpacity
    style = {[styles.signInButtonContainer,{backgroundColor:'#DC6966'}]}
    onPress = {this.onLoginClick}>
      <Text style = {styles.signInButton}>Save Charity</Text>
    </TouchableOpacity>
    <Text style = {styles.term_service}>Edit this charity default at anytime in the setting panel</Text>
  </View>
</ScrollView>
</Image>);

  }
}
