import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, ImageBackground, Platform, View } from 'react-native';
import { Block, Text, theme, Button } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';

import { Icon } from '../components';
import { Images, materialTheme } from '../constants';
import * as ImagePicker from 'expo-image-picker';

const { width } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;
import { compose } from "recompose"
import { connect } from 'react-redux'
import withLoadingScreen from '../HOC/spinner';
import { Followers } from './Followers';
import { getPixelSizeForLayoutSize } from 'react-native/Libraries/Utilities/PixelRatio';
import { MaterialIcons } from '@expo/vector-icons';

class Profile extends React.Component {

  state = {
    userName: '',
    email: '',
    location: '',
    visibleFollowers: false,
    followers: true,
    image: Images.Profile
  } 
  
  componentDidMount() {
    console.log("profileData",this.props.profileData)
    this.setState({
      userName: this.props.profileData && this.props.profileData.userDetail.fullName,
      email: this.props.profileData && this.props.profileData.userDetail.email
    })
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      this.setState({
        image: result.uri
      })
    }
  }

  render() {
    const followers = "10\nFollowers"
    const followings = "5\nFollowings"
    const { navigation } = this.props;
    return (
      <Block flex style={styles.profile}>
        <View style={{height: 200, justifyContent: "center"}}>
          <View style={{flexDirection: "row", alignItems: "center"}}>
           <View>
            <Image 
            style={{height: 100, width: 100, marginLeft: 20, borderRadius:50}}
            source={{uri: this.state.image}}/>
            <Button
            onPress={() => this.pickImage()}
          shadowless
          style={{height:30, width: 30, borderRadius: 15, position: "absolute", bottom:0,right:0, backgroundColor: materialTheme.COLORS.WHITE}}
          >
            <MaterialIcons name="add-circle" color={materialTheme.COLORS.INFO} size={30} />
          </Button>
          </View>
            <Block row style={{marginLeft: 20}}>
            <Text 
            style={{width:80, flexDirection: "row", alignItems: "center", textAlign: "center"}}
            color={theme.COLORS.BLACK} size={16} onPress={() => {
                      this.setState({
                        visibleFollowers: true,
                        followers: true
                      })
                    }}>
                      {followers}
            </Text>
            <Text 
            style={{width:80, flexDirection: "row", alignItems: "center", marginLeft: 20, textAlign: "center"}}
            color={theme.COLORS.BLACK} size={16} onPress={() => {
                      this.setState({
                        visibleFollowers: true,
                        followers: false
                      })
                    }}>
                      {followings}
            </Text>
            </Block>
          </View>
          <Text 
          color={theme.COLORS.BLACK} size={28} 
          style={{ paddingBottom: 5, marginLeft: 20, marginTop: 10 }}>{this.state.userName}</Text>
          <Text 
          onPress={()=> {navigation.navigate('MapScreen')}}
          style={{paddingBottom: 5,marginLeft: 20 }}
          color={theme.COLORS.BLACK} size={16}>
                    <Icon name="map-marker" family="font-awesome" color={theme.COLORS.MUTED} size={16} />
                    {`  `} Los Angeles, CA
                  </Text>
        </View>
        {/* <ImageBackground
          source={{ uri: Images.Profile }}
          style={styles.profileContainer}
          imageStyle={styles.profileImage}>
          <Block flex style={styles.profileDetails}>
            <Block style={styles.profileTexts}>
              <Text color="white" size={28} style={{ paddingBottom: 8 }}>{this.state.userName}</Text>
              <Block row space="between">
                <Block>
                  <Text color={theme.COLORS.MUTED} size={16}>
                    <Icon name="map-marker" family="font-awesome" color={theme.COLORS.MUTED} size={16} />
                    {`  `} Los Angeles, CA
                  </Text>
                </Block>
              </Block>
              <Block row space="between">
                  <Block row>
                    <Text color={theme.COLORS.MUTED} size={16} onPress={() => {
                      this.setState({
                        visibleFollowers: true
                      })
                    }}>
                      Followers (10)
                    </Text>
                  </Block>
              </Block>
            </Block>
            <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']} style={styles.gradient} />
          </Block>
        </ImageBackground> */}
        <Block flex={1}>
          <Block style={styles.options}>
            <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
              <Block row space="between" style={{ paddingVertical: 16, alignItems: 'baseline' }}>
                <Text size={16}>Follow</Text>
                <Text size={12} color={theme.COLORS.BLACK} onPress={() => this.props.navigation.navigate('Settings')}>
                    <Icon name="cog" family="font-awesome" color={theme.COLORS.BLACK} size={16} /> Settings</Text>
              </Block>
              <Block row space="between" style={{ paddingVertical: 16, alignItems: 'baseline' }}>
                <Text size={16}>Recently events</Text>
                <Text size={14} color={theme.COLORS.BLACK} onPress={() => this.props.navigation.navigate('Home')}>View All</Text>
              </Block>
              <Block row space="between" style={{ flexWrap: 'wrap' }} >
                {Images.Viewed.map((img, imgIndex) => (
                  <Image
                    source={{ uri: img }}
                    key={`viewed-${img}`}  
                    resizeMode="cover"
                    style={styles.thumb}
                  />
                ))}
              </Block>
            </ScrollView>
            <Followers 
           isFollowers={this.state.followers}
           setModalVisible={()=>this.setState({visibleFollowers:false})}
           visible={this.state.visibleFollowers}></Followers>
          </Block>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  profile: {
    marginTop: 25,
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
  },
  profileTexts: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
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
    // position: 'relative',
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: theme.SIZES.BASE,
    marginBottom: 0,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
    borderRadius: 13
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure
  },
});

const mapDispatchToProps = (dispatch) => ({
  getProfileData: (data) => dispatch(profileApiCall(data)),
})

const mapStateToProps = (state) => ({
  profileData: state.profileData,
})

const container = compose(
  connect(
      mapStateToProps,
      mapDispatchToProps
  ),
  withLoadingScreen
)

export default compose(container)(Profile)
