import React from 'react';
import { StyleSheet, Dimensions, KeyboardAvoidingView, Alert, Platform } from 'react-native';
import { Block, Button, Input, Text, theme } from 'galio-framework';
import { View, ActivityIndicator } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { materialTheme } from '../constants/';
import { HeaderHeight } from "../constants/utils";
import { StackActions } from '@react-navigation/native';
import { compose } from "recompose"

import { callLogin } from '../actions';
import { connect } from 'react-redux'
import withLoadingScreen from '../HOC/spinner';

const { width } = Dimensions.get('window');

class SignIn extends React.Component {
  state = {
    email: "admin",
    password: "Admin@123",
    active: {
      email: false,
      password: false,
    }
  }

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  }

  toggleActive = (name) => {
    const { active } = this.state;
    active[name] = !active[name];

    this.setState({ active });
  }

  handleLogin () {
    const {
      email, password
    } = this.state
    const { navigation } = this.props;
    if (email.length === 0 || password.length === 0) {
      Alert.alert("Please provide email and password")
      return
    }
    const request = {
      userName: email,
      password: password,
      callback: (response) => {
        if (response.success) {
          navigation.dispatch(
            StackActions.replace('Home', {
          }));
        } else {
          Alert.alert(response.message)
        }     
      }
    }
    this.props.callLogin(request)
  }

  render() {
    const { navigation } = this.props;
    const { email, password } = this.state;

    return (
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0.25, y: 1.1 }}
        locations={[0.2, 1]}
        colors={['#000000', '#000000']}
        style={[styles.signin, {flex: 1, paddingTop: theme.SIZES.BASE * 4}]}>           
        <Block flex middle>    
          <KeyboardAvoidingView behavior="padding" enabled>
            <Block middle>
              <Block row center space="between" style={{ marginVertical: theme.SIZES.BASE * 0.1 }}>
                {/* <Block flex middle right>
                  <Button
                    round
                    onlyIcon
                    iconSize={theme.SIZES.BASE * 1.625}
                    icon="facebook"
                    iconFamily="font-awesome"
                    color={theme.COLORS.FACEBOOK}
                    shadowless
                    iconColor={theme.COLORS.WHITE}
                    style={styles.social}
                    onPress={() => Alert.alert('Not implemented')}
                  />
                </Block>
                <Block flex middle center>
                  <Button
                    round
                    onlyIcon
                    iconSize={theme.SIZES.BASE * 1.625}
                    icon="twitter"
                    iconFamily="font-awesome"
                    color={theme.COLORS.TWITTER}
                    shadowless
                    iconColor={theme.COLORS.WHITE}
                    style={styles.social}
                    onPress={() => Alert.alert('Not implemented')}
                  />
                </Block>
                <Block flex middle left>
                  <Button
                    round
                    onlyIcon
                    iconSize={theme.SIZES.BASE * 1.625}
                    icon="dribbble"
                    iconFamily="font-awesome"
                    color={theme.COLORS.DRIBBBLE}
                    shadowless
                    iconColor={theme.COLORS.WHITE}
                    style={styles.social}
                    onPress={() => Alert.alert('Not implemented')}
                  />
                </Block> */}
              </Block>
            </Block>
            <Block middle style={{ paddingVertical: theme.SIZES.BASE * 2.625}}>
              <Text center color="black" size={14}>
                {/* or be classical */}
              </Text>
            </Block>
            <Block flex>
              <Block center>
                <Input
                  borderless
                  color="white"
                  placeholder="Email"
                  autoCapitalize="none"
                  bgColor='transparent'
                  value={email}
                  onBlur={() => this.toggleActive('email')}
                  onFocus={() => this.toggleActive('email')}
                  placeholderTextColor={theme.COLORS.MUTED}
                  onChangeText={text => this.handleChange('email', text)}
                  style={[styles.input, this.state.active.email ? styles.inputActive : null]}
                />
                <Input
                  password
                  viewPass
                  borderless
                  color="white"
                  iconColor="white"
                  placeholder="Password"
                  bgColor='transparent'
                  value={password}
                  onBlur={() => this.toggleActive('password')}
                  onFocus={() => this.toggleActive('password')}
                  placeholderTextColor={theme.COLORS.MUTED}
                  onChangeText={text => this.handleChange('password', text)}
                  style={[styles.input, this.state.active.password ? styles.inputActive : null]}
                />
                <Text
                  color={theme.COLORS.BLACK}
                  size={theme.SIZES.FONT}
                  onPress={() => navigation.navigate("Forgot Password")}
                  style={{ alignSelf: 'flex-end', lineHeight: theme.SIZES.FONT * 2 }}
                >
                  Forgot your password?
                  </Text>
              </Block>
              <Block flex top style={{ marginTop: 20 }}>
                <Button
                  shadowless
                  color={materialTheme.COLORS.BUTTON_COLOR}
                  style={{ height: 48 }}
                  onPress={() => 
                  {
                    this.handleLogin()
                  }
                  
                  }
                >
                  {/* Alert.alert('Sign in action',`Email: ${email} Password: ${password}`,) */}
                  <Text
                    color={theme.COLORS.BLACK} 
                    size={theme.SIZES.FONT}>
                      SIGN IN</Text>
                </Button>
                <Button color="transparent" shadowless onPress={() => navigation.navigate('Sign Up')}>
                  <Text
                    center
                    color={theme.COLORS.WHITE}
                    size={theme.SIZES.FONT}
                    style={{marginTop:20}}
                  >
                    {"Don't have an account? Sign Up"}
                  </Text>
                </Button>
                <Button color="transparent" shadowless onPress={() => navigation.navigate('FORGOT PASSWORD')}>
                  <Text
                    center
                    color={theme.COLORS.WHITE}
                    size={theme.SIZES.FONT}
                    style={{marginTop:20}}
                  >
                    {"Forgot Password?"}
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
});

const mapDispatchToProps = (dispatch) => ({
  callLogin: (data) => dispatch(callLogin(data)),
})

const mapStateToProps = (state) => ({
  isLoading: state.isLoading,
})

const container = compose(
  connect(
      mapStateToProps,
      mapDispatchToProps
  ),
  withLoadingScreen
)

export default compose(container)(SignIn)
