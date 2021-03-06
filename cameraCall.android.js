
import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Info,
  Image
} from 'react-native';

import Camera from 'react-native-camera';
import Button from 'react-native-button';
import RNFetchBlob from 'react-native-fetch-blob'
import firebase from 'firebase'
import Results from './results.js'

const testImageName = "firstchild"
const prefix = 'file://'
const polyfill = RNFetchBlob.polyfill

window.XMLHttpRequest = polyfill.XMLHttpRequest
window.Blob = polyfill.Blob


const API_KEY = 'AIzaSyAuM22K_YmJCYvg9_ajTCorTNSJCBHqjAE'
const APP_NAME = 'helloworld-12750'
const EMAIL = 'helloworld@mail.com'
const PASSWORD = 'helloworld1'

// Initialize Firebase
const config = {
  apiKey: API_KEY,
  authDomain: `${APP_NAME}.firebaseapp.com`,
  databaseURL: `https://${APP_NAME}.firebaseio.com`,
  storageBucket: `gs://${APP_NAME}.appspot.com`,
};

firebase.initializeApp(config);

firebase.auth()
        .signInWithEmailAndPassword(EMAIL, PASSWORD)
        .catch((err) => {
          console.log('firebase sigin failed', err)
        })


RNFetchBlob
  .config({ fileCache : true, appendExt : 'jpg' })
  .fetch('GET', 'https://avatars0.githubusercontent.com/u/5063785?v=3&s=460')
  .then((resp) => {
    testFile = resp.path()
    console.log(resp.path())
    return(
      <Image
        style={{ height : 256, width : 256, alignSelf : 'center' }}
        source={{ uri : prefix + testFile }}/>
    )
  })
  .catch(err => console.error(err));

const routes = [
  {title: 'cameraCall', index: 0},
  {title: 'renderImage', index: 1},
  {title: 'renderInfo', index: 2},
];

export default class MyScene extends Component {

  render() {
    switch (this.props.route.index) {
      case 0:
        return <View1 navigator={this.props.navigator} />;
        break;
      case 1:
        return <View2 navigator={this.props.navigator} data={this.props.data} />;
        break;
      case 2:
        return <Results navigator={this.props.navigator} data={this.props.data} myImage={myImage} />;
        break;
    }
  }
}

myImage = ""

class View1 extends Component {
  render() {
    return <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <View style={styles.lowerStrip}>
            <TouchableHighlight style={styles.capture} onPress={() => this.takePicture()}>
                <View style={styles.button}></View>
            </TouchableHighlight>
          </View>
        </Camera>
      </View>;
  }

  // takePicture() {
  //   this.camera.capture()
  //     .then((data) => fetch('https://www.wolframcloud.com/objects/user-dafc6a4b-5be6-4695-a653-5d3b4876a78c/ImageAPI?url='+ data.path))
  //     .then(response => {
  //       this.props.navigator.push(routes[1]);
  //     })
  //     .catch(err => console.error(err));
  // };

  takePicture() {
    this.camera.capture()
      .then(data => {
        myImage = data.path
        this.props.navigator.push({title: 'renderImage', index: 1});

        Blob.build(RNFetchBlob.wrap(data.path), { type : 'image/jpg' })
          .then(blob => {


            firebase.storage()
                  .ref('rn-firebase-upload')
                  .child(testImageName)
                  .put(blob, { contentType : 'image/jpg' })
                  .then((snapshot) => {
                    console.log(snapshot + 'what?')
                  })
                  .catch(err => console.error(err));
                }
          )
          .then(snapshot => {
            console.log(snapshot)
      })
      .catch(err => console.error(err));
    })
  }

}

// { path: 'file:///storage/emulated/0/DCIM/IMG_20161008_220355.jpg' }



//https://www.wolframcloud.com/objects/user-dafc6a4b-5be6-4695-a653-5d3b4876a78c/ImageAPI?url=file:///storage/emulated/0/DCIM/IMG_20161008_220355.jpg
// ImageIdentify[$Failed]

        // <TouchableHighlight style={ styles.confirmButton } onPress={this._onConfirm}>
        //   <Image>
        //     source={require('./img/confirm.png')}
        //   </Image>
        // </TouchableHighlight>
        // <TouchableHighlight style={ styles.declineButton } onPress={this._onDecline}>
        //   <Image source={require('./img/decline.png')} />
        // </TouchableHighlight>

//this.props.navigator.push(routes[1]);


class View2 extends Component {
  render() {
    console.log(myImage)
    return (
      <View style={{flex: 1}}>
        <Image source={{uri: myImage}} style={styles.icon}/>
        <Text style={styles.infoBoxText}>
          MHacks is a 36-hour hackathon hosted by University of Michigan students.
Participants (“hackers”) spend 36 hours working in teams of 1 - 4 people to build or code projects (“hacks”) they’re excited about. There are workshops, mentors, food, swag, and buckets of coffee to guide you along the way.
        </Text>
      </View>
    )
  }

  _onDecline() {
    console.log(this)
    console.log(this.props)
    this.props.navigator.pop()
  }

  _onConfirm() {
    this.props.navigator.push({title: 'renderImage', index: 2});
  }
}

const styles = StyleSheet.create({
  container: {
  },
  icon: {
    width: 300,
    height: 300,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    alignSelf: 'center'
  },

  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    borderRadius: 5,
  },
  button: {
    width: 60,
    height: 60,
    borderColor: 'black',
    backgroundColor: 'skyblue',
    borderWidth: 1,
    borderRadius: 90,
    marginTop: 10,
    alignSelf: 'center'
  },
  lowerStrip: {
    backgroundColor:'rgba(75, 115, 227,0.25)',
    height: 100,
    width: Dimensions.get('window').width
  },
  confirmButton: {
    flex: 1,
    position: 'absolute',
    height: 75,
    width: 75,
    right: 90,
    bottom: 75,
  },
  declineButton: {
    flex: 1,
    position: 'absolute',
    height: 75,
    width: 75,
    left: 90,
    bottom: 75,
  },
  infoBoxText: {
    padding: 10,
    fontSize: 20,
    justifyContent: 'center'
  }
});
