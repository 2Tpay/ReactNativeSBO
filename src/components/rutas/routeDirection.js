import React from 'react';

import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import {
  Actions,
} from 'react-native-router-flux';

class RouteDirection extends React.Component {
  HandleButton(id, direction){
    Actions.routePlate({
      rutaId: id,
      routeDirection: direction,
    });
  }
  render(){
    return (
      <View>
        <TouchableOpacity onPress={this.HandleButton.bind(this, this.props.rutaId, "entrada")}>
          <Text>
            Entrada
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.HandleButton.bind(this, this.props.rutaId, "salida")}>
          <Text>
            Salida
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default RouteDirection;
