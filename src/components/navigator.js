import {
  Navigator,
  BackAndroid,
  Text
} from 'react-native'
import React, {Component} from 'react';
import Home from './home/home';
import RutasView from './rutas/rutasView';
import RouteDirection from './rutas/routeDirection';
import RoutePlate from './rutas/routePlate';
import ScanningView from './scanner/scanningView';
import Login from "./login/login"
import {logout} from "./api/requester"

export default class Routing extends Component {
  constructor(){
    super()
    this.state={
      title:'Login'
    }
  }
  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.navigator) {
        let current= this.navigator.getCurrentRoutes()[this.navigator.getCurrentRoutes().length-1].name
        if(current !=='home'){
          this.navigator.pop();
          return true;
        }
      }
      return false;
    });
  }
  logoutUser(){
    /*logout()
    .then((response) => {
      console.log(response);
    }).catch( (error) => {console.log(error.message)})*/
    console.log("LOG OUT");
  }
  renderScene(route, navigator){
    switch (route.name) {
      case 'login':
        return <Login navigator={navigator} {...route.passProps}/>
      case 'home':
        return <Home navigator={navigator} logout={this.logoutUser} {...route.passProps}/>
      case 'rutasView':
        return <RutasView navigator={navigator} {...route.passProps} />
      case 'routeDirection':
        return <RouteDirection navigator={navigator} {...route.passProps}/>
      case 'routePlate':
        return <RoutePlate navigator={navigator} {...route.passProps}/>
      case 'scanningView':
        return <ScanningView navigator={navigator} {...route.passProps}/>
      default:

    }
  }
  render(){
    return (
      <Navigator
        ref={(nav) => {this.navigator =nav}}
        initialRoute = {{name: 'login'}}
        renderScene = {this.renderScene.bind(this)}
      />
    );
  }
}
