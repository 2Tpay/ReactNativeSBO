import React, {Component} from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity, Text,StatusBar} from 'react-native';
import {login} from "../api/requester"
import {
	Actions,
} from 'react-native-router-flux';
export default class LoginForm extends Component {
  constructor(){
    super();

    this.state ={
      name: "",
      password: "",
      error: ""
    }
  }
navigate(name){
  //this.props.navigator.push({name:name});

}

handleSubmitButton(){
  //login(this.state.name, this.state.password)
  this.props.navigator.push({
		name:'home',
		passProps:{
			title:'Home'
		}
	});
  //Actions.home();
}
  render(){
    return (
      <View style={styles.container}>
        <StatusBar
            barStyle="light-content"
          />
        <TextInput
          placeholder="email"
          placeholderTextColor="rgba(255,255,255,0.7)"
          returnKeyType="next"
          keyboardType="email-address"
          onSubmitEditing={() => this.passwordInput.focus()}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          onChangeText={(text) => this.setState({name: text})}
          />
        <TextInput
          placeholder="Contraseña"
          secureTextEntry
          returnKeyType="go"
          placeholderTextColor="rgba(255,255,255,0.7)"
          style={styles.input}
          ref={(input) => this.passwordInput = input}
          onChangeText={(text) => this.setState({password:text})}
          />
        <TouchableOpacity style={styles.buttonContainer} onPress={this.handleSubmitButton.bind(this)}>
          <Text style={styles.buttonText}>
            LOGIN
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    padding: 20
  },
  input:{
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 15,
    color: '#2c3e50',
    paddingHorizontal: 10,
  },
  buttonContainer:{
    backgroundColor: '#2980b9',
    paddingVertical: 15
  },
  buttonText:{
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700'
  }
})
