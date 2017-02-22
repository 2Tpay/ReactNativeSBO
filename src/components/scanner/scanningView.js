import React from 'react';
import {searchUser} from '../api/requester';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  AsyncStorage,
  Strong
} from 'react-native';
import Hr from 'react-native-hr';
import {
  Container,
  Button
} from 'native-base';
import {
	Actions,
} from 'react-native-router-flux';

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
  HandleButton(){
    Actions.pop({popNum: 4});
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
        <Button style={styles.btn} onPress={this.searchUserByCarnet.bind(this, this.state.userCarnet)}>
          Ingresar
        </Button>
        <Hr lineColor='#b3b3b3' text='Pasajeros' />

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
