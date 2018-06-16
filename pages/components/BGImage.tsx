import React from 'react';
import { ImageBackground } from 'react-native';


const BGImage: React.StatelessComponent<{}> = ({ children }) => {
  return (
    <ImageBackground
      style={{ flex: 1}}
      resizeMode='cover'
      source={require('../img/bg.png')}
    >
      {children}
    </ImageBackground>
  )
};

export default BGImage;
