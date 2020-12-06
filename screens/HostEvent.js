import React from 'react';
import { StyleSheet, Dimensions, KeyboardAvoidingView, ImageBackground, Platform, Image,ScrollView } from 'react-native';
import { Block, Button, Input, Text, theme } from 'galio-framework';
import RNC_DTPicker from '../components/RNC_DTPicker';
import RNF_ImagePicker from '../components/RNF_ImagePicker';
import MapView from 'react-native-maps';

import { LinearGradient } from 'expo-linear-gradient';
import { materialTheme } from '../constants';
import { HeaderHeight } from "../constants/utils";

const { width } = Dimensions.get('window');

export default class HostEvent extends React.Component {
  state = {
    email: '-',
    password: '-',
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

  render() {
    const { navigation } = this.props;
    const { email, password } = this.state;

    return (
      <ScrollView style={{backgroundColor: "black", padding: 10}}>        
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0.25, y: 1.1 }}
        locations={[0.2, 1]}
        colors={['#ffffff', '#ffffff']}
        style={[styles.signin, {flex: 1}]}>
        <Block flex middle>
          <KeyboardAvoidingView behavior="padding" enabled>
            <Block flex >
              <Block center>              
                <ImageBackground
                  source={{ uri: "https://images.unsplash.com/photo-1543321269-9d86d3680e1c?crop=entropy&w=840&h=840&fit=crop" }}
                  style={styles.profileContainer}
                  imageStyle={styles.profileImage}>
                </ImageBackground>
                <Block style={{width: width * 0.9, marginBottom : 8, marginTop: 16}}>
                <RNF_ImagePicker></RNF_ImagePicker>
                </Block>                
                <Input
                  borderless
                  color="black"
                  placeholder="Give your event a title"
                  type="event-name"
                  autoCapitalize="none"
                  bgColor='white'
                  onBlur={() => this.toggleActive('eventname')}
                  onFocus={() => this.toggleActive('eventname')}
                  placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                  onChangeText={text => this.handleChange('eventname', text)}
                  style={[styles.input, this.state.active.email ? styles.inputActive : null]}
                />
                <Input
                  borderless
                  color="black"
                  placeholder="Describe your event"
                  type="event-description"
                  autoCapitalize="none"
                  bgColor='white'
                  onBlur={() => this.toggleActive('eventdescription')}
                  onFocus={() => this.toggleActive('eventdescription')}
                  placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                  onChangeText={text => this.handleChange('eventdescription', text)}
                  style={[styles.inputMultiline, this.state.active.email ? styles.inputActive : null]}
                />
                <Input
                  borderless
                  color="black"
                  placeholder="Event From MM/dd/yyyy"
                  type="datetime"
                  autoCapitalize="none"
                  bgColor='white'
                  onBlur={() => this.toggleActive('eventfromdate')}
                  onFocus={() => this.toggleActive('eventfromdate')}
                  placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                  onChangeText={text => this.handleChange('eventfromdate', text)}
                  style={[styles.input, this.state.active.email ? styles.inputActive : null]}
                />
                <Block style={{width: width * 0.9, marginBottom : 8, marginTop: 16}}>
                <RNC_DTPicker></RNC_DTPicker>
                </Block>                
                <Input
                  borderless
                  color="black"
                  placeholder="Event To MM/dd/yyyy"
                  type="datetime"
                  autoCapitalize="none"
                  bgColor='white'
                  onBlur={() => this.toggleActive('eventtodate')}
                  onFocus={() => this.toggleActive('eventtodate')}
                  placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                  onChangeText={text => this.handleChange('eventtodate', text)}
                  style={[styles.input, this.state.active.email ? styles.inputActive : null]}
                />
                <RNC_DTPicker></RNC_DTPicker>
                <Button shadowless color={materialTheme.COLORS.INFO} style={{marginTop:12}}> 
                <Text size={16} bold color={theme.COLORS.BLACK}>Pick Event Location</Text></Button>
                <MapView style={styles.mapStyle} />
              </Block>
              <Block flex top style={{ marginTop: 16, width: "100%", alignItems: "center", marginBottom: 50 }}>
                <Button
                  shadowless
                  color={materialTheme.COLORS.INFO}
                  style={{ height: 48 }}
                  onPress={() => navigation.navigate("Events Near Me")}
                >
                  {/* Alert.alert('Sign in action',`Email: ${email} Password: ${password}`,) */}
                  <Text size={16} bold color={theme.COLORS.BLACK}>Create A Event</Text>
                </Button>
                {/* <Button shadowless onPress={() => navigation.navigate('Sign Up')}>
                  <Text
                    center
                    color={theme.COLORS.WHITE}
                    size={theme.SIZES.FONT * 0.75}
                    style={{marginTop:20}}
                  >
                  </Text>
                </Button> */}
              </Block>
            </Block>
          </KeyboardAvoidingView>
        </Block>
      </LinearGradient>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  signin: {       
    borderRadius: 10, 
    marginTop: 44,
  },
  eventimage: {
    width: 200,
    height: 100
  },
  input: {
    width: width * 0.9, 
    borderRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: materialTheme.COLORS.PLACEHOLDER,
    borderRadius: 5
  },
  inputMultiline: {
    height:100,
    width: width * 0.9, 
    borderRadius: 0,
    borderBottomWidth: 1,
    borderRadius: 5,
    borderBottomColor: materialTheme.COLORS.PLACEHOLDER,
  },
  inputActive: {
    borderBottomColor: "white",
    borderRadius: 5
  },
  mapStyle: {
    width: width * 0.9,
    height:200,
    marginTop:16,
    borderRadius: 5
  },
  profileContainer: {
    width: width,
    height: 200
  },
  profileImage: {
    width: width * 1.1,
    flex: 1
  },
});
function showImagePicker() {
  const options = {
      title: 'Select Avatar',
      customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
          skipBackup: true,
          path: 'images',
      },
  };

  ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
          console.log('User cancelled image picker');
      } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
      } else {
          const source = { uri: response.uri };
          setImageUrl(source)
      }
  });
}