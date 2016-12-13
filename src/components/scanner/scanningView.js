import React from 'react';
import {searchUser} from '../api/requester';
import {debounce} from 'lodash';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage
} from 'react-native'

import {
	Actions,
} from 'react-native-router-flux';
//import { Container, Hr} from 'native-base

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
          }
          this.setState({
            user_details : response,
            counter: response.length <=0? this.state.counter: this.state.counter +1,
            userCarnet: "",
          });
        })
        .catch((error) => {
          throw error;
        });
      }
  }

  render(){
    return (
      <View>
        <Text>Bus en direccion: {this.props.routeDirection} - {this.props.routeId}</Text>
        <Text>Placa: { this.props.busPlate}</Text>
        <Text>
          Num. Pasajeros: {this.state.counter}
        </Text>
        <Text>
          Carnet:
        </Text>
        <TextInput onChangeText={(text)=>
          {
            this.setState({
              user_details: this.state.user_details,
              counter: this.state.counter,
              userCarnet: text
            });
          }
        }/>
      <TouchableOpacity onPress={this.searchUserByCarnet.bind(this, this.state.userCarnet)}>
            <Text>Ingresar</Text>
          </TouchableOpacity>
      <View style={style.hr}></View>

        <View>
          <Text>Carnet: {this.state.user_details.name}</Text>
          <Text>Nombre: {this.state.user_details.name}</Text>
        </View>
        <TouchableOpacity onPress={this.HandleButton.bind(this)}>
          <Text>
            Terminar
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

let style = StyleSheet.create({
  hr: {
    alignItems:'center',
    width: 300,
    marginTop: 10,
    marginBottom: 10,
    padding: 1,
    backgroundColor: '#b3b3b3'
  },
});
export default ScanningView;
