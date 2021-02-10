import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme, Button } from 'galio-framework';

const { width, height } = Dimensions.get('screen');

class Product extends React.Component {
  render() {
    const { navigation, product, horizontal, full, style, priceColor, imageStyle } = this.props;
    const imageStyles = [styles.image, full ? styles.fullImage : styles.horizontalImage, imageStyle];

    return (
      <Block row={horizontal} card flex style={[styles.product, styles.shadow, style]}>
        <Block flex space="between" style={styles.descriptionContainer}>
            <Block flex space="between" style={styles.productDescription}>
                <Text size={14} style={styles.productTitle}>{product.title}</Text>
                <Text size={12} style={styles.productTitle}>{product.time}</Text>
            </Block>
            <Button shadowless style={styles.joinEventButton} onPress={() => 
              {
                // navigation.navigate('Categories')
            }}>
              <Block row middle>
                {/* <Icon name="grid" family="feather" style={{  }} /> */}
                <Text size={16} style={styles.tabTitle}>Join Event</Text>
              </Block>
          </Button>
          </Block>
        <TouchableWithoutFeedback onPress={() => 
          {// navigation.navigate('Product', { product: product })
        }
        }>
          <Block flex style={[styles.imageContainer, styles.shadow]}>
            <Image source={{ uri: "https://images.unsplash.com/photo-1539314171919-908b0cd96f03?crop=entropy&w=840&h=840&fit=crop" }} style={imageStyles} />
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Product', { product: product })}>
          <Block flex space="between" style={styles.productDescription}>
            <Text 
            numberOfLines={2}
            size={14} style={styles.productTitle}>{product.description}</Text>
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    );
  }
}

export default withNavigation(Product);

const styles = StyleSheet.create({
  product: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
  },
  productTitle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 6,
    color: theme.COLORS.BLACK
  },
  productDescription: {
    padding: theme.SIZES.BASE / 2,
  },
  descriptionContainer: {
    padding: theme.SIZES.BASE / 2,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "center"
  },
  imageContainer: {
    elevation: 1,
    paddingLeft: 10,
    paddingRight: 10
  },
  image: {
    borderRadius: 3,
    // marginHorizontal: theme.SIZES.BASE / 2,
    marginTop: -16,
  },
  horizontalImage: {
    height: 122,
    width: '100%',
  },
  fullImage: {
    height: height-260,
    width: "100%",
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    shadowOpacity: 0.1,
    elevation: 2,
    backgroundColor: theme.COLORS.WHITE
  },
  joinEventButton: {
    backgroundColor: "#CEC4C4",
    width: width * 0.30,
    borderRadius: 0,
    borderWidth: 0,
    height: 40,
    elevation: 0,
    alignSelf: "center",
    borderRadius: 5
  }
});