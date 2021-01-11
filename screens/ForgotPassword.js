import React from 'react';
import {View, ActivityIndicator, StyleSheet, Dimensions, KeyboardAvoidingView, Alert, Platform, Image } from 'react-native';
import { Block, Button, Input, Text, theme } from 'galio-framework';

import { LinearGradient } from 'expo-linear-gradient';
import { materialTheme } from '../constants';
import { HeaderHeight, validatePassword } from "../constants/utils";
import { compose } from "recompose"
import { container } from './ForgotPasswordIndex';
import { ScrollView } from 'react-native-gesture-handler';
import { StackActions } from '@react-navigation/native';

const { width } = Dimensions.get('window');

class ForgotPassword extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      email: '-',
      otp: '-',
      // make this flag true when receive successful api response
      password: '-',
      confirmPassword: '-',
      displayPassword: false,
      token: "",
      active: {
        email: false,
        otp: false,
        password: false,
        confirmPassword: false,
      },
      displayOtp: false,
      isLoading: false
    }
  }

  componentDidMount() {
  }
  
  handleChange = (name, value) => {
    this.setState({ [name]: value });
  }

  toggleActive = (name) => {
    const { active } = this.state;
    active[name] = !active[name];

    this.setState({ active });
  }

  setLoaderValue() {
    this.setState({
      isLoading: !this.state.isLoading
    })
  }

  handleForgotPassword() {
    this.setLoaderValue()
    if (this.state.email.length === 0) {
      Alert.alert("Please provide Email.")
      return
    }

    const request = {
      email: this.state.email,
      callback: (response) => {
        this.setLoaderValue()
        if (response.success) {   
          console.log("I am here")
          this.setState({
            displayOtp: true,
          },() => function() {console.log("otp status 1", this.state.displayOtp)})                  
        } else {
          Alert.alert(response.message)
        }     
      }
    }
    this.props.callForgotPasswordApi(request)
  }

  verifyOTP () {
    this.setLoaderValue()
    if (this.state.otp.length === 0) {
      Alert.alert("Please provide OTP.")
      return
    } else if (this.state.otp.length !== 6) {
      Alert.alert("InCorrect OTP! It must contain 6 digits.")
      return
    }

    const request = {
      email: this.state.email,
      otp: this.state.otp,
      callback: (response) => {
        this.setLoaderValue()
        if (response.success) {   
          console.log("I am here")
          this.setState({
            displayPassword: true,
            token: response.data.sResetPasswordToken
          },() => function() {console.log("otp status 1", this.state.displayOtp)})             
        } else {
          Alert.alert(response.message)
        }     
      }
    }
    this.props.callVerifyOtp(request)
  }

  resetPassword () {
    this.setLoaderValue()
    if (this.state.password.length === 0) {
      Alert.alert("Please provide Password.")
      return
    } else if (this.state.confirmPassword.length === 0) {
      Alert.alert("Please provide Confirm Password.")
      return
    } else if (!(validatePassword(this.state.password))) {
      Alert.alert("Password must contain One LowerCase and UpperCase Character, One Special Character & One Number.")
      return
    } else if (this.state.password !== this.state.confirmPassword) {
      Alert.alert("Password & Confirm Password doesn't Match.")
      return
    }

    const request = {
      email: this.state.email,
      password: this.state.password,
      token: this.state.token,
      callback: (response) => {
        this.setLoaderValue()
        if (response.success) {   
          Alert.alert(response.message)
          const { navigation } = this.props;
          const popAction = StackActions.pop(1);
          navigation.dispatch(popAction);    
        } else {
          Alert.alert(response.message)
        }     
      }
    }
    this.props.callChangePassword(request)
  }

  renderSpinner() {
    return (
      <View
      style={{
          backgroundColor: "black",
          height: "100%",
          width: "100%",
          opacity: 0.7,
          alignItems: "center",
          justifyContent: "space-around",
          zIndex: 999999,
          position: "absolute"
      }}
      >
        <ActivityIndicator             
          size="small" 
          color="white" />
      </View>
    )
  }

  render() {
    const { navigation } = this.props;
    const { displayPassword , displayOtp, isLoading} = this.state;
    console.log("otp status", displayOtp)
    return (
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0.25, y: 1.1 }}
        locations={[0.2, 1]}
        colors={['#000000', '#000000']}
        style={[styles.signin, {flex: 1, paddingTop: theme.SIZES.BASE * 4}]}>
        <Block flex middle>
          <KeyboardAvoidingView behavior="padding" enabled>   
          <ScrollView>         
            <Block middle>
            <Image
            style={{width: width * 0.8, height: 150}}
                  resizeMode="center"
                  source={require("../assets/images/banner.png")}
              ></Image>
            </Block>
            <Block flex>
              <Block center>
                <Input
                  editable={!displayOtp}
                  borderless
                  color="white"
                  placeholder="Email"
                  type="email-address"
                  autoCapitalize="none"
                  bgColor='transparent'
                  onBlur={() => this.toggleActive('email')}
                  onFocus={() => this.toggleActive('email')}
                  placeholderTextColor={materialTheme.COLORS.MUTED}
                  onChangeText={text => this.handleChange('email', text)}
                  style={[styles.input, this.state.active.email ? styles.inputActive : null]}
                />                               
              </Block>
              <Block flex top style={styles.passwordContainerStyle}>
                <Button
                  disabled={displayOtp}
                  shadowless
                  color={displayOtp ? materialTheme.COLORS.DISABLE_BUTTON_COLOR : materialTheme.COLORS.BUTTON_COLOR}
                  style={{ height: 48 }}
                  onPress={() => this.handleForgotPassword()}
                >
                  <Text
                    color={theme.COLORS.BLACK} 
                    size={theme.SIZES.FONT}>SEND OTP ON EMAIL</Text>
                </Button>             
                {displayOtp && <Block style={styles.passwordContainerStyle}><Input
                  borderless
                  editable={!displayPassword}
                  color="white"
                  placeholder="OTP"
                  autoCapitalize="none"
                  bgColor='transparent'
                  onBlur={() => this.toggleActive('otp')}
                  onFocus={() => this.toggleActive('otp')}
                  placeholderTextColor={materialTheme.COLORS.MUTED}
                  onChangeText={text => this.handleChange('otp', text)}
                  style={[styles.input, this.state.active.otp ? styles.inputActive : null]}
                />
                <Button
                  shadowless
                  disabled={displayPassword}
                  color={materialTheme.COLORS.BUTTON_COLOR}
                  style={{ height: 48 }, styles.passwordContainerStyle}
                  onPress={() => this.verifyOTP()}
                  color={displayPassword ? materialTheme.COLORS.DISABLE_BUTTON_COLOR : materialTheme.COLORS.BUTTON_COLOR}
                >
                  <Text
                    color={theme.COLORS.BLACK} 
                    size={theme.SIZES.FONT}>VERIFY OTP</Text>
                </Button>
                </Block>
                }
                {displayPassword && <Block style={styles.passwordContainerStyle}>
                  <Input
                  borderless
                  password
                  color="white"
                  placeholder="Password"
                  autoCapitalize="none"
                  bgColor='transparent'
                  onBlur={() => this.toggleActive('password')}
                  onFocus={() => this.toggleActive('password')}
                  placeholderTextColor={materialTheme.COLORS.MUTED}
                  onChangeText={text => this.handleChange('password', text)}
                  style={[styles.input, this.state.active.password ? styles.inputActive : null]}
                />
                <Input
                  borderless
                  password
                  color="white"
                  placeholderTextColor="white"
                  placeholder="Confirm Password"
                  type="password"
                  autoCapitalize="none"
                  bgColor='transparent'
                  onBlur={() => this.toggleActive('confirmPassword')}
                  onFocus={() => this.toggleActive('confirmPassword')}
                  placeholderTextColor={materialTheme.COLORS.MUTED}
                  onChangeText={text => this.handleChange('confirmPassword', text)}
                  style={[styles.input, this.state.active.confirmPassword ? styles.inputActive : null]}                  
                />
                <Button
                  shadowless
                  color={materialTheme.COLORS.BUTTON_COLOR}
                  style={{ height: 48 }, styles.passwordContainerStyle}
                  onPress={() => this.resetPassword()}
                >
                  <Text
                    color={theme.COLORS.BLACK} 
                    size={theme.SIZES.FONT}>CHANGE PASSWORD</Text>
                </Button>
                  </Block>}
                  <Button color="transparent" shadowless onPress={() => navigation.navigate('Sign Up')}>
              <Text
                center
                color={theme.COLORS.WHITE}
                size={theme.SIZES.FONT * 0.75}
                style={{marginTop:20}}
              >
                {"Don't have an account? Sign Up"}
              </Text>
            </Button>
              </Block>
            </Block>
            </ScrollView>
          </KeyboardAvoidingView>
        </Block>
        {isLoading && this.renderSpinner()}
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  signin: {        
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 1
  },
  input: {
    width: width * 0.9, 
    borderRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: materialTheme.COLORS.PLACEHOLDER,
  },
  inputActive: {
    borderBottomColor: "white",
  },
  passwordContainerStyle: {
    marginTop: 20,
  }
});

export default compose(container)(ForgotPassword)