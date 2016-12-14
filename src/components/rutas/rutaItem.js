import React from 'react';
import styles from './styles'
import {
  Text,
  TouchableOpacity
}from 'react-native';

import {
	Actions,
} from 'react-native-router-flux';

import {
  Grid,
  Row,
} from "react-native-easy-grid";

class RutaItem extends React.Component {
  HandleButton(id){
    Actions.routeDirection({
      rutaId: id,
    });
  }
  render(){
    return (
      <Grid style={styles.mt}>
        <Row key ={this.props.ruta.id}>
          <TouchableOpacity style={styles.row} onPress={this.HandleButton.bind(this, this.props.ruta.id)}>
            <Text style={styles.text}>
              {this.props.ruta.nombre}
            </Text>
          </TouchableOpacity>
      </Row>
    </Grid>
    );
  }
}

export default RutaItem;
