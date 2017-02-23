import React from 'react';

import Home from './components/home/home';
import RutasView from './components/rutas/rutasView';
import RouteDirection from './components/rutas/routeDirection';
import RoutePlate from './components/rutas/routePlate';
import ScanningView from './components/scanner/scanningView';
import Login from "./components/login/login"
import theme from './themes/base-theme';
import {
  Router,
  Scene,
} from 'react-native-router-flux';

import {
  Platform,
  StyleSheet,
  Navigator
} from 'react-native';
import Routing from "./components/navigator.js"
class App extends React.Component {
  render(){
    return (
      <Routing/>
    );
  }
}
let styles = StyleSheet.create({
  scene :{
    paddingTop: Platform.OS ==='ios'? 64: 54,
    justifyContent: 'center',
  },
  navBar: {
    backgroundColor: '#2b3b5e',
    flex: 1,
    elevation: 10,
  },
  navBarTitle:{
    color : "#FFF",
  },
  navBarButton:{
    tintColor:'white'
  }
});
export default App;
