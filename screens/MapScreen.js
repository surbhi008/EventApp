import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, ImageBackground, Picker, Alert, View } from 'react-native';
import { Block, Text, theme, Button, Input } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';

import { compose } from "recompose"
import { callUpdateProfile, profileApiCall } from '../actions';
import { connect } from 'react-redux'
import withLoadingScreen from '../HOC/spinner';
import { StackActions } from '@react-navigation/native';

import { Icon } from '../components';
import { Images, materialTheme } from '../constants';
import { HeaderHeight, validatePassword } from "../constants/utils";
import RNF_ImagePicker from '../components/RNF_ImagePicker';
import MapView from 'react-native-maps';
import { Keyboard } from 'react-native'
import {PasswordPopup} from './PasswordPopup';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const { width, height } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;
const PICKER_TYPE = {
  MILES: "MILES",
  ACCOUNT_TYPE: "TYPE"
}
class MapScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
      locationResult: null,
      location: {coords: { latitude: 37.78825, longitude: -122.4324}},
  }}

  _handleMapRegionChange = mapRegion => {
    console.log("map region", mapRegion)
    this.setState({ mapRegion });
  };

  componentDidMount() {
    console.log("profileData",this.props.profileData)
    this._getLocationAsync();
  }
 
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        locationResult: 'Permission to access location was denied',
        location,
      });
    }
 
    let location = await Location.getCurrentPositionAsync({});
    console.log("location====>",JSON.stringify(location.coords))
    this.setState({ locationResult: `Lat:${JSON.stringify(location.coords.latitude)} Long:${JSON.stringify(location.coords.longitude)}`, location, });
    this.fetchPlaceName(location.coords.latitude, location.coords.longitude)
  };

  fetchPlaceName(lat, long) {
    fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + lat + ',' + long + '&key=' + "AIzaSyDp_XRJ8VfYotkkKPQvpGYB7Jy4t28UxaY")
        .then((response) => response.json())
        .then((responseJson) => {
            console.log('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson));
    })
  }

  render() {
    const location = `${this.state.locationResult}`
    return (     
      <ScrollView style={{backgroundColor: materialTheme.COLORS.WHITE}} vertical={true} showsVerticalScrollIndicator={false}>
          <Block flex style={styles.profile}>
            <GooglePlacesAutocomplete
            placeholder='Search'
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log(data, details);
            }}
            query={{
              key: 'AIzaSyDp_XRJ8VfYotkkKPQvpGYB7Jy4t28UxaY',
              language: 'en',
            }}
          />
          <MapView style={styles.mapStyle} 
          initialRegion={{latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421}}
          // region={{ latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
          onRegionChange={this._handleMapRegionChange}>
            <MapView.Marker
              draggable
              onDragEnd={(e) => {
                console.log("loc===>", e.nativeEvent.coordinate)
                this.setState({
                  location: {coords : { latitude: e.nativeEvent.coordinate.latitude, 
                    longitude: e.nativeEvent.coordinate.longitude}},
                  locationResult: `Lat:${JSON.stringify(e.nativeEvent.coordinate.latitude)} Long:${JSON.stringify(e.nativeEvent.coordinate.longitude)}`
                })
              }}
              coordinate={this.state.location.coords}
              title="My Marker"
              description="Some description"
            />
          </MapView>
          <Text
            style={{marginTop: 20, marginHorizontal: 10}}
            size={14}
            color={materialTheme.COLORS.MUTED}>LOCATION</Text>
          <Input
          paddingVertical={0}
            style={styles.input}
            bgColor='transparent'
            placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
            color="black"
            value={location}
            onChangeText={text => this.handleChange('password', text)}
            borderless
            onFocus={() => 
              {
                Keyboard.dismiss()
                this.setState({visiblePasswordModel: true})
              }
            }
          />
          <Button
            shadowless
            style={styles.addToCart}
            color={materialTheme.COLORS.INFO}
            onPress={() => {
              const { navigation } = this.props;
              const popAction = StackActions.pop(1);
              navigation.dispatch(popAction);    
            }}
            >
            <Text
              size={16} 
              color={theme.COLORS.BLACK} 
              size={theme.SIZES.FONT}>PICK THIS LOCATION</Text>
          </Button>
      </Block>
      </ScrollView>      
    );
  }
}

const styles = StyleSheet.create({
  profile: {
    flex: 1,
    backgroundColor: materialTheme.COLORS.WHITE,
    marginTop: 20,
    justifyContent: "center"    
  },
  profileImage: {
    backgroundColor: materialTheme.COLORS.WHITE,
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
    backgroundColor: materialTheme.COLORS.WHITE,
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
    backgroundColor: materialTheme.COLORS.WHITE,
    height:height - 200,
    marginTop: 20,
    backgroundColor: materialTheme.COLORS.WHITE,
    marginHorizontal: 10,
    borderRadius: 10
  },
  input: {
    width: width - theme.SIZES.BASE * 2,
    borderRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: materialTheme.COLORS.PLACEHOLDER,
    marginHorizontal: 10,
    paddingHorizontal: 0
  },
  addToCart: {
    width: width - theme.SIZES.BASE * 4,
    marginTop: 20,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    shadowOpacity: 1,
    alignSelf: "center",
    flex: 1,
    marginBottom: 20
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

export default compose(container)(MapScreen)