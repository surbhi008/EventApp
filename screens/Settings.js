import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, ImageBackground, Platform } from 'react-native';
import { Block, Text, theme, Button, Input } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';

import { compose } from "recompose"
import { callUpdateProfile } from '../actions';
import { connect } from 'react-redux'
import withLoadingScreen from '../HOC/spinner';

import { Icon } from '../components';
import { Images, materialTheme } from '../constants';
import { HeaderHeight } from "../constants/utils";
import RNF_ImagePicker from '../components/RNF_ImagePicker';
import MapView from 'react-native-maps';
import { Picker } from 'react-native';
import { Keyboard } from 'react-native'

const { width } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;

class Settings extends React.Component {

  constructor(props) {
    super(props);
    this.state = { pickerHeight: 0 };
  }

  state = {
    userId: '',
    userName: '',
    fullName: '',
    email: '',
    imageURL: '',
    miles: '',
    address: '',
    locationLatLong: '',
    password: '',
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
    }
  }

  handleUpdateProfile () {
    const { navigation } = this.props;
    const {userId, userName, fullName, email, imageURL, miles, address, locationLatLong, password} = this.state
    // if (userName.length === 0) {
    //   Alert.alert("Please provide Full Name.")
    //   return
    // } else if (email.length === 0) {
    //   Alert.alert("Please provide Email.")
    //   return
    // } else if (password.length === 0) {
    //   Alert.alert("Please provide Password.")
    //   return
    // } else if (confirmPassword.length === 0) {
    //   Alert.alert("Please provide Confirm Password.")
    //   return
    // } else if (!(validatePassword(password))) {
    //   Alert.alert("Password must contain One LowerCase and UpperCase Character, One Special Character & One Number.")
    //   return
    // } else if (password !== confirmPassword) {
    //   Alert.alert("Password & Confirm Password doesn't Match.")
    //   return
    // }


    password.length === 0
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
          Alert.alert("Registration successful.")       
          const popAction = StackActions.pop(1);
          navigation.dispatch(popAction);
        } else {
          Alert.alert(response.message)
        }     
      }
    }
    this.props.callUpdateProfile(request)
  }

  render() {
    // const pickerHeight = 0
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
              <Text color="white" size={28} style={{ paddingBottom: 8 }}>Rachel Brown</Text>
              <Block row space="between">
                <Block row>
                  <Text color="white" size={16} muted style={styles.seller}>user@gmail.com</Text>
                </Block>
                <Block>
                  <Text color={theme.COLORS.MUTED} size={16}>
                    <Icon name="map-marker" family="font-awesome" color={theme.COLORS.MUTED} size={16} />
                    {`  `} Los Angeles, CA
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
                    placeholder="Password"
                    iconColor="white"
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
                    value="Rachel Brown"
                    autoCapitalize="none"
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
                        pickerHeight: this.state.pickerHeight > 0 ? 0 : 200
                      })
                    }}
                    bgColor='transparent'
                    placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                    color="black"
                    value=""
                    autoCapitalize="none"
                  />
                  {this.state.pickerHeight > 0 && <Picker    
                                                                            
                    selectedValue={"50 mile"}
                    // onValueChange={}
                    style={{height: this.state.pickerHeight, bottom: 0, left: 0, right: 0 }}
                    >
                    <Picker.Item label="5 mile" value="5" />
                    <Picker.Item label="10 mile" value="10" />
                    <Picker.Item label="25 mile" value="25" />
                    <Picker.Item label="100 mile" value="100" />
                    <Picker.Item label="150 mile" value="150" />
                  </Picker>}
                </Block>
              </Block>
              <Block row space="between">
                <Block flex={1}>
                  <Text bold size={14}>Location</Text>
                  <Input
                    bgColor='transparent'
                    placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                    color="black"
                    value="Los Angeles, CA"
                    autoCapitalize="none"
                  />
                </Block>
              </Block>
              <Block row space="between">
                <Block flex={1}>
                  <Button                   
                  shadowless
                  style={styles.addToCart}
                  color={materialTheme.COLORS.INFO}>Change Location</Button>
                  <MapView style={styles.mapStyle} />
                </Block>
              </Block>
              <Block row space="between">
                <Block flex={1}>
                  <Text bold size={14}>Upload Image</Text>
                  <RNF_ImagePicker></RNF_ImagePicker>
                </Block>
              </Block>
              <Block row space="between">
                <Block flex={1}>
                <Button
                  shadowless
                  style={styles.addToCart}
                  color={materialTheme.COLORS.BUTTON_COLOR}
                  onPress={() => {this.handleUpdateProfile()}}
                  >
                  <Text
                    color={theme.COLORS.BLACK} 
                    size={theme.SIZES.FONT}>UPDATE</Text>
                </Button>
                </Block>
              </Block>
          </Block>
        </Block>
      </Block>
            </ScrollView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
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
  callUpdateProfile: (data) => dispatch(callUpdateProfile(data)),
})

const mapStateToProps = (state) => ({
  // videos: state.video,
  // getVideoData: videoSelector
})

const container = compose(
  connect(
      mapStateToProps,
      mapDispatchToProps
  ),
  withLoadingScreen
)

export default compose(container)(Settings)