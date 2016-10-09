import React, { Component, PropTypes } from 'react';
import { Linking, View, Text, TouchableHighlight, AppRegistry, StyleSheet, Image } from 'react-native';
import { Container, Header, Title, Content, Button, Icon } from 'native-base';
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
var obj = "Toronto Transit Comission"
var originalText = "The Toronto Transit Commission (TTC) is a public transport agency that operates transit bus, streetcar, paratransit, and rapid transit services in Toronto, Ontario, Canada. Established in 1921, the TTC comprises four rapid transit lines with 69 stations, over 149 bus routes, and 10 streetcar lines.";
var sentenceEnd = originalText.indexOf('.');
// var text;
// var count = 0;
// while (sentenceEnd && count < 3) {
//     text = originalText.splice(0, sentenceEnd + 1);
//     count ++;
// }


export default class Results extends Component {

  _handlePress() {
    Linking.openURL("https://google.ca").catch(err => console.error('An error occurred', err));
  }
  render() {
    return (
      <Container>
      <Header>
        {/*<Button transparent>
          <Icon name='ios-menu' />
        </Button>*/}
      </Header>
            <Content>
              <View style={{flex: 1 }} >
                <View style={{flex: 5}} >
                  <Image style={styles.image} source={{uri: myImage}} />
                    <View style={[styles.overlay, { height: 100}]} >
                      <Text style={styles.overlayText} >
                        {obj}
                      </Text>
                    </View>
                  </View>
        <View style={styles.infoBox} >
            <Image style={ styles.image } source={require('./img/speechBubble.png')} style={{width: 350, height: 200, top:-80}} />
            <Text style={styles.infoBoxText} >
                {originalText}
            </Text>
        </View>
        <View style={{flex: 1}} >
            <Button primary style={styles.learnMore}
            onPress={() => this._handlePress()}>
              Learn More
            </Button>
            <Button success style={styles.next}
            onPress={() => this._handlePress()}>
              Success
            </Button>
        </View>
      </View>
    </Content>
  </Container>
    )
  }
}

var styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
    borderWidth: 1,
    flexDirection:'row',
    width: width
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    bottom: 0,
    opacity: 0.5,
    backgroundColor: 'white',
    width: width,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  overlayText: {
    marginRight: 10,
    marginLeft: 10,
    fontSize: 18,
    color: 'blue',
    // fontFamily: 'Raleway',
    fontWeight: 'bold',
  },
  infoBox: {
    flex: 3,
    top: 100,
    backgroundColor: 'white',
  },
  infoBoxText: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'transparent',
    padding: 10,
    paddingTop: 0,
    position: 'absolute',
    top: -60,
    left: 10,
    right: 100,
    width: 350,
    // fontFamily: 'Raleway',
    fontSize: 16

  },
  learnMore: {
    position: 'relative',
    top: 100,
    left: 50
  },
  next: {
    position: 'absolute',
    top: 100,
    left: 200
  }
});
