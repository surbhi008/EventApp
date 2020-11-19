import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Block, Text, theme } from "galio-framework";

import Icon from "./Icon";
import materialTheme from "../constants/Theme";

class DrawerItem extends React.Component {
  renderIcon = () => {
    const { title, focused } = this.props;

    switch (title) {
      case "Home":
        return (
          <Icon
            size={14}
            name="shop"
            family="GalioExtra"
            color={focused ? "black" : materialTheme.COLORS.MUTED}
          />
        );
      case "Host Event":
        return (
          <Icon
            size={15}
            name="grid-on"
            family="material"
            color={focused ? "black" : materialTheme.COLORS.MUTED}
          />
        );
      case "Events Near Me":
        return (
          <Icon
            size={15}
            name="grid-on"
            family="material"
            color={focused ? "black" : materialTheme.COLORS.MUTED}
          />
        );
      case "Profile":
        return (
          <Icon
            size={15}
            name="circle-10"
            family="GalioExtra"
            color={focused ? "black" : materialTheme.COLORS.MUTED}
          />
        );
      case "Settings":
        return (
          <Icon
            size={15}
            name="circle-10"
            family="GalioExtra"
            color={focused ? "black" : materialTheme.COLORS.MUTED}
          />
        );
      case "Customer Support":
        return (
          <Icon
            size={15}
            name="gears"
            family="font-awesome"
            color={focused ? "black" : materialTheme.COLORS.MUTED}
          />
        );
      case "Sign Out":
        return (
          <Icon
            size={15}
            name="md-person-add"
            family="ionicon"
            color={focused ? "black" : materialTheme.COLORS.MUTED}
          />
        );
      default:
        return null;
    }
  };
  render() {
    const { title, focused, navigation } = this.props;
    return (
      <TouchableOpacity
        style={{ height: 55 }}
        onPress={() => navigation.navigate(title)}
      >
        <Block
          flex
          row
          style={[
            styles.defaultStyle,
            focused ? [styles.activeStyle, styles.shadow] : null
          ]}
        >
          <Block middle flex={0.1} style={{ marginRight: 28 }}>
            {this.renderIcon()}
          </Block>
          <Block flex={0.9}>
            <Text size={15} color={focused ? "black" : "black"}>
              {title}
            </Text>
          </Block>
        </Block>
      </TouchableOpacity>
    );
  }
}

export default DrawerItem;

const styles = StyleSheet.create({
  defaultStyle: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 6
  },
  activeStyle: {
    backgroundColor: materialTheme.COLORS.ACTIVE,
    borderRadius: 4
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 0.2
  }
});
