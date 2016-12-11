import React from 'react';

import Home from './components/home';
import Rutas from './components/rutas';

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
          <Scene key='rutas' component={Rutas} title='Rutas' />
        </Scene>
      </Router>
    );
  }
}

export default App;
