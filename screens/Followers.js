import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, FlatList, View, KeyboardAvoidingView, Dimensions} from 'react-native';

import { Block, Button, Input, Text, theme } from 'galio-framework';

import { LinearGradient } from 'expo-linear-gradient';
import { materialTheme, utils } from '../constants/';
import { HeaderHeight, validatePassword } from "../constants/utils";
import { compose } from "recompose"
import { callUpdateProfile, profileApiCall } from '../actions';
import { connect } from 'react-redux'
import withLoadingScreen from '../HOC/spinner';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { height, width } = Dimensions.get('window');

export function Followers({isFollowers, visible, setModalVisible}) {

  const testData = [
    "Patty O’Furniture",
    "Paddy O’Furniture",
    "Olive Yew",
    "Aida Bugg",
    "Maureen Biologist",
    "Teri Dactyl",
    "Peg Legge",
    "Allie Grater",
    "Liz Erd",
    "A. Mused",
    "Constance Noring"
  ]

  state = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    active: {
      oldPassword: false,
      newPassword: false,
      confirmNewPassword: false,
    },
  }

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  }

  toggleActive = (name) => {
    const { active } = this.state;
    active[name] = !active[name];

    this.setState({ active });
  }

  function renderFollowers(item) {
    const followButtonTitle = isFollowers ? "Follow" : "Unfollow"
    return (
      <View style={styles.itemStyle}>
        <View style={{flexDirection:"row", alignItems:"center"}}>
        <MaterialCommunityIcons name="face-outline" color={materialTheme.COLORS.MUTED} size={40} />
        <Text style={{marginLeft: 20, fontSize : 16}}>{item}</Text>  
        </View>
        <Button
          shadowless
          style={{height:40, width: 80, backgroundColor: materialTheme.COLORS.INFO}}
          >
          <Text
            size={16} bold
            color={theme.COLORS.BLACK} 
            size={theme.SIZES.FONT}>{followButtonTitle}</Text>
        </Button>
      </View>
    )
  }

  function renderClose() {
    return (
        <Button
          shadowless
          style={{height:25, width: 25, backgroundColor: materialTheme.COLORS.WHITE, 
            position :"absolute", right :10,
          top: 10}}
          onPress={() => {setModalVisible()}}
          >
            <MaterialCommunityIcons name="window-close" color={materialTheme.COLORS.MUTED} size={25} />
        </Button>
    )
  }

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
          {renderClose()}
            <FlatList
            style={styles.FlatListStyle}
            data={testData}
            renderItem={({ item })=> renderFollowers(item)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: 'rgba(32,36,100,0.6)',
    alignItems: "center",
    justifyContent:"center"
  },
  FlatListStyle:{
    width: "100%",
    marginTop: 20
  },
  modalView: {
    // margin: 20,
    // left: 25,
    // right: 30,
    height: height-40,
    width: width-40,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
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
  itemStyle: {
    height: 40,
    flexDirection:"row",
    alignItems: "center",
    marginBottom: 10,
    justifyContent: "space-between"
  }
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

export default compose(container)(Followers)
