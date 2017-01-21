import React from 'react';
import {searchUser} from '../api/requester';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';
import Hr from 'react-native-hr';
import {
  Container,
  Button
} from 'native-base';
import {
	Actions,
} from 'react-native-router-flux';

import { getCardId } from 'nfc-react-native';

import globalStyles from '../../themes/styles'
import styles from './styles';
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
  componentDidMount(){
    this._mounted = true;
    this.startNFCloop();
  }
  componentWillUnmount(){
    this._mounted = false;
  }

  isMounted(){
    return this._mounted;
  }

  startNFCloop(){
      var self = this;
      setTimeout(function() {
      if (!self.isMounted()) { return; } // abandon
          //self.callback(); // do it once and then start it up ...
      self._timer = setInterval(self.nfcCallback.bind(self), 1000);
      }, 1000);
  }

  nfcCallback(){
     getCardId().then((card) => {
       alert("Ingresado: " + card);
      }).catch((err) => {
          // NFCcode isset, do something
          if (err.message > "" /*&& err.message != "Operacion Cancelada"*/) {
              alert(err.message);
          }
      });
  }


  HandleButton(){
    //Actions.pop({popNum: 4});
  }

  testingNFC(carnet){
    alert("ingresar "+carnet);
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
          <Text style={styles.text}>Bus de {this.props.routeName} en dirección {this.props.routeDirection}</Text>
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
        <Button style={styles.btn} onPress={this.testingNFC.bind(this, this.state.userCarnet)}>
          Ingresar
        </Button>
        <Hr lineColor='#b3b3b3' text='Información de usuario' />

          <View style={styles.informationUser}>
            <Text style={styles.informationUserText}>Carnet: {this.state.user_details.name}</Text>
            <Text style={styles.informationUserText}>Nombre: {this.state.user_details.name}</Text>
          </View>
          <TouchableHighlight style={styles.touchable} onPress={this.HandleButton.bind(this)}>
            <Text style={styles.touchableText}>Terminar</Text>
          </TouchableHighlight>
        </View>
      </Container>
    );
  }
}

export default ScanningView;
