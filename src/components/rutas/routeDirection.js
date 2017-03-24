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
  Container,
  Header,
  Title,
  Button
} from 'native-base';
import {
  Actions
} from 'react-native-router-flux';
import { Row, Grid } from "react-native-easy-grid";
const deviceWidth = Dimensions.get('window').width;
class RouteDirection extends React.Component {
  constructor(props){
    super(props)
  }
  HandleButton(id, direction, name){
    this.props.navigator.push({
      name: 'routePlate',
      passProps:{
        rutaId: id,
        routeDirection: direction,
        routeName:name,
      }
    });
  }
  render(){
    return (
      <Container>
        <Header style={styles.navBar}>
					<Title style={styles.navBarTitle}>{'Dirección'}</Title>
				</Header>
        <View style={[{alignItems:'center'},mystyles.container]}>
          <Grid>
            <Row style={mystyles.rowBuses}>
              <TouchableOpacity style={{width: deviceWidth}} onPress={this.HandleButton.bind(this, this.props.rutaId, "entrada",this.props.routeName )}>
                <Image source={require('../../imgs/bus_entrance.png')} style={mystyles.myBusEntrance}></Image>
                <Text style={mystyles.text}>
                  Entrada
                </Text>
              </TouchableOpacity>
            </Row>
            <Row style={mystyles.rowBuses}>
              <TouchableOpacity style={{width: deviceWidth}} onPress={this.HandleButton.bind(this, this.props.rutaId, "salida", this.props.routeName)}>
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
