import React, {Component} from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity, Text, ActivityIndicator, StatusBar} from 'react-native';
import {login, setAccessToken} from "../api/requester"
import {
	Actions,
} from 'react-native-router-flux';
export default class LoginForm extends Component {
  constructor(){
    super();

    this.state ={
      name: "",
      password: "",
      errors: "",
			isLoading: false
    }
  }

	handleSubmitButton(){
		// this.isLoading = true;
		this.setState({
			name: this.state.name,
			password: this.state.password,
			errors: this.state.errors,
			isLoading: true
		});
		if(this.state.name != ""){
			if(this.state.password != ""){
				login(this.state.name, this.state.password)
				.then((response) => {
					if(response.id){
						setAccessToken(response.id);
						this.setState({name: '', password: '', errors: ''});
						this.props.navigator.push({name:'home'});
						this.setState({errors:"", isLoading: false})
					}else
						this.setState({errors:response, isLoading: false})
				})
				.catch((error) => {this.setState({errors:error.message, isLoading: false}); alert(error.message);})
			}else{
					this.setState({errors:"Contraseña no puede estar vacio", isLoading: false})
			}
		}else{
			this.setState({errors:"Email no puede estar vacio", isLoading: false})
		}
	}

	render(){
		let spinner = this.state.isLoading ?
    ( <ActivityIndicator
        size='large'/> ) :
    ( <View/>);

    return (
      <View style={styles.container}>
        <StatusBar
            barStyle="light-content"
          />
				<Text style={styles.errorLabel}>{this.state.errors ? this.state.errors : ""}</Text>
        <TextInput
					ref={'emailTxt'}
          placeholder="email"
          placeholderTextColor="rgba(255,255,255,0.7)"
          returnKeyType="next"
          keyboardType="email-address"
					value={this.state.name}
          onSubmitEditing={() => this.passwordInput.focus()}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          onChangeText={(text) => this.setState({name: text})}
          />
        <TextInput
					ref={'passTxt'}
          placeholder="Contraseña"
          secureTextEntry
          returnKeyType="go"
					value={this.state.password}
          placeholderTextColor="rgba(255,255,255,0.7)"
          style={styles.input}
          ref={(input) => this.passwordInput = input}
          onChangeText={(text) => this.setState({password:text})}

          />
				<TouchableOpacity disabled={this.state.isLoading} style={styles.buttonContainer} onPress={this.handleSubmitButton.bind(this)}>
          <Text style={styles.buttonText}>
            LOGIN
          </Text>
        </TouchableOpacity>

			{ spinner }
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
    color: '#FFF',
    paddingHorizontal: 10,
  },
	errorLabel:{
		color:'red'
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
