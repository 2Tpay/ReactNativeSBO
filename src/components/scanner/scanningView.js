import React from 'react';
import {searchUser} from '../api/requester';
import {debounce} from 'lodash'
import {
  View,
  Text,
  TextInput,
  StyleSheet
} from 'react-native'
//import { Container, Hr} from 'native-base

class ScanningView extends React.Component {
  constructor(){
    super();
    this.state = {
      user_details : [],
      counter : 0
    }
  }

  searchUser = debounce(carnet => {
       searchUser(carnet)
        .then(response => {
          this.setState({
            user_details : response,
            counter: response.length <=0? this.state.counter: this.state.counter +1,
          });
        })
        .catch((error) => {
          throw error;
        });
  },400);

  render(){
    return (
      <View>
        <Text>
          Num. Pasajeros: {this.state.counter}
        </Text>
        <Text>
          Carnet:
        </Text>
        <TextInput onChangeText={this.searchUser.bind(this)}/>
        <View style={style.hr}></View>

        <View>
          <Text>Carnet: {this.state.user_details.name}</Text>
          <Text>Nombre: {this.state.user_details.name}</Text>
        </View>
      </View>
    );
  }
}
var style = StyleSheet.create({
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