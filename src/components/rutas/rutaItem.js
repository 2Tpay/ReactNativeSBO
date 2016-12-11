import React from 'react';

import {
  Text,
  TouchableOpacity
}from 'react-native';

class RutaItem extends React.Component {
  render(){
    return (
      <TouchableOpacity>
        <Text>
          {this.props.ruta.nombre}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default RutaItem;
