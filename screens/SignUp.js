import React from 'react';
import { Alert, Dimensions, StyleSheet, KeyboardAvoidingView, Platform, Image } from 'react-native';

import { Block, Button, Input, Text, theme } from 'galio-framework';

import { LinearGradient } from 'expo-linear-gradient';
import { materialTheme, utils } from '../constants/';
import { hasWhiteSpace, HeaderHeight, validatePassword } from "../constants/utils";
import { compose } from "recompose"
import { callSignUp } from '../actions';
import { connect } from 'react-redux'
import withLoadingScreen from '../HOC/spinner';
import { StackActions } from '@react-navigation/native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import RNC_DTPicker from '../components/RNC_DTPicker';
const { height, width } = Dimensions.get('window');
import {Picker} from '@react-native-community/picker';

class SignUp extends React.Component {
  state = {
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    active: {
      userName: false,
      email: false,
      password: false,
      confirmPassword: false,
    },
    language: 'java',
  }

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  }

  toggleActive = (name) => {
    const { active } = this.state;
    active[name] = !active[name];

    this.setState({ active });
  }

  handleSignup () {
    const { navigation } = this.props;
    const {userName, email, password, confirmPassword} = this.state
    if (userName.length === 0) {
      Alert.alert("Please provide Username.")
      return
    } else if (hasWhiteSpace(userName)) {
      Alert.alert("Please provide valid Username.")
      return
    } else if (email.length === 0) {
      Alert.alert("Please provide Email.")
      return
    } else if (password.length === 0) {
      Alert.alert("Please provide Password.")
      return
    } else if (confirmPassword.length === 0) {
      Alert.alert("Please provide Confirm Password.")
      return
    } else if (!(validatePassword(password))) {
      Alert.alert("Password must contain One LowerCase and UpperCase Character, One Special Character & One Number.")
      return
    } else if (password !== confirmPassword) {
      Alert.alert("Password & Confirm Password doesn't Match.")
      return
    }
    password.length === 0
    const request = {
      userName: userName,
      email: email,
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
    this.props.callSignUp(request)
  }

  render() {
    const { navigation } = this.props;
    const {userName, email, password} = this.state;
    return (
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0.25, y: 1.1 }}
        locations={[0.2, 1]}
        colors={['#000000', '#000000']}
        style={[styles.signup, { flex: 1, paddingTop: theme.SIZES.BASE * 4 }]}>
        <Block flex middle>
          <KeyboardAvoidingView behavior="padding" enabled>
          <Block middle>
            <Image
            style={{width: width * 0.8, height: 150}}
                  resizeMode="center"
                  source={require("../assets/images/banner.png")}
              ></Image>
            </Block>
            <Block flex={1} center space="between">
              <Block center>
                <Input
                  bgColor='transparent'
                  placeholderTextColor={materialTheme.COLORS.MUTED}
                  borderless
                  color="white"
                  placeholder="User Name"
                  autoCapitalize="none"
                  style={[styles.input, this.state.active.userName ? styles.inputActive : null]}
                  onChangeText={text => this.handleChange('userName', text)}
                  onBlur={() => this.toggleActive('userName')}
                  onFocus={() => this.toggleActive('userName')}
                />
                <Input
                  bgColor='transparent'
                  placeholderTextColor={materialTheme.COLORS.MUTED}
                  borderless
                  color="white"
                  type="email-address"
                  placeholder="Email"
                  autoCapitalize="none"
                  style={[styles.input, this.state.active.email ? styles.inputActive : null]}
                  onChangeText={text => this.handleChange('email', text)}
                  onBlur={() => this.toggleActive('email')}
                  onFocus={() => this.toggleActive('email')}
                />
                <Input
                  bgColor='transparent'
                  placeholderTextColor={materialTheme.COLORS.MUTED}
                  borderless
                  color="white"
                  password
                  viewPass
                  placeholder="Password"
                  iconColor="white"
                  style={[styles.input, this.state.active.password ? styles.inputActive : null]}
                  onChangeText={text => this.handleChange('password', text)}
                  onBlur={() => this.toggleActive('password')}
                  onFocus={() => this.toggleActive('password')}
                />
                <Input
                  bgColor='transparent'
                  placeholderTextColor={materialTheme.COLORS.MUTED}
                  borderless
                  color="white"
                  password
                  viewPass
                  placeholder="Confirm Password"
                  iconColor="white"
                  style={[styles.input, this.state.active.confirmPassword ? styles.inputActive : null]}
                  onChangeText={text => this.handleChange('confirmPassword', text)}
                  onBlur={() => this.toggleActive('confirmPassword')}
                  onFocus={() => this.toggleActive('confirmPassword')}
                />
                <RNC_DTPicker></RNC_DTPicker>
              </Block>
              <Block flex top style={{ marginTop: 20 }}>
                <Button
                  shadowless
                  style={{ height: 48 }}
                  color={materialTheme.COLORS.BUTTON_COLOR}
                  onPress={() => {this.handleSignup()}}
                >
                  <Text
                    color={theme.COLORS.BLACK} 
                    size={theme.SIZES.FONT}>SIGN UP</Text>
                </Button>
                <Button color="transparent" shadowless onPress={() => navigation.navigate('SIGN IN')}>
                  <Text center color={theme.COLORS.WHITE} size={theme.SIZES.FONT}>
                    Already have an account? Sign In
                  </Text>
                </Button>
              </Block>
            </Block>
          </KeyboardAvoidingView>
        </Block>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  signup: {
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
});

const mapDispatchToProps = (dispatch) => ({
  callSignUp: (data) => dispatch(callSignUp(data)),
})

const mapStateToProps = (state) => ({
  isLoading: state.isLoading,
  // getVideoData: videoSelector
})

const container = compose(
  connect(
      mapStateToProps,
      mapDispatchToProps
  ),
  withLoadingScreen
)

export default compose(container)(SignUp)
