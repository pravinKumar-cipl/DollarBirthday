import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  ImageBackground,
  AsyncStorage,
  ListView,
  Linking,
  Platform,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import MyActivityIndicator from '../Component/MyActivityIndicator';
import {checkinternetconnectivity} from '../Constant/netinfo';
import Label from '../Constant/Languages/LangConfig';
import images from '../Constant/Images';
import styles from './Style/UpcomingsStyle';
import { USER_KEY, AUTH_TOKEN, USER_DETAILS, onSignOut } from '../Constant/Auth';
import {callApiWithAuth} from '../Service/WebServiceHandler';
import MaterialTabs from 'react-native-material-tabs';
import { NavigationActions } from 'react-navigation';
import settings from '../Constant/UrlConstant';

const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'DASHBOARD' })],
    });

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
export default class upcomings extends Component {
  constructor(props){
   super(props);
   this.state = {
     f_list:{recent:[],up_next:[],up_coming:[]},
     auth_token:'',
     user_key:false,
     showProgress:false,
     user_details:[],
     selectedTab:0,
   };
  }
  componentDidMount(){
  //this.setState({name: this.props.navigation.state.params.name});
      AsyncStorage.getItem(USER_KEY).then((key)=>{
        this.setState({user_key: key});
      }).catch((err)=>{
        Toast.show(err);
      });
      AsyncStorage.getItem(AUTH_TOKEN).then((token)=>{
        this.setState({auth_token: token,showProgress : true}); console.log(this.state);
        checkinternetconnectivity().then((response)=>{
          if(response.Internet == true){
          callApiWithAuth('user/upcoming','GET', this.state.auth_token).then((response) => {

             if(response.status === 201){
               response.json().then((responseobject) => {
                 console.log(responseobject.data);
                 this.setState({ f_list: responseobject.data,showProgress : false });
                 console.log(responseobject.data);
               });
               //Toast.show('Friend list fetched');
             }else if (response.status === 401) {
               onSignOut(this);
               this.setState({showProgress : false});
               Toast.show(Label.t('51'));
             }else if (response.status === 404) {// no friend in list
                this.setState({showProgress : false});
                Toast.show(Label.t('146'));
             }else if (response.status === 406) {
                this.setState({showProgress : false});
                Toast.show(Label.t('50'));
             }else if (response.status === 500) {
               this.setState({showProgress : false});
               Toast.show(Label.t('52'));
              }
          }).catch((error) => {
            this.setState({showProgress : false});
            Toast.show(Label.t('155'));
            console.log(error); 
            });
        }else{
          Toast.show(Label.t('140'));
        }
      });
      }).catch((err)=>{
        onSignOut;
        console.log(err);
        Toast.show(err);
      });
      AsyncStorage.getItem(USER_DETAILS).then((details)=>{
        details = JSON.parse(details);
        this.setState({user_details: details});
      }).catch((err)=>{
        Toast.show(err);
      });
  }
  navigatetoSendGift(friend){
    checkinternetconnectivity().then((response)=>{
      if(response.Internet == true){
          if (Platform.OS === 'android') {
              this.props.navigation.navigate('SEND_GIFT',{"friend":friend});
          }else{
            this.openURL(settings.BASE_URL+'/mobileapp?type='+settings.ROUTE_TYPE.send_gift+'&from='+settings.ROUTE_TYPE.upcoming+'&fid='+friend.id+'&t='+this.state.auth_token);
          }
          
      }else{
          Toast.show(Label.t('140'));
      }
    });
  }
  openURL = (url) => {
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
       console.log('Can\'t handle url: ' + url);
     } else {
       return Linking.openURL(url);
     }
   }).catch(err => console.error('An error occurred', err));
 }

  renderRow(data) {
    console.log(data);
    //let date = new Date(data.birth_date)
    const monthsLong = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    let temp = data.birth_date.split("-");// YYYY-MM-DD
    let tempday = temp[2];
    
    let tempmonth = temp[1] -1;
    tempmonth = monthsLong[tempmonth];
    let tempyear = temp[0];
    let birth_date = tempmonth+" "+tempday+", "+tempyear;
       return (
        <View style={styles.item}>
           <View style={styles.picw}><Image style = {styles.pic} source = {images.placeholderImage}/></View>
           <View style={styles.namew}><Text style={styles.name}>{data.first_name+' '+data.last_name}</Text><Text style={{color:'#8F8F8F'}}>{birth_date}</Text></View>
           <View style={styles.btnw}>
              <TouchableOpacity style={styles.btn1} onPress={()=>{this.navigatetoSendGift(data);console.log(data.email);}}>
                <Text style={styles.text1}>{Label.t('13')}</Text>
              </TouchableOpacity>
           </View>
        </View>
       );
     }



  render(){
  return(
    <Image style = {styles.backgroundImage} source = {images.loginbackground}>
      <View style={[styles.full]}>
        <MyActivityIndicator progress={this.state.showProgress} />
          <Image style = {[styles.top,styles.containerWidth]} source = {images.topbackground} >
            <TouchableOpacity style = {[styles.dashboardIconw]} onPress={()=>{this.props.navigation.dispatch(resetAction);}}>
              <Image style={styles.img} source = {images.dashboardIcon}/>
            </TouchableOpacity>
            <View style = {[styles.titleContainer,{height:'45%'}]}>
              <Text style = {styles.titleTextFirst}>{Label.t('138')}</Text>
              <Text style = {styles.titleTextSecond}>{Label.t('1')}</Text>
            </View>
          </Image>
        <View style={[styles.formgroup,styles.containerWidth,{height:'55%'}]}>
            <View style = {[styles.tabs]}>
              <MaterialTabs
                items={[Label.t('19'), Label.t('20'), Label.t('21')]}
                barColor="#FFFFFF"
                indicatorColor='#DC6865'
                activeTextColor='#DC6865'
                inactiveTextColor= '#3B3B3A'
                scrollable = {false}
                selectedIndex={this.state.selectedTab}
                onChange={(index) => this.setState({selectedTab: index})}/>
            </View>
            <View style={[styles.TabContainer,styles.marginTopFive]}>
              <ScrollView keyboardShouldPersistTaps="never">
                  <ListView
                      dataSource={ds.cloneWithRows(this .state.selectedTab == 0 ? this.state.f_list.recent:(this .state.selectedTab == 1? this.state.f_list.up_next:(this .state.selectedTab == 2? this.state.f_list.up_comming:[])))}
                      renderRow={(data) => this.renderRow(data)}
                      enableEmptySections={true}
                  />
              </ScrollView>
            </View>
          </View>
      </View>
    </Image>);
  }
}
