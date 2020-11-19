import React from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Image,
  Animated,
  Platform,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { Block, Text, Button, theme } from 'galio-framework';
import { Icon } from '../components';
import materialTheme from '../constants/Theme';
import Images from "../constants/Images";
import { iPhoneX, HeaderHeight } from "../constants/utils";
import MapView from 'react-native-maps';
const { height, width } = Dimensions.get('window');

export default class Product extends React.Component {
  state = {
    selectedSize: null,
  };

  scrollX = new Animated.Value(0)

  renderGallery = () => {
    const { navigation, route } = this.props;
    // const { params } = navigation && navigation.state;
    const product = route.params?.product;
    // const product = params.product;
    const productImages = [product.image, product.image, product.image, product.image];

    return (
      <ScrollView
        horizontal={true}
        pagingEnabled={true}
        decelerationRate={0}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: this.scrollX } } }])}
      >
        {productImages.map((image, index) => (
          <TouchableWithoutFeedback
            key={`product-image-${index}`}
            onPress={() => navigation.navigate('Gallery', { images: productImages, index })}>
            <Image
              resizeMode="cover"
              source={{ uri: image }}
              style={{ width, height: iPhoneX() ? width + 32 : width }}
            />
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    )
  }

  renderProgress = () => {
    const { navigation, route } = this.props;
    // const { params } = navigation && navigation.state;
    // const product = params.product;
    const product = route.params?.product;
    const productImages = [product.image, product.image, product.image, product.image];

    const position = Animated.divide(this.scrollX, width);

    return (
      <Block row>
        {productImages.map((_, i) => {
          const opacity = position.interpolate({
            inputRange: [i - 1, i, i + 1],
            outputRange: [0.5, 1, 0.5],
            extrapolate: 'clamp'
          });
          
          const width = position.interpolate({
            inputRange: [i - 1, i, i + 1],
            outputRange: [8, 18, 8],
            extrapolate: 'clamp'
          });

          return <Animated.View key={i} style={[styles.dots, {opacity, width}]} />;
        })}
      </Block>
    )
  }

  renderSize = (label) => {
    const active = this.state.selectedSize === label;

    return (
      <TouchableHighlight
        style={styles.sizeButton}
        underlayColor={materialTheme.COLORS.PRICE_COLOR}
        onPress={() => this.setState({ selectedSize: label })}>
        <Text color={active ? theme.COLORS.PRIMARY : null}>{label}</Text>
      </TouchableHighlight>
    );
  }

  renderChatButton = () => {
    const { navigation } = this.props;
    return (
      <Block style={styles.chatContainer}>
        <Button
          radius={28}
          opacity={0.9}
          style={styles.chat}
          color={materialTheme.COLORS.BUTTON_COLOR}
          onPress={() => navigation.navigate('Chat')}>
          <Icon size={16} family="GalioExtra" name="chat-33" color="white" />
        </Button>
      </Block>
    )
  }

  render() {
    const { selectedSize } = this.state;
    const { navigation, route } = this.props;
    // const { params } = navigation && navigation.state;
    // const product = params.product;
    const product = route.params?.product;

    return (
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0.25, y: 1.1 }}
        locations={[0.2, 1]}
        colors={['#000000', '#000000']}
        style={[{flex: 1, paddingTop: theme.SIZES.BASE}]}>
        <Block flex style={styles.product}>
          <Block flex style={{ position: 'relative' }}>
            {this.renderGallery()}
            <Block center style={styles.dotsContainer}>
              {this.renderProgress()}
            </Block>
          </Block>
          <Block flex style={styles.options}>
            
            <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
              <Block style={{ paddingHorizontal: theme.SIZES.BASE, paddingTop: theme.SIZES.BASE * 2 }}>
                <Text size={28} style={{ paddingBottom: 24 }}>{product.title}</Text>
                <Block row space="between">
                  <Block row>
                    <Image source={{ uri: Images.Profile }} style={styles.avatar} />
                    <Block>
                      <Text size={14}>Rachel Brown</Text>
                    </Block>
                  </Block>
                </Block>
              </Block>
              <Block style={{ padding: theme.SIZES.BASE }}>
                <Text size={16}>Total No. of People : 40</Text>
                <Text size={16}>No. of Females going : 20</Text>
                <Text size={16}>No. of Males going : 20</Text>
                <Block style={{ padding: theme.SIZES.BASE }}>
                  <Text size={14}>Event Description / Age Requirements / Locations</Text>
                </Block>
                <Block style={{ padding: theme.SIZES.BASE }}>
                  <Text size={14}><Icon name="film" family="font-awesome" color={theme.COLORS.BLACK} size={16} />  Videos</Text>
                  <Image source={{ uri: "https://images.unsplash.com/photo-1543321269-9d86d3680e1c?crop=entropy&w=840&h=840&fit=crop" }} style={styles.eventimage} />                
                </Block>
                <MapView style={styles.mapStyle} />
                <Button
                  shadowless
                  style={styles.addToCart}
                  color={materialTheme.COLORS.BUTTON_COLOR}
                  onPress={() => navigation.navigate('Cart')}>
                  <Text
                    color={theme.COLORS.BLACK} 
                    size={theme.SIZES.FONT}>JOIN EVENT</Text>
                </Button>
              </Block>
            </ScrollView>
          </Block>
        </Block></LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  product: {
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
  },
  options: {
    position: 'relative',
    marginHorizontal: theme.SIZES.BASE,
    marginTop: -theme.SIZES.BASE * 2,
    marginBottom: 0,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2
  },
  galleryImage: {
    width: width,
    height: 'auto'
  },
  dots: {
    height: theme.SIZES.BASE / 2,
    margin: theme.SIZES.BASE / 2,
    borderRadius: 4,
    backgroundColor: 'white'
  },
  dotsContainer: {
    position: 'absolute',
    bottom: theme.SIZES.BASE,
    left: 0,
    right: 0,
    bottom: height / 10,
  },
  addToCart: {
    width: width - theme.SIZES.BASE * 4,
    marginTop: theme.SIZES.BASE * 2,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    shadowOpacity: 1
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginBottom: theme.SIZES.BASE,
    marginRight: 8,
  },
  chat: {
    width: 56,
    height: 56,
    padding: 20,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    shadowOpacity: 1
  },
  chatContainer: {
    top: -28,
    right: theme.SIZES.BASE,
    zIndex: 2,
    position: 'absolute',
  },
  size: {
    height: theme.SIZES.BASE * 3,
    width: (width - theme.SIZES.BASE * 2) / 3,
    borderBottomWidth: 0.5,
    borderBottomColor: materialTheme.COLORS.BORDER_COLOR,
    overflow: 'hidden',
  },
  sizeButton: {
    height: theme.SIZES.BASE * 3,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundColor: materialTheme.COLORS.PRICE_COLOR,
  },
  roundTopLeft: {
    borderTopLeftRadius: 4,
    borderRightColor: materialTheme.COLORS.BORDER_COLOR,
    borderRightWidth: 0.5,
  },
  roundBottomLeft: {
    borderBottomLeftRadius: 4,
    borderRightColor: materialTheme.COLORS.BORDER_COLOR,
    borderRightWidth: 0.5,
    borderBottomWidth: 0,
  },
  roundTopRight: {
    borderTopRightRadius: 4,
    borderLeftColor: materialTheme.COLORS.BORDER_COLOR,
    borderLeftWidth: 0.5,
  },
  roundBottomRight: {
    borderBottomRightRadius: 4,
    borderLeftColor: materialTheme.COLORS.BORDER_COLOR,
    borderLeftWidth: 0.5,
    borderBottomWidth: 0,
  },
  mapStyle: {
    width: 400,
    height:200,
    marginTop:12
  },
  eventimage: {
    width: 200,
    height: 100,
    marginTop:10
  },
});
