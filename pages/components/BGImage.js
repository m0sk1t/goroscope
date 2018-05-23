import React from 'react';
import {
  StyleSheet,
  ImageBackground,
} from 'react-native';

const ImageURI = `https://www.pixelstalk.net/wp-content/uploads/2016/10/Cosmic-Wallpapers-HD-For-Desktop.jpg`;

const BGImage = ({ children }) => {
  return (
    <ImageBackground
      resizeMode={'cover'}
      style={styles.bgimage}
      source={{ uri: ImageURI }}
    >
      {children}
    </ImageBackground>
  )
};

const styles = StyleSheet.create({
  bgimage: {
    flex: 1,
  },
});

export default BGImage;
