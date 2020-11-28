import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, ImageBackground, Platform } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';

import { Icon } from '../components';
import { Images, materialTheme } from '../constants';
import { HeaderHeight } from "../constants/utils";

const { width } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;
import { compose } from "recompose"
import { connect } from 'react-redux'
import withLoadingScreen from '../HOC/spinner';

class Profile extends React.Component {

  state = {
    userName: '',
    email: '',
    location: '',
  } 
  
  componentDidMount() {
    console.log("profileData",this.props.profileData)
    this.setState({
      userName: this.props.profileData && this.props.profileData.userDetail.fullName,
      email: this.props.profileData && this.props.profileData.userDetail.email
    })
  }

  render() {
    return (
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0.25, y: 1.1 }}
        locations={[0.2, 1]}
        colors={['#000000', '#000000']}
        style={[styles.signin, {flex: 1, paddingTop: theme.SIZES.BASE * 4}]}>
      <Block flex style={styles.profile}>
        <ImageBackground
          source={{ uri: Images.Profile }}
          style={styles.profileContainer}
          imageStyle={styles.profileImage}>
          <Block flex style={styles.profileDetails}>
            <Block style={styles.profileTexts}>
              <Text color="white" size={28} style={{ paddingBottom: 8 }}>{this.state.userName}</Text>
              <Block row space="between">
                {/* <Block row>
                  <Text color="white" size={16} muted style={styles.seller}>{this.state.email}</Text>
                </Block> */}
                <Block>
                  <Text color={theme.COLORS.MUTED} size={16}>
                    <Icon name="map-marker" family="font-awesome" color={theme.COLORS.MUTED} size={16} />
                    {`  `} Los Angeles, CA
                  </Text>
                </Block>
              </Block>
              <Block row space="between">
                  <Block row>
                    <Text color={theme.COLORS.MUTED} size={16}>
                      Followers (10)
                    </Text>
                  </Block>
              </Block>
            </Block>
            <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']} style={styles.gradient} />
          </Block>
        </ImageBackground>
        <Block flex={0.7}>
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
          </Block>
        </Block>
      </Block>
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
