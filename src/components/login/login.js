import React, {Component} from 'react';
import styles from './styles.js'
import LoginForm from './loginForm'
import {
  View,
  StyleSheet,
  Image,
  Text,
  KeyboardAvoidingView
} from 'react-native';

export default class Login extends Component{

  render(){
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../../imgs/logo-4.png')}
            />
            <Text style={styles.title}>
              Sistemas de transporte de buses
            </Text>
        </View>
        <View style = {styles.formContainer}>
          <LoginForm navigator={this.props.navigator}/>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
