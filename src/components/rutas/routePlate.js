import React from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  AsyncStorage,
  StyleSheet,
  Image
} from 'react-native';

import {
  Actions
} from 'react-native-router-flux';
import globalStyles from '../../themes/styles';
import {
  Container,
  Button
} from 'native-base';
//import ScanningView from '../scanner/scanningView';

class RoutePlate extends React.Component {
  constructor(){
    super();
    this.state = {
      busPlate: "",
      text: "Escriba número de placa"
    };

    //AsyncStorage.getItem("text").then((value) => {
      // this.setState({text: value});
    // }).done();
  }

  HandleButton(){
     Actions.scanningView({
      routeId: this.props.rutaId,
      routeDirection: this.props.routeDirection,
      busPlate: this.state.busPlate,
      routeName: this.props.routeName
    });
    // Actions.pop({popNum: 2});
  }

  saveData(value) {
    AsyncStorage.setItem("text", value);
    this.setState({busPlate: value})
    console.log("Saving..." + this.state.text);
  }

  render(){
    return (
      <Container style={styles.container}>
        <View style={styles.title}>
          <Text style={globalStyles.title}>Casi listos</Text>
        </View>
        <View style={styles.imgBackground}>
          <Text style={styles.informationTitle}>Información de ruta</Text>
          <Image source ={require('../../imgs/bus_information2.png')} style={styles.img}></Image>
          <View style={styles.informationText}>
            <Text style={styles.text}>
              ID de ruta: {this.props.rutaId}
            </Text>
            <Text style={styles.text}>
              Nombre: {this.props.routeName}
            </Text>
            <Text style={styles.text}>
              En dirección: {this.props.routeDirection}
            </Text>
          </View>
        </View>
        <View>
          <TextInput
            style={styles.formInput}
            returnKeyType="next"
            placeholder={this.state.text}
            onChangeText={(text) => this.saveData(text)}
            onSubmitEditing={this.HandleButton.bind(this)}
          />


        <Button style={styles.btn} onPress={this.HandleButton.bind(this)}>
          Continuar
        </Button>
        </View>
      </Container>
    );
  }
}

let styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        alignItems: "stretch",
        backgroundColor: "#F5FCFF",
    },
    title:{
      marginBottom: 10,
    },
    informationTitle:{
      alignSelf: 'center',
      color:'white',
      margin: 10,
      fontWeight: 'bold',
      fontSize: 15
    },
    informationText:{
      alignItems: 'flex-start',
      zIndex: 2,
      marginTop: 28,
      top: 10,
      right:10,
      position:'absolute'
    },
    imgBackground:{
      backgroundColor: '#2b3b5e',
      borderColor: '#2b3b5e',
      borderRadius: 5,
      borderWidth: 5,
      marginBottom: 20,
      height :183,
      zIndex: 0,
    },
    formInput: {
        borderWidth: 1,
        fontWeight: 'bold',
        color: '#190707',
        borderColor: "#2b3b5e",
    },
    text:{
      color:'white',
      margin: 10,
      fontSize: 15
    },
    img:{
      flex: 1,
      width: 100,
      height: 40,
      resizeMode: 'contain',
  		alignSelf: 'flex-start',
      marginLeft: 30,
      zIndex: 1,
      top: -5
    },
    btn:{
      marginTop: 10,
      marginRight: 5,
      width: 100,
      backgroundColor: 'green',
      alignSelf: 'flex-end',
    }
});

export default RoutePlate;
