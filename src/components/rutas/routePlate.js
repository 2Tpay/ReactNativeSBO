import React from 'react';

import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  AsyncStorage,
  StyleSheet
} from 'react-native';

import {
  Actions
} from 'react-native-router-flux';

class RoutePlate extends React.Component {
  constructor(){
    super();
    this.state = {text: "Escriba el texto"};

    AsyncStorage.getItem("text").then((value) => {
      this.setState({text: value});
    }).done();
  }

  HandleButton(id, direction){
     Actions.routePlate({
      rutaId: id,
      routeDirection: direction,
    });
    console.log("Id " + id);
  }

  saveData(value) {
    AsyncStorage.setItem("text", value);
    this.setState({text: value})
    console.log("Saving..." + this.state.text);
  }

  render(){
    return (
      <View style={styles.container}>
        <Text>
          La ruta - {this.props.rutaId} en dir {this.props.routeDirection}
        </Text>

        <TextInput
          style={styles.formInput}
          placeholder={this.state.text}
          onChangeText={(text) => this.saveData(text)}
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

let styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        justifyContent: "center",
        alignItems: "stretch",
        backgroundColor: "#F5FCFF",
    },
    formInput: {
        borderWidth: 1,
        borderColor: "#B22222",
    },
    saved: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
    }
});

export default RoutePlate;
