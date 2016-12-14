import React from 'react';

import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image
} from 'react-native';
import styles from '../../themes/styles';
import mystyles from './styles';
import{
  Container
} from 'native-base';
import {
  Actions
} from 'react-native-router-flux';
import { Row, Grid } from "react-native-easy-grid";
const deviceWidth = Dimensions.get('window').width;
class RouteDirection extends React.Component {
  HandleButton(id, direction){
    Actions.routePlate({
      rutaId: id,
      routeDirection: direction,
    });
  }
  render(){
    return (
      <Container style={mystyles.container}>
        <View style={{alignItems:'center'}}>
          <Grid>
            <Row style={mystyles.rowBuses}>
              <TouchableOpacity style={{width: deviceWidth}} onPress={this.HandleButton.bind(this, this.props.rutaId, "entrada")}>
                <Image source={require('../../imgs/bus_entrance.png')} style={mystyles.myBusEntrance}></Image>
                <Text style={mystyles.text}>
                  Entrada
                </Text>
              </TouchableOpacity>
            </Row>
            <Row style={mystyles.rowBuses}>
              <TouchableOpacity style={{width: deviceWidth}} onPress={this.HandleButton.bind(this, this.props.rutaId, "salida")}>
                <Image source={require('../../imgs/bus_exit2.png')} style={mystyles.myBusEntrance}></Image>
                <Text style={mystyles.text}>
                  Salida
                </Text>
              </TouchableOpacity>
            </Row>
          </Grid>
        </View>
      </Container>
    );
  }
}

export default RouteDirection;
