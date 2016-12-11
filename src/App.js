import React from 'react';

import Home from './components/home';
import RutasView from './components/rutas/rutasView';
import RutaInformation from './components/rutas/rutaInformation';
import {
  Router,
  Scene,
} from 'react-native-router-flux';

import {
  Platform
} from 'react-native';

class App extends React.Component {
  render(){
    return (
      <Router>
        <Scene key='root' style = {{paddingTop: Platform.OS ==='ios'? 64: 54}}>
          <Scene key='home' component={Home} title='Home' />
          <Scene key='rutasView' component={RutasView} title='Rutas' />
          <Scene key='rutaInformation' component={RutaInformation} title='Informacion de Ruta' />
        </Scene>
      </Router>
    );
  }
}

export default App;
