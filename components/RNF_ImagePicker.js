import React, { useState, useEffect } from 'react';
import { Image, View, Platform, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { materialTheme } from '../constants';
import { Button, Text, theme } from 'galio-framework';
const { width } = Dimensions.get('window');

export default function RNF_ImagePicker() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={{
      flex:1,
      height: 44, 
      borderRadius: 5,
      alignItems: 'center', justifyContent: 'center', backgroundColor: materialTheme.COLORS.INFO, 
 }}>
   <Button style={{width: width - theme.SIZES.BASE * 4}} shadowless color={materialTheme.COLORS.INFO} onPress={pickImage} > 
      <Text size={16} bold color={theme.COLORS.BLACK}>Pick an image from camera roll</Text>
    </Button>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}