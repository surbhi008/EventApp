import React, {useEffect} from 'react';
import { View } from 'react-native';
import { StackActions } from '@react-navigation/native';

export default function Logout (props) {
  useEffect(() => {
    const { navigation } = props;
    navigation.dispatch(
      StackActions.replace('SIGN IN', {
      })
    );
  },[props])

  return <View/>
}
