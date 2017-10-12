import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  Image,ScrollView, ImageBackground,
  ActivityIndicator,
  AsyncStorage,
  Modal,
  TouchableHighlight
} from 'react-native';

import Toast from 'react-native-simple-toast';
import images from '../Constant/Images';
import styles from './Style/CalendarStyle';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import DatePicker from 'react-native-datepicker';
import MyActivityIndicator from '../Component/MyActivityIndicator';
import { USER_KEY, AUTH_TOKEN, USER_DETAILS, onSignIn, setUserDetails, afterSignIn } from '../Constant/Auth';
import {callApiWithAuth} from '../Service/WebServiceHandler';
const date = new Date(Date.now());
import { NavigationActions } from 'react-navigation';
const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'DASHBOARD' })],
    });
export default class Calendars extends Component {

constructor(props){
    super(props);
    this.displaybirthdays = this.displaybirthdays.bind(this);
    this.modalOpen = this.modalOpen.bind(this);
    this.checkyear = this.checkyear.bind(this);
    this.navigatetoSendGift = this.navigatetoSendGift.bind(this);
    this.state = {
        Friends:[],
        auth_token: '',
        friends_date:{},
        dateSelected:{},
        showProgress: false,
        modalVisible: false,
        calendaryear:'',
        monthshort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    };
}

navigatetoSendGift(friend){
    this.setModalVisible(false);
    this.props.navigation.navigate('SEND_GIFT',{"friend":friend});
}

setModalVisible(visible) {
    this.setState({modalVisible: visible});
}
//friend.picture
displaybirthdays(){
    return this.state.Friends.map((friend) => {
        var date = new Date(friend.birth_date);
        var day = date.getDate();
        var month = date.getMonth() + 1;
        if(day == this.state.dateSelected.day && month == this.state.dateSelected.month){
            return (<View style={styles.item}>
               <View style={styles.picw}><Image style = {styles.pic} source = {images.placeholderImage}/></View>
               <View style={styles.namew}><Text style={styles.name}>{friend.full_name}<Text style = {styles.userbirthdate}> | {this.state.monthshort[this.state.dateSelected.month-1]} {this.state.dateSelected.day}</Text></Text></View>
               <View style={styles.btnw}>
                  <TouchableOpacity style={styles.btn1} onPress={()=>{this.navigatetoSendGift(friend);console.log(friend.email);}}>
                    <Text style={styles.text1}>Send Gift</Text>
                  </TouchableOpacity>
               </View>
               </View>
            )
        }
    });
}

modalOpen(selectedDate){
    this.state.dateSelected = selectedDate;
    this.setModalVisible(true);
}

checkyear(month){
    if(this.state.calendaryear != month.year){
        this.state.calendaryear = month.year;
        friends_date:{};
        for (let friend of this.state.Friends) {
            var temp = new Date(friend.birth_date);
            var tempday = temp.getDate();
            if(tempday < 10){
                tempday = "0"+tempday;
            }
            var tempmonth = temp.getMonth() + 1;
            if(tempmonth < 10){
                tempmonth = "0"+tempmonth;
            }
            var date = this.state.calendaryear+'-'+tempmonth+'-'+tempday;
            this.state.friends_date[date]={marked: true};
        }
    }
}

componentWillMount(){
    //this.setState({name: this.props.navigation.state.params.name});
    this.setState({showProgress : true});
        AsyncStorage.getItem(USER_KEY).then((key)=>{
          //this.setState({user_key: key});
        }).catch((err)=>{
          Toast.show(err);
        });
        AsyncStorage.getItem(AUTH_TOKEN).then((token)=>{
           this.setState({auth_token: token});
             callApiWithAuth('user/friends','GET', this.state.auth_token).then((response) => {
                if(response.status === 200){
                  response.json().then((responseobject) => {
                    this.setState({ Friends: responseobject.data });
                    this.state.calendaryear = (new Date()).getFullYear();
                    let friends_date = {};
                    for (let friend of this.state.Friends) {
                        var temp = new Date(friend.birth_date);
                        var tempday = temp.getDate();
                        if(tempday < 10){
                            tempday = "0"+tempday;
                        }
                        var tempmonth = temp.getMonth() + 1;
                        if(tempmonth < 10){
                            tempmonth = "0"+tempmonth;
                        }
                        var date = this.state.calendaryear+'-'+tempmonth+'-'+tempday;
                        friends_date[date]={marked: true};
                    }
                    this.setState({friends_date: friends_date});
                  });
                  this.setState({showProgress : false});
                  //Toast.show('Task fetched');
                }else if (response.status === 401) {
                   this.setState({showProgress : false});
                   Toast.show('Error fetching friends');
                }else if (response.status === 500) {
                   this.setState({showProgress : false});
                   Toast.show('Error fetching friends:500');
                }
             }).catch((error) => { this.setState({showProgress : false}); console.log(error); });
        }).catch((err)=>{
          onSignOut;
          Toast.show(err);
        });
        AsyncStorage.getItem(USER_DETAILS).then((details)=>{
          details = JSON.parse(details);
          //this.setState({user_details: details});
        }).catch((err)=>{
          Toast.show(err);
        });
    }

render(){
    return(
        <Image style = {styles.backgroundImage} source = {images.background}>
            <MyActivityIndicator progress={this.state.showProgress} />
            <TouchableOpacity style = {[styles.dashboardIconw]} onPress={()=>{this.props.navigation.dispatch(resetAction);}}>
              <Image style={styles.img} source = {images.dashboardIcon}/>
            </TouchableOpacity>
            <View style = {styles.titleContainer}>
                <Text style = {styles.titleTextFirst}>Birthday Calendar</Text>
                <Text style = {styles.titleTextSecond}>Dollar Birthday Club!</Text>
            </View>
            <View style = {styles.TextInputContainer}>
                <ScrollView keyboardShouldPersistTaps="always">
                    <Calendar
                    // Specify style for calendar container element. Default = {}
                    style = {styles.calendar}
                    monthFormat={'MMM yyyy'}
                    onMonthChange={(month) => {this.checkyear(month)}}
                    markedDates={this.state.friends_date}
                    onDayPress={(day) => {this.modalOpen(day) }}
                    // Specify theme properties to override specific styles for calendar parts. Default = {}

                    />
                </ScrollView>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {this.setModalVisible(false) }}
            >
                <View style={styles.modalparentview}>
                    <View style={styles.modaldata}>
                      <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                        <Text style={{flex:0.9,paddingLeft:'3%',fontSize:18}}>Birthdays on {this.state.dateSelected.day} {this.state.monthshort[this.state.dateSelected.month-1]}</Text>
                        <TouchableOpacity style={{flex:0.1,padding:10,alignSelf:'flex-end'}} onPress={() => { this.setModalVisible(!this.state.modalVisible) }}>
                            <Image style={{width:15,height:15}} source={images.crossicon} />
                        </TouchableOpacity>
                      </View>
                      <View style={[{backgroundColor:'#5e4289',padding:6,}]}>
                          <ScrollView >
                              {this.displaybirthdays()}
                          </ScrollView>
                      </View>
                    </View>
                </View>
            </Modal>
        </Image>
        );

    }
}
