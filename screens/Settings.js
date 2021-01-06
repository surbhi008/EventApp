import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, ImageBackground, Picker, Alert, View } from 'react-native';
import { Block, Text, theme, Button, Input } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';

import { compose } from "recompose"
import { callUpdateProfile, profileApiCall } from '../actions';
import { connect } from 'react-redux'
import withLoadingScreen from '../HOC/spinner';

import { Icon } from '../components';
import { Images, materialTheme } from '../constants';
import { HeaderHeight, validatePassword } from "../constants/utils";
import RNF_ImagePicker from '../components/RNF_ImagePicker';
import MapView from 'react-native-maps';
// import {  } from '@react-native-community/picker';
import { Keyboard } from 'react-native'
import {PasswordPopup} from './PasswordPopup';

const { width } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;
const PICKER_TYPE = {
  MILES: "MILES",
  ACCOUNT_TYPE: "TYPE"
}
class Settings extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      pickerHeight: 0,
      userId: this.props.profileData && this.props.profileData.userDetail.userId,
      userName: this.props.profileData && this.props.profileData.userDetail.userName,
      fullName: this.props.profileData && this.props.profileData.userDetail.fullName,
      email: this.props.profileData && this.props.profileData.userDetail.email,
      imageURL: this.props.profileData && this.props.profileData.userDetail.imageURL,
      miles: this.props.profileData && this.props.profileData.userDetail.miles,
      address: this.props.profileData && this.props.profileData.userDetail.address,
      locationLatLong: this.props.profileData && this.props.profileData.userDetail.locationLatLong,
      // password: this.props.profileData && this.props.profileData.userDetail.password,
      password: "Admin@123" ,
      accountType: "",
      pickerDataSource: [],
      selectedPicker: PICKER_TYPE.MILES,
      miles: ["5 miles", "10 miles", "25 miles", "100 miles", "150 miles"],
      accountType: ["Personal", "Business"],
      visiblePasswordModel: false,
      active: {
        userId: false,
        userName: false,
        fullName: false,
        email: false,
        imageURL: false,
        miles: false,
        address: false,
        locationLatLong: false,
        password: false,
      }};
  }

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  }

  selectPickerDataSource() {
    return this.state.selectedPicker === PICKER_TYPE.MILES ? this.setState({pickerDataSource: this.state.miles})  : this.setState({pickerDataSource: this.state.accountType})
  }

  handleUpdateProfile () {
    const {userId, userName, fullName, email, imageURL, miles, address, locationLatLong, password} = this.state
    if (!password) {
      Alert.alert("Please provide Password.")
      return
    }  else if (!(validatePassword(password))) {
      Alert.alert("Password must contain One LowerCase and UpperCase Character, One Special Character & One Number.")
      return
    } else if (!fullName) {
      Alert.alert("Please provide Full Name.")
      return
    } else if (!miles) {
      Alert.alert("Please provide Miles.")
      return
    } else if (!address) {
      Alert.alert("Please provide Address.")
      return
    } else if (!locationLatLong) {
      Alert.alert("Please select Location.")
      return
    } 

    // password.length === 0
    const request = {
      userId: userId,
      userName: userName,
      fullName: fullName,
      email: email,
      imageURL: imageURL,
      miles: miles,
      address: address,
      locationLatLong: locationLatLong,
      password: password,

      callback: (response) => {
        if (response.success) {   
          Alert.alert("Profile Updated Successfully.")
          this.props.getProfileData()
          this.setState({})
        } else {
          Alert.alert(response.message)
        }     
      }
    }
    this.props.callUpdateProfile(request)
  }

  componentDidMount() {
    console.log("profileData",this.props.profileData)
  }

  selectPickerItem() {
    this.setState({
      pickerHeight: 0
    })
  }

  render() {
    const { navigation } = this.props;
    const {selectedPicker, userName, fullName, email, imageURL, miles, address, locationLatLong, password, accountType} = this.state;
    return (
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0.25, y: 1.1 }}
        locations={[0.2, 1]}
        colors={['#000000', '#000000']}
        style={[styles.signin, {flex: 1, paddingTop: 10}]}>
        <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
      <Block flex style={styles.profile}>
        <ImageBackground
          source={{ uri: Images.Profile }}
          style={styles.profileContainer}
          imageStyle={styles.profileImage}>
          <Block flex style={styles.profileDetails}>
            <Block style={styles.profileTexts}>
              <Text color="white" size={28} style={{ paddingBottom: 8 }}>{this.props.profileData && this.props.profileData.userDetail.fullName}</Text>
              <Block row space="between">
                <Block row>
                  <Text color="white" size={16} muted style={styles.seller}>{this.state.email}</Text>
                </Block>
                <Block>
                  <Text color={theme.COLORS.MUTED} size={16}>
                    <Icon name="map-marker" family="font-awesome" color={theme.COLORS.MUTED} size={16} />
                    {`  `} {this.props.profileData && this.props.profileData.userDetail.address}
                  </Text>
                </Block>
              </Block>
            </Block>
            <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']} style={styles.gradient} />
          </Block>
        </ImageBackground>
        <Block flex={0.7}>
          <Block style={styles.options}>
              <Block row space="between">
                <Block flex={1}>
                  <Text bold size={14}>Change Password</Text>
                  <Input
                    bgColor='transparent'
                    placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                    color="black"
                    password
                    viewPass
                    value={"Admin@123"}
                    placeholder="Password"
                    iconColor="white"
                    // style={[styles.input, this.state.active.password ? styles.inputActive : null]}
                    onChangeText={text => this.handleChange('password', text)}
                    // onBlur={() => this.toggleActive('password')}
                    onFocus={() => 
                      {
                        Keyboard.dismiss()
                        this.setState({visiblePasswordModel: true})
                      }
                    }
                  />
                </Block>
              </Block>
              <Block row space="between">
                <Block flex={1}>
                  <Text bold size={14}>Full Name</Text>
                  <Input
                    bgColor='transparent'
                    placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                    color="black"
                    value={fullName}
                    autoCapitalize="none"
                    // style={[styles.input, this.state.active.fullName ? styles.inputActive : null]}
                    onChangeText={text => this.handleChange('fullName', text)}
                    // onBlur={() => this.toggleActive('fullName')}
                    // onFocus={() => this.toggleActive('fullName')}
                  />
                </Block>
              </Block>
              <Block row space="between">
                <Block flex={1}>
                  <Text bold size={14}>Miles</Text>
                    <Input
                    onFocus={()=>{
                      Keyboard.dismiss()
                      this.setState({
                        pickerHeight: this.state.pickerHeight > 0 ? 0 : 200,
                        selectedPicker: PICKER_TYPE.MILES
                      },()=>this.selectPickerDataSource())
                    }}
                    bgColor='transparent'
                    placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                    color="black"
                    value={miles}
                    autoCapitalize="none"
                    // style={[styles.input, this.state.active.miles ? styles.inputActive : null]}
                    onChangeText={text => this.handleChange('miles', text)}
                    // onBlur={() => this.toggleActive('miles')}
                    // onFocus={() => this.toggleActive('miles')}
                  />
                </Block>
              </Block>
              <Block row space="between">
                <Block flex={1}>
                  <Text bold size={14}>Account Type</Text>
                    <Input
                    onFocus={()=>{
                      Keyboard.dismiss()
                      this.setState({
                        pickerHeight: this.state.pickerHeight > 0 ? 0 : 200,
                        selectedPicker: PICKER_TYPE.ACCOUNT_TYPE
                      },()=>this.selectPickerDataSource())
                    }}
                    bgColor='transparent'
                    placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                    color="black"
                    value={accountType}
                    autoCapitalize="none"
                    // style={[styles.input, this.state.active.miles ? styles.inputActive : null]}
                    onChangeText={text => this.handleChange('accountType', text)}
                    // onBlur={() => this.toggleActive('miles')}
                    // onFocus={() => this.toggleActive('miles')}
                  />
                </Block>
              </Block>
              <Block row space="between">
                <Block flex={1}>
                  <Text bold size={14}>Location</Text>
                  <Input
                    bgColor='transparent'
                    placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                    color="black"
                    value={address}
                    autoCapitalize="none"
                    onChangeText={text => this.handleChange('address', text)}
                  />
                </Block>
              </Block>
              <Block row space="between">
                <Block flex={1}>
                  <Button            
                  shadowless
                  style={styles.addToCart}
                  color={materialTheme.COLORS.INFO}>
                    <Text
                    size={16} bold
                    color={theme.COLORS.BLACK} 
                    size={theme.SIZES.FONT}>Change Location</Text>
                  </Button>
                  <Button            
                  shadowless
                  onPress={()=>{navigation.navigate('MapScreen')}}
                  style={{height: 200, marginVertical: 20, width: width - theme.SIZES.BASE * 4,
                  }}
                  color={materialTheme.COLORS.INFO}>
                    <Image
                    style={{height: 200, width: width - theme.SIZES.BASE * 4}}
                    source={require("../assets/images/map.png")}
                    />
                  </Button>
                </Block>
              </Block>
              <Block row space="between" style={{alignItems: "center"}}>
                <Block style={{alignItems: "center", flex: 1}}>
                  <Text style={{marginBottom: 10}} bold size={14}>Upload Image</Text>
                  <Block style={{width: width * 0.8}}>
                    <RNF_ImagePicker></RNF_ImagePicker>
                  </Block> 
                </Block>
              </Block>
              <Block row space="between">
                <Block flex={1}>
                <Button
                  shadowless
                  style={styles.addToCart}
                  color={materialTheme.COLORS.INFO}
                  onPress={() => {this.handleUpdateProfile()}}
                  >
                  <Text
                    size={16} bold
                    color={theme.COLORS.BLACK} 
                    size={theme.SIZES.FONT}>UPDATE</Text>
                </Button>
                </Block>
              </Block>
          </Block>
        </Block>
      </Block>

      <PasswordPopup 
      setModalVisible={()=>this.setState({visiblePasswordModel:false})}
      visible={this.state.visiblePasswordModel}></PasswordPopup>
      </ScrollView>
      {this.state.pickerHeight > 0 && <View>
        <View 
          style={{flexDirection:"row", height:40, width: width, justifyContent: "space-between", backgroundColor: materialTheme.COLORS.INFO}}
        >
        <Button
          shadowless
          style={{height:40, width: 100, backgroundColor: materialTheme.COLORS.INFO}}
          onPress={() => {this.selectPickerItem()}}
          >
          <Text
            size={16} bold
            color={theme.COLORS.BLACK} 
            size={theme.SIZES.FONT}>Cancel</Text>
        </Button>
        <Button
          shadowless
          style={{height:40, width: 100, backgroundColor: materialTheme.COLORS.INFO}}
          onPress={() => {this.selectPickerItem()}}
          >
          <Text
            size={16} bold
            color={theme.COLORS.BLACK} 
            size={theme.SIZES.FONT}>Select</Text>
        </Button>
        </View>
        <Picker       
        selectedValue={selectedPicker === PICKER_TYPE.MILES ? miles : accountType}
        onValueChange={(text) => this.handleChange(selectedPicker === PICKER_TYPE.MILES ? 'miles' : "accountType", text)}
        style={{height: this.state.pickerHeight, backgroundColor: "white"}}
        >
          {
            this.state.pickerDataSource.map((item) => (
              <Picker.Item label={item} value={item} />        
            ))
          }        
      </Picker>
      </View>}
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  profile: {
    marginTop: 0,
  },
  profileImage: {
    width: width * 1.1,
    height: 'auto',
  },
  profileContainer: {
    width: width,
    height: 'auto',
    flex: 1,
  },
  profileDetails: {
    paddingTop: theme.SIZES.BASE * 4,
    justifyContent: 'flex-end',
    position: 'relative',
  },
  profileTexts: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 5,
    zIndex: 2
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 6,
    marginRight: theme.SIZES.BASE / 2,
    borderRadius: 4,
    height: 19,
    width: 38,
  },
  seller: {
    marginRight: theme.SIZES.BASE / 2,
  },
  options: {
    position: 'relative',
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: -theme.SIZES.BASE,
    marginBottom: 0,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure
  },
  gradient: {
    zIndex: 1,
    left: 0,
    right: 0,
    bottom: 0,
    height: '30%',
    position: 'absolute',
  },
  mapStyle: {
    // width: 300,
    height:200,
    marginTop:12,
    marginBottom:12
  },
  addToCart: {
    width: width - theme.SIZES.BASE * 4,
    marginTop: theme.SIZES.BASE * 2,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    shadowOpacity: 1
  },
});

const mapDispatchToProps = (dispatch) => ({
  getProfileData: (data) => dispatch(profileApiCall(data)),
  callUpdateProfile: (data) => dispatch(callUpdateProfile(data)),
})

const mapStateToProps = (state) => ({
  profileData: state.profileData,
  isLoading: state.isLoading,
})

const container = compose(
  connect(
      mapStateToProps,
      mapDispatchToProps
  ),
  withLoadingScreen
)

export default compose(container)(Settings)