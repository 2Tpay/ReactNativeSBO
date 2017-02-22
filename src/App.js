import React from 'react';

import Home from './components/home';
import RutasView from './components/rutas/rutasView';
import RouteDirection from './components/rutas/routeDirection';
import RoutePlate from './components/rutas/routePlate';
import ScanningView from './components/scanner/scanningView';
import theme from './themes/base-theme';
import {
  Router,
  Scene,
} from 'react-native-router-flux';

import {
  Platform,
  StyleSheet,
} from 'react-native';

class App extends React.Component {
  render(){
    return (
      <Router>
        <Scene key='root' theme={theme} barButtonIconStyle={styles.navBarButton} titleStyle={styles.navBarTitle} navigationBarStyle={styles.navBar} style = {styles.scene}>
          <Scene key='home' component={Home} title='Home' />
          <Scene key='rutasView' component={RutasView} title='Rutas' />
          <Scene key='routeDirection' component={RouteDirection} title='Detalles de Ruta' />
          <Scene key='routePlate' component={RoutePlate} title='Ingreso de placa' />
          <Scene key='scanningView' component={ScanningView} title='Escáner' />
          {/* <Scene key='scanningView' component={ScanningView} title='Escáner' /> */}
        </Scene>
      </Router>
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
