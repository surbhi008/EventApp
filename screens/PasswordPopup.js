import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, TouchableHighlight, View, KeyboardAvoidingView, Dimensions} from 'react-native';

import { Block, Button, Input, Text, theme } from 'galio-framework';

import { LinearGradient } from 'expo-linear-gradient';
import { materialTheme, utils } from '../constants/';
import { HeaderHeight, validatePassword } from "../constants/utils";
import { compose } from "recompose"
import { callUpdateProfile, profileApiCall } from '../actions';
import { connect } from 'react-redux'
import withLoadingScreen from '../HOC/spinner';
// import { StackActions } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');

export function PasswordPopup({visible, setModalVisible}) {

  state = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    active: {
      oldPassword: false,
      newPassword: false,
      confirmNewPassword: false,
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

  // handleUpdatePasswordProfile () {
  //   const {oldPassword, newPassword, confirmNewPassword} = this.state
  //   if (!oldPassword) {
  //     Alert.alert("Please provide Old Password.")
  //     return
  //   } else if (oldPassword !== this.profileData.password) {
  //     Alert.alert("Please provide Correct Old Password.")
  //     return
  //   } else if (newPassword) {
  //     Alert.alert("Please provide New Password.")
  //     return
  //   } else if (confirmNewPassword) {
  //     Alert.alert("Please provide Confirm Password.")
  //     return
  //   } else if (!(validatePassword(newPassword))) {
  //     Alert.alert("New Password must contain One LowerCase and UpperCase Character, One Special Character & One Number.")
  //     return
  //   } else if (newPassword !== confirmNewPassword) {
  //     Alert.alert("New Password & Confirm Password doesn't Match.")
  //     return
  //   } else if (!locationLatLong) {
  //     Alert.alert("Please select Location.")
  //     return
  //   } 

  //   // password.length === 0
  //   const request = {
  //     userId: this.profileData.userId,
  //     userName: this.profileData.userName,
  //     fullName: this.profileData.fullName,
  //     email: this.profileData.email,
  //     imageURL: this.profileData.imageURL,
  //     miles: this.profileData.miles,
  //     address: this.profileData.address,
  //     locationLatLong: this.profileData.locationLatLong,
  //     password: newPassword,

  //     callback: (response) => {
  //       if (response.success) {   
  //         Alert.alert("Profile Updated Successfully.")
  //         setModalVisible()
  //       } else {
  //         Alert.alert(response.message)
  //       }     
  //     }
  //   }
  //   this.props.callUpdateProfile(request)
  // }

  
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
              <Text style={styles.modalText}>Change Password!</Text>
            
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 0.0, y: 0.0 }}
                locations={[0.0, 0.0]}
                colors={['#FFFFFF', '#FFFFFF']}
                style={[styles.modalGradientView, { flex: 1 }]}>
                <Block flex middle>
                  <KeyboardAvoidingView behavior="padding" enabled>
                    <Block flex={1} center space="between">
                      <Block center>
                        <Input
                          bgColor='transparent'
                          placeholderTextColor={materialTheme.COLORS.MUTED}
                          borderless
                          color="white"
                          password
                          viewPass
                          placeholder="Old Password"
                          iconColor="white"
                          style={[styles.input]}
                          // onChangeText={text => this.handleChange('password', text)}
                          // onBlur={() => this.toggleActive('password')}
                          // onFocus={() => this.toggleActive('password')}
                        />
                       <Input
                          bgColor='transparent'
                          placeholderTextColor={materialTheme.COLORS.MUTED}
                          borderless
                          color="white"
                          password
                          viewPass
                          placeholder="New Password"
                          iconColor="white"
                          style={[styles.input]}
                          // style={[styles.input, this.state.active.password ? styles.inputActive : null]}
                          // onChangeText={text => this.handleChange('password', text)}
                          // onBlur={() => this.toggleActive('password')}
                          // onFocus={() => this.toggleActive('password')}
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
                          style={[styles.input]}
                          // style={[styles.input, this.state.active.confirmPassword ? styles.inputActive : null]}
                          // onChangeText={text => this.handleChange('confirmPassword', text)}
                          // onBlur={() => this.toggleActive('confirmPassword')}
                          // onFocus={() => this.toggleActive('confirmPassword')}
                        />
                      </Block>
                    </Block>
                  </KeyboardAvoidingView>
                </Block>
              </LinearGradient>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
              onPress={() => {
                // this.handleUpdatePasswordProfile()
                setModalVisible()                
              }}>
              <Text style={styles.textStyle}>Change Password</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      {/* <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          setModalVisible(true);
        }}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </TouchableHighlight> */}
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingTop: 300,
    // paddingBottom: 300,
    // padding: 100,
    backgroundColor: 'rgba(32,36,100,0.6)',
  },
  modalView: {
    // margin: 20,
    // left: 25,
    // right: 30,
    height: 300,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  modalGradientView: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    // padding: 10,
    elevation: 2,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 0.0,
    textAlign: 'center',
  },
  input: {
    // width: width * 0.9,
    borderRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: materialTheme.COLORS.PLACEHOLDER,
  },
  inputActive: {
    borderBottomColor: "white",
  },
});

const mapDispatchToProps = (dispatch) => ({
  getProfileData: (data) => dispatch(profileApiCall(data)),
  callUpdateProfile: (data) => dispatch(callUpdateProfile(data)),
})

const mapStateToProps = (state) => ({
  profileData: state.profileData,
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

export default compose(container)(PasswordPopup)
