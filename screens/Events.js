import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Alert, RefreshControl } from 'react-native';
import { Button, Block, Text, Input, theme } from 'galio-framework';
import withLoadingScreen from '../HOC/spinner';

import { LinearGradient } from 'expo-linear-gradient';
import { Icon, Product } from '../components';

const { width } = Dimensions.get('screen');
import Swipeout from 'react-native-swipeout';
import { compose } from "recompose"

import { connect } from 'react-redux'
import { callDeleteEventApi, callEventListApi, profileApiCall } from '../actions';

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventList : [],
      refreshing: false
    }
  }
  
  componentDidMount() {
    this.props.getProfileData()   
    this.callEventListApi() 
  }

  callEventListApi() {
    const request = {
      callback: (response) => {
          this.setState({
            eventList : response.data && response.data.eventList,
            refreshing: false
          }, () => {console.log("data===>",this.state.eventList)})
      }
    }
    this.props.getEventList(request)
  }

  renderSearch = () => {
    const { navigation } = this.props;
    const iconContent = <Icon size={16} color={theme.COLORS.MUTED} name="zoom-in" family="material" />

    return (
      <Input
      placeholderTextColor="white"
        right
        color="white"
        style={styles.search}
        iconContent={iconContent}
        placeholder="Events nearby you"
        onFocus={() => navigation.navigate('Search')}
      />
    )
  }
  
  renderTabs = () => {

    return (
      <Block row style={styles.tabs}>
        <Button shadowless style={[styles.tab, styles.divider]} onPress={() => 
          {// navigation.navigate('Categories')
        }
          }>
          <Block row middle>
            {/* <Icon name="grid" family="feather" style={{  }} /> */}
            <Text size={16} style={styles.tabTitle}>Events Nearby</Text>
          </Block>
        </Button>
        <Button shadowless style={styles.tab} onPress={() => 
          {
            //navigation.navigate('Deals')
          }
          }>
          <Block row middle>
            {/* <Icon size={16} name="camera-18" family="GalioExtra" style={{  }} /> */}
            <Text size={16} style={styles.tabTitle}>Events By Followers</Text>
          </Block>
        </Button>
      </Block>
    )
  }  

  deleteEvent(data) {
    console.log("delete",data)
    const request = {
      id: data.id,
      callback: (response) => {
        this.callEventListApi() 
        if(response.success) {
          Alert.alert('Event has deleted.');
        }
      }
    }
    this.props.deleteEventList(request)
  }

  editEvent(data) {
    const { navigation } = this.props;
    let eventData = {...data, isEdit: true}
    navigation.navigate('Host', eventData)
  }

  renderProductRow (data) {
    let swipeRightBtns = [{
      text: 'Delete',
      backgroundColor: 'red',
      underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
      onPress: () => { this.deleteEvent(data) }
    }];
    let swipeLeftBtns = [{
      text: 'Edit',
      backgroundColor: "#383838",
      underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
      onPress: () => { this.editEvent(data) }
    }];
    return(
        <Swipeout 
        left={swipeLeftBtns}
        right={swipeRightBtns}
          style={{marginVertical: 20, borderRadius: 10, color: "black"}}
          autoClose='true'
          backgroundColor= 'transparent'>
            <Product product={data} full />
        </Swipeout>
    )
  }

  renderProducts = () => {    
    return (
      <Block flex style={styles.products}>
        {this.state.eventList && this.state.eventList.map(data => 
        this.renderProductRow(data)
        )}                   
      </Block>
    )
  }

  render() {
    return (
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0.25, y: 1.1 }}
        locations={[0.2, 1]}
        colors={['#000000', '#000000']}
        style={[{flex: 1, paddingTop: theme.SIZES.BASE}]}>
      <ScrollView flex center style={styles.home}
       refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={() => {
            this.setState({refreshing: true})
            this.callEventListApi()}
          }
        />
      }>
        {this.renderTabs()}
        {/* {this.renderSearch()} */}
        {this.renderProducts()}
      </ScrollView></LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: theme.COLORS.BLACK,
    borderColor: theme.COLORS.WHITE
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 4,
    zIndex: 2,
  },
  tabs: {
    marginBottom: 24,
    marginTop: 44,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.50,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    color: theme.COLORS.WHITE,
    lineHeight: 19,
    fontWeight: "500"
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.MUTED,
  },
  products: {
    paddingHorizontal: 10,
  },
});

const mapDispatchToProps = (dispatch) => ({
  getProfileData: (data) => dispatch(profileApiCall(data)),
  getEventList: (data) => dispatch(callEventListApi(data)),
  deleteEventList: (data) => dispatch(callDeleteEventApi(data)),
})

const mapStateToProps = (state) => ({
  authData: state.authData,
})

const container = compose(
  connect(
      mapStateToProps,
      mapDispatchToProps
  ),
  withLoadingScreen
)

export default compose(container)(Events)
