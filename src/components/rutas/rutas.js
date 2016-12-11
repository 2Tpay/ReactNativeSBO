import React from 'react';
import RutaItem from './rutaItem';

import {
  Text,
  View
}from 'react-native';

class Rutas extends React.Component {
  render(){
    let rutaItems;
    if(this.props.rutas){
      rutaItems = this.props.rutas.map(ruta =>{
        return (
          <RutaItem key={ruta.id} ruta={ruta} />
        );
      });
    }
    return (
      <View>
        {rutaItems}
      </View>
    );
  }
}

export default Rutas;
