import React from 'react';
import {searchUser} from '../api/requester';
import {
  View,
  Alert,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  AsyncStorage,
  DeviceEventEmitter
} from 'react-native';
import Hr from 'react-native-hr';

import {
  Container,
  Button
} from 'native-base';
import {
	Actions,
} from 'react-native-router-flux';

import { getTagId } from 'nfc-react-native';
const Sound = require('react-native-sound');

// const requireAudio = require('./button_beep_tone.mp3');

// import { Sound } from 'react-native-sound';

import globalStyles from '../../themes/styles'
import styles from './styles';
import { SwipeListView } from 'react-native-swipe-list-view';
class ScanningView extends React.Component {
  constructor(){
    super();
    this.state = {
      user_details : [],
      counter : 0
    };

    AsyncStorage.getItem("text").then((value) => {
      this.setState({text: value});
    }).done();



  }


  playSoundBundle () {
    const s = new Sound('button_beep_tone.mp3', Sound.MAIN_BUNDLE, (e) => {
      if (e) {
        console.log('error', e);
      } else {
        s.setSpeed(1);
        console.log('duration', s.getDuration());
        s.play(() => s.release()); // Release when it's done so we're not using up resources
      }
    });
  };

  componentDidMount() {

      this._mounted = true;
      // this.startNFCloop();

      DeviceEventEmitter.addListener('onTagError', function (e) {
          console.log('error', e)
          // alert(JSON.stringify(e))
      });


      DeviceEventEmitter.addListener('onTagDetected', (e) => {
          let stringifiedId = JSON.stringify(e);
          this.playSoundBundle();
          Alert.alert("Isaula: " + stringifiedId);
          // this.state.user_details.name = stringifiedId;
      });
  }

  HandleButton(){
    //Actions.pop({popNum: 4});
  }

  searchUserByCarnet(carnet){
      if(carnet != ''){
       searchUser(carnet)
        .then(response => {
          if(response.length<=0){
            alert("Carnet numero: "+ carnet+" no se ha encontrado");
          }else{
            this.setState({
              user_details : response,
              counter: this.state.counter +1,
              userCarnet: "",
            });
            this._textInput.setNativeProps({text: ''});
          }
        })
        .catch((error) => {
          throw error;
        });
      }
  }

  render(){
    return (
      <Container style={styles.container}>
        <View>
          <Text style={globalStyles.title}>Ingreso de pasajeros</Text>
          <Text style={styles.text}>Bus de {this.props.routeName} en dirección {this.props.routeDirection} {this.props.routeDirection=="entrada"?'al':'del'} templo</Text>
          <Text style={styles.text}>
            Num. Pasajeros: {this.state.counter}
          </Text>
          <Text style={styles.text}>
            Carnet:
          </Text>
          <TextInput returnKeyType="search" ref={component => this._textInput = component} style={styles.formInput} placeholder="Ingrese número de carnet" onChangeText={(text)=>
            {
              this.setState({
                user_details: this.state.user_details,
                counter: this.state.counter,
                userCarnet: text
              });
            }
          }/>
        <Button style={styles.btn} onPress={this.playSoundBundle}>
          Ingresar
        </Button>
        <Hr lineColor='#b3b3b3' text='Pasajeros' />

          <View style={styles.informationUser}>
          </View>
          <TouchableHighlight style={styles.touchable} onPress={this.playSoundBundle}>
            <Text style={styles.touchableText}>Terminar</Text>
          </TouchableHighlight>
        </View>
      </Container>
    );
  }
}
// this.HandleButton.bind(this)
export default ScanningView;
