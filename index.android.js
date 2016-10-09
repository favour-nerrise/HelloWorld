

import React, { Component } from 'react';
import { AppRegistry, Navigator, Text, View } from 'react-native';

import MyScene from './cameraCall';

class SuperProject extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{ title: 'cameraCall', index: 0 }}
        renderScene={(route, navigator) => {
          return <MyScene route={route} navigator={navigator} />
        }}/>
    );
  }
}


AppRegistry.registerComponent('SuperProject', () => SuperProject);
