import React from 'react';
import {searchUser} from '../api/requester';
import {
  View,
  Alert,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  AsyncStorage,
  DeviceEventEmitter,
  ListView,
  TouchableOpacity,
} from 'react-native';
import Hr from 'react-native-hr';

import {
  Container,
  Button,
  Header,
  Title
} from 'native-base';
import {
	Actions,
} from 'react-native-router-flux';

import { read, write, exist, mkdir } from '../FileSystem/fileSystem';
import { getTagId } from 'nfc-react-native';
const Sound = require('react-native-sound');

// const requireAudio = require('./button_beep_tone.mp3');

// import { Sound } from 'react-native-sound';

import globalStyles from '../../themes/styles'
import styles from './styles';
import { SwipeListView,SwipeRow } from 'react-native-swipe-list-view';
class ScanningView extends React.Component {
  constructor(){
    super();
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      counter : 0,
      clientes: [],
      listViewData: [],
      tripClients: []
    };
  }

  deleteRow(secId, rowId, rowMap) {
		rowMap[`${secId}${rowId}`].closeRow();
		let newData = [...this.state.listViewData];
		newData.splice(rowId, 1);
    this.state.tripClients.splice(rowId, 1);
		this.setState({
      counter: this.state.counter-1,
      clientes: this.state.clientes,
      listViewData: newData,
      tripClients: this.state.tripClients
    });
  }

  playClientDetectedSound () {
    const s = new Sound('button_beep_tone.mp3', Sound.MAIN_BUNDLE, (e) => {
      if (e) {
        console.log('error', e);
      } else {
        s.setSpeed(1);
        s.play(() => s.release()); // Release when it's done so we're not using up resources
      }
    });
  };

  playClientAlreadyExistsSound () {
    const s = new Sound('beep_tone.mp3', Sound.MAIN_BUNDLE, (e) => {
      if (e) {
        console.log('error', e);
      } else {
        s.setSpeed(1);
        s.play(() => s.release()); // Release when it's done so we're not using up resources
      }
    });
  };

  writeTripsFile(){
    let jsonTransaction = {
      idRuta: this.props.routeId,
      fecha: new Date().getTime(),
      busPlaca: this.props.busPlate,
      tipoMovimiento: this.props.routeDirection,
      transacciones: this.state.tripClients
    };

    exist('trips')
    .then(response =>{
      if(!response) {
        mkdir('trips')
        .then(response => {
          if(response){
              write(`trips/${new Date().getTime()}.txt`, JSON.stringify(jsonTransaction));
          }
        });
      }else{
          write(`trips/${new Date().getTime()}.txt`, JSON.stringify(jsonTransaction));
      }
    })
    .catch(error => {console.log(error);});
  }

  handleFinishButton(){
    this.writeTripsFile();
    this.props.navigator.popN(4);
  }

  componentDidMount() {
  		read('cardsInformation.txt')
  		.then((success)=>{
  			this.setState({
          counter: this.state.counter,
          clientes: success,
          listViewData: this.state.listViewData,
          tripClients: this.state.tripClients
        });
  		}).catch(error =>{alert(`Error al cargar info de clientes \n${error.message}`)});

      //NFC events
      DeviceEventEmitter.addListener('onTagError', function (e) {
          console.log('error', e)
      });

      DeviceEventEmitter.addListener('onTagDetected', (e) => {
          let cardId = e.id;
          let traveller = this.searchClientByCardId(cardId);
          if(!this.clientAlreadyAdded(cardId)){
            this.playClientDetectedSound();
          } else {
            this.playClientAlreadyExistsSound();
          }
          this.addPassenger(cardId, traveller);
          // Alert.alert("Isaula: " + cardId);
      });
  }

  clientAlreadyAdded(cardId){
    return this.state.tripClients.includes(cardId);
  }

  searchClientByCardId(cardId){
    let clientFound;
    if(this.state.clientes.length > 0)
    {
      let clientFoundArray = this.state.clientes.filter( client => client.id_tarjeta == cardId);

      if(clientFoundArray.length > 0){
        return clientFoundArray[0];
      }
    }

    return 'undefined';
  }

  addPassenger(cardId, passenger){
    let newData = this.state.listViewData;
    let newPassenger = passenger !== 'undefined' ? passenger.nombres : cardId;
    newData.unshift(newPassenger);
    this.state.tripClients.unshift(cardId);
    this.setState({
      counter: this.state.counter+1,
      clientes: this.state.clientes,
      listViewData: newData,
      tripClients: this.state.tripClients
    });
  }

  render(){
    return (
        <View style={styles.container}>
          <Header style={globalStyles.navBar}>
  					<Button transparent onPress={() => this.props.reset(this.props.navigation.key)}>
  						<Text style={{fontWeight:'800', color:'#FFF'}}>{'Salir'}</Text>
  					</Button>
  					<Title style={globalStyles.navBarTitle}>{'Escaner'}</Title>
  				</Header>
            <Text style={globalStyles.title}>Ingreso de pasajeros</Text>
            <Text style={styles.text}>Bus de {this.props.routeName} en dirección {this.props.routeDirection} {this.props.routeDirection=="entrada"?'al':'del'} templo</Text>
            <Text style={styles.text}>
              Num. Pasajeros: {this.state.counter}
            </Text>
          <Hr lineColor='#b3b3b3' text='Pasajeros' />

            <View style={styles.informationUser}>
      					<SwipeListView
                  swipeRowStyle={{flex: 1}}
                  enableEmptySections={true}
      						dataSource={this.ds.cloneWithRows(this.state.listViewData)}
      						renderRow={ data => (
      							<TouchableHighlight
      								style={styles.rowFront}
      							>
      								<View>
      									<Text>{data}</Text>
      								</View>
      							</TouchableHighlight>
      						)}
      						renderHiddenRow={ (data, secId, rowId, rowMap) => (
      							<View style={styles.rowBack}>
      								<TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={ _ => this.deleteRow(secId, rowId, rowMap) }>
      									<Text style={styles.backTextWhite}>Delete</Text>
      								</TouchableOpacity>
      							</View>
      						)}
      						rightOpenValue={-75}
      					/>
            </View>
            <TouchableHighlight style={styles.touchable} onPress={this.handleFinishButton.bind(this)}>
              <Text style={styles.touchableText}>Terminar</Text>
            </TouchableHighlight>
        </View>
    );
  }
}
// this.HandleButton.bind(this)
export default ScanningView;
