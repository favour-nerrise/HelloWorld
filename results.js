import React, { Component, PropTypes } from 'react';
import { Linking, View, Text, TouchableHighlight, AppRegistry, StyleSheet, Image } from 'react-native';
import { Container, Header, Title, Content, Button, Icon } from 'native-base';

var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');

export default class MyScene extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onForward: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
  }
  render() {
    return (
      <Container> 
        <Content>
            <Image style={styles.image} source={require('./img/unionrail.jpg')} />
            <Image style={ styles.confirmButton } source={require('./img/confirm.png')} />
            <Image style={ styles.declineButton } source={require('./img/decline.png')} />
        </Content>
      </Container>
  )}
}

var styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
    width: width,
    height: height
  },
  confirmButton: {
    position: 'absolute',
    height: 75,
    width: 75,
    right: 90,
    bottom: 75,
  },
  declineButton: {
    position: 'absolute',
    height: 75,
    width: 75,
    left: 90,
    bottom: 75,
  }
})