import React from 'react';
import { StyleSheet, Dimensions, KeyboardAvoidingView, ImageBackground, Image, Alert,ScrollView } from 'react-native';
import { Block, Button, Input, Text, theme } from 'galio-framework';
import RNC_DTPicker from '../components/RNC_DTPicker';
import RNF_ImagePicker from '../components/RNF_ImagePicker';
import { compose } from "recompose"
import { LinearGradient } from 'expo-linear-gradient';
import { materialTheme } from '../constants';
import { connect } from 'react-redux'
import { callAddEventApi, callUpdateEventApi } from '../actions';
import withLoadingScreen from '../HOC/spinner';
import moment from "moment";
const { width } = Dimensions.get('window');
import { StackActions } from '@react-navigation/native';

class HostEvent extends React.Component {

  componentDidMount() {
    console.log("eventdata",this.props.route.params)
    if(this.props.route.params) {
      this.setState({
        isEdit: this.props.route.params.isEdit,
        eventTitle: this.props.route.params.title,
        eventDescription: this.props.route.params.description,
        eventStartDate: this.props.route.params.startDate,
        eventEndDate: this.props.route.params.endDate,
        eventLocation: ""
      })
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

  callAddEventApi() {
    const { navigation } = this.props;

    if(this.state && this.state.isEdit) {
      const request = {
        data : {
          "id": this.state.id,
          "title": this.state.eventTitle,
          "description": this.state.eventDescription,
          "startDate": this.state.eventStartDate,
          "endDate": this.state.eventEndDate,
          "postDateTime": moment(new Date()).format("DDMMYYYY"),
          "userId": this.props.authData.userId
        },
        id: this.props.route.params.id,
        callback: () => {
          Alert.alert("Event updated successfully.")        
        }
      }    
      this.props.updateEvent(request)  
    }
    else {
      const request = {
        data : {
          "id": 0,
          "title": this.state.eventTitle,
          "description": this.state.eventDescription,
          "startDate": this.state.eventStartDate,
          "endDate": this.state.eventEndDate,
          "postDateTime": moment(new Date()).format("DDMMYYYY"),
          "userId": this.props.authData.userId
        },
        callback: () => {
          Alert.alert("Event added successfully.")                
        }
      }    
      this.props.addEvent(request)
    }    
  }

  render() {
    const { navigation } = this.props;
    const buttonTitle = this.state && this.state.isEdit ? "Update Event" : "Create Event"
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
                <RNF_ImagePicker title={"Add Event Photo"}></RNF_ImagePicker>
                </Block> 

                <Block flex={1} style={styles.commonMargin,{width: width*0.9, marginTop: 20}}>
                  <Text bold size={14}>Event Title</Text>
                  <Input
                    value={this.state && this.state.eventTitle}
                    multiline={true}
                    numberOfLines={5}
                    placeholder={"Add you event title"}
                    bgColor='transparent'
                    placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                    color="black"                    
                    autoCapitalize="none"
                    onChangeText={text => this.handleChange('eventTitle', text)}
                  />
                </Block>

                <Block flex={1} style={styles.commonMargin,{width: width*0.9, marginTop: 20}}>
                  <Text bold size={14}>Event Description</Text>
                  <Input
                    value={this.state && this.state.eventDescription}
                    multiline={true}
                    numberOfLines={5}
                    placeholder={"Describe your event"}
                    bgColor='transparent'
                    placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                    color="black"
                    autoCapitalize="none"
                    onChangeText={text => this.handleChange('eventDescription', text)}
                  />
                </Block>
              
                <Block flex={1} style={styles.commonMargin}>            
                <Text bold size={14}>Event Start Date</Text>
                <RNC_DTPicker date={this.state && this.state.eventStartDate} setDate={(date) => this.handleChange("eventStartDate", date)}></RNC_DTPicker>
                </Block>

                <Block flex={1} style={styles.commonMargin}>
                  <Text bold size={14}>Event End Date</Text>
                <RNC_DTPicker date={this.state && this.state.eventEndDate} setDate={(date) => this.handleChange("eventEndDate", date)}></RNC_DTPicker>
                </Block>

                <Block flex={1} style={styles.commonMargin}>
                <Text bold size={14}>Location</Text>
                  <Button            
                  shadowless
                  onPress={()=>{navigation.navigate('MapScreen')}}
                  style={{height: 200, marginVertical: 8, width: width * 0.9,
                  }}
                  color={materialTheme.COLORS.INFO}>
                    <Image
                    style={{height: 200, width: width - theme.SIZES.BASE * 4}}
                    source={require("../assets/images/map.png")}
                    />
                  </Button>
                </Block>

                <Button
                  shadowless
                  color={materialTheme.COLORS.INFO}
                  style={styles.createEventButtonStyle}
                  onPress={() => this.callAddEventApi()}
                >
                  {/* Alert.alert('Sign in action',`Email: ${email} Password: ${password}`,) */}
                  <Text size={16} color={theme.COLORS.BLACK}>{buttonTitle}</Text>
                </Button>

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
    textAlignVertical: 'top',
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
  createEventButtonStyle: {
    height: 48,
    marginVertical: 20
  },
  commonMargin: {
    marginVertical: 20
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

const mapDispatchToProps = (dispatch) => ({
  addEvent: (data) => dispatch(callAddEventApi(data)),
  updateEvent: (data) => dispatch(callUpdateEventApi(data)),
})

const mapStateToProps = (state) => ({
  authData: state.authData,
})

const container = compose(
  connect(
      mapStateToProps,
      mapDispatchToProps
  ),
  // withLoadingScreen
)

export default compose(container)(HostEvent)
