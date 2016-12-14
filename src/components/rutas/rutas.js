import React from 'react';
import RutaItem from './rutaItem';

import {
  Text,
  View
}from 'react-native';
import
{
  Content
} from 'native-base';

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
      <Content>
        <View style ={{paddingTop: 10, alignItems: 'center'}}>
          {rutaItems}
        </View>
      </Content>
    );
  }
}

export default Rutas;
