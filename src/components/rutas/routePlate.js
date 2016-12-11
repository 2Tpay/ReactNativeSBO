import React from 'react';

import {
  Text,
  TextInput,
  View,
  TouchableOpacity
} from 'react-native';

import {
  Actions
} from 'react-native-router-flux';

class RoutePlate extends React.Component {
  HandleButton(id, direction){
    /* Actions.routePlate({
      rutaId: id,
      routeDirection: direction,
    });*/
    console.log("Id " + id);
  }

  render(){
    return (
      <View>
        <Text>
          La ruta - {this.props.rutaId} en dir {this.props.routeDirection}
        </Text>
        <TextInput
          style={{height: 50}}
          placeholder="Escriba la placa del bus de ruta "
          onChangeText={(text) => this.setState({text})}
          />


        <TouchableOpacity onPress={this.HandleButton.bind(this, this.props.rutaId, this.props.routeDirection)}>
            <Text>
                Continuar
            </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default RoutePlate;
