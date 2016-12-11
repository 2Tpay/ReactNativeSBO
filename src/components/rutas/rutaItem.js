import React from 'react';

import {
  Text,
  TouchableOpacity
}from 'react-native';

import {
	Actions,
} from 'react-native-router-flux';

class RutaItem extends React.Component {
  HandleButton(id){
    Actions.routeDirection({
      rutaId: id,
    });
  }
  render(){
    return (
      <TouchableOpacity onPress={this.HandleButton.bind(this, this.props.ruta.id)}>
        <Text>
          {this.props.ruta.nombre}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default RutaItem;
