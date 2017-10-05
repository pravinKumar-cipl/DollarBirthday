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
} from 'react-native';
import Toast from 'react-native-simple-toast';
import MyActivityIndicator from '../Component/MyActivityIndicator';
import images from '../Constant/Images';
import styles from './Style/UpcomingsStyle';
import { USER_KEY, AUTH_TOKEN, USER_DETAILS, onSignOut } from '../Constant/Auth';
import {callApiWithAuth} from '../Service/WebServiceHandler';
import { NavigationActions } from 'react-navigation';
import MaterialTabs from 'react-native-material-tabs';
const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'DASHBOARD' })],
    });
const monthNames = [ "January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December" ];
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
          callApiWithAuth('user/upcoming','GET', this.state.auth_token).then((response) => {

             if(response.status === 201){
               response.json().then((responseobject) => {
                 console.log(responseobject.data);
                 this.setState({ f_list: responseobject.data,showProgress : false });
                 console.log(responseobject.data);
               });
               Toast.show('Friend list fetched');
             }else if (response.status === 401) {
               response.json().then((responseobject) => {
                 //this.setState({ f_list: responseobject.data.recent,showProgress : false });
                 console.log(responseobject);
               });
               console.log(this.state);
                this.setState({showProgress : false});
                Toast.show('Unauthorized');
             }else if (response.status === 404) {
                this.setState({showProgress : false});
                Toast.show('No Friend found');
             }else if (response.status === 406) {
                this.setState({showProgress : false});
                Toast.show('Invalid Data found');
             }else if (response.status === 500) {
                this.setState({showProgress : false});
                Toast.show('Task not fetched:500');
             }
          }).catch((error) => { this.setState({showProgress : false}); console.log(error); });
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
  renderRow(data) {
    console.log(data);
    let date = new Date(data.birth_date)
       return (
        <View style={styles.item}>
           <View style={styles.picw}><Image style = {styles.pic} source = {images.baseLogo}/></View>
           <View style={styles.namew}><Text style={styles.name}>{data.full_name}</Text><Text>{monthNames[date.getMonth()]},{date.getDate()} {date.getFullYear()}</Text></View>
           <View style={styles.btnw}>
              <TouchableOpacity style={styles.btn1} onPress={()=>{console.log(data.email);}}>
                <Text style={styles.text1}>Send Gift</Text>
              </TouchableOpacity>
           </View>
        </View>
       );
     }
  render(){
console.log(this.state.f_list);
let data = this .state.selectedTab == 0 ? this.state.f_list.recent:(this .state.selectedTab == 1? this.state.f_list.up_next:(this .state.selectedTab == 2? this.state.f_list.up_comming:[]))
console.log(data);
  return(
<Image style = {styles.backgroundImage} source = {images.loginbackground}>
  <MyActivityIndicator progress={this.state.showProgress} />
    <TouchableOpacity style = {[styles.dashboardIconw]} onPress={()=>{this.props.navigation.dispatch(resetAction);}}>
    <Image style={styles.img} source = {images.dashboardIcon}/>
  </TouchableOpacity>
  <View style = {styles.titleContainer}>
    <Text style = {styles.titleTextFirst}>Upcomings</Text>
    <Text style = {styles.titleTextSecond}>Dollar Birthday Club!</Text>
  </View>
  <View style = {[styles.TextInputContainer,{marginLeft:'3%',width:'94%',justifyContent:'center'},{
        shadowOpacity: 0.75,
        shadowRadius: 5,
        shadowColor: '#cccccc',
        shadowOffset: { height: 0, width: 0 },
        elevation:3,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
      }]}>
  <MaterialTabs
  items={['Recent Birthdays', 'Up Next', 'Upcoming Birthdays']}
  barColor="#FFFFFF"
  indicatorColor='#DC6865'
  activeTextColor='#DC6865'
  inactiveTextColor= '#3B3B3A'
  selectedIndex={this.state.selectedTab}
  onChange={(index) => this.setState({selectedTab: index})}/>
  </View>
    <View style={[styles.iconContainer,{height:'49%',marginTop: '4%'}]}>
      <ScrollView >
          <ListView
            dataSource={ds.cloneWithRows(data)}
            renderRow={(data) => this.renderRow(data)}
            enableEmptySections={true}
          />
      </ScrollView>
    </View>
</Image>);

  }
}
