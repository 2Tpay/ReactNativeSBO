import React from 'react';
import styles from '../../themes/styles';
import {getRoutes, getCardsInformation, postTransaction} from '../api/requester';
import {write, readDir, unlink, exist, mkdir, read} from '../FileSystem/fileSystem';
import{
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
	Image
} from 'react-native';

import {
	Button,
	Content,
	Container,
	Icon,
	Header,
	Title
} from 'native-base'

import {
	Actions,
} from 'react-native-router-flux';


const deviceHeight = Dimensions.get('window').height;
//const background = require('../imgs/shadow.png');
// write the file
var RNFS = require('react-native-fs')
class Home extends React.Component {
	getRoutes
	constructor(){
		super();
		this.state ={
			rutas :[]
		}

		this.navigate = this.navigate.bind(this)
	}

	navigate(name){
		this.props.navigator.push({name})
	}

	handleSyncButton(){
		/*------------GETING--------------*/

		let routes =[];
		getRoutes().then(res => {
			routes = res;
			for(let i=0; i< routes.length; i++){
				delete routes[i].descripcion;
			}
			write('routes.txt',JSON.stringify(routes));
		})
		.catch(error => {alert(`ERROR AL SYNC RUTAS\n${error}`)});

		let passengers = [];
		getCardsInformation().then(res => {
			passengers= res;
			//console.log("aquiii");
			//console.log(passengers.getWithClient);
			write('cardsInformation.txt',JSON.stringify(passengers.getWithClient));
		})
		.catch(error => {alert(`ERROR AL SYNC TARJETAS \n${error}`)});
		

		/*-----------POSTING------------*/

		/*let jsonTransaction = {
      routeId: 1,
      routeDirection: 'Entrada',
      busPlate: 'NADA',
      routeName: 'No nos importa',
      date: new Date().getTime(),
      state: 'available',
      passengers:[
        {
          idTarjeta: "62b2fdfc"
        },
        {
          idTarjeta: "62b2fdfc"
        },
        {
          idTarjeta: "62b2fdfc"
        }
    ]
    };
    exist('trips')
    .then(response =>{
      console.log(`exist: ${response}`);
      if(response ===false){
        mkdir('trips')
        .then(response => {
          if(response ===true){
              write(`trips/${new Date().getTime()}.txt`, JSON.stringify(jsonTransaction));
              //alert('creado');
              //Actions.pop({popNum: 3});
          }
        });
      }else{
          write(`trips/${new Date().getTime()}.txt`, JSON.stringify(jsonTransaction));
          //alert('creado');
          //Actions.pop({popNum: 3});
      }
    })
    .catch(error => {console.log(error);});
*/
		exist('trips')
		.then((res) =>{
			if(res===true){
				readDir('trips')
				.then(files =>{
					files.forEach((file) =>{
						//unlink(file.name);
						console.log(file.name);
						read('trips/'+file.name)
						.then((trip)=>{
							if(trip.state==='available'){

								postTransaction(trip.routeId, trip.date,trip.busPlate, trip.routeDirection,trip.passengers)
								.then((response) => {unlink('trips/'+file.name);})
								.catch(error => {alert(`Error al postear viaje ${file.name}\n${error}`)})
							}

						});
					});
					//unlink('trips');
				})
				.catch(error => {console.log(error);});
			}
			alert("	SYNCRONIZACION EXITOSA");
		});
		//console.log(RNFS.ExternalStorageDirectoryPath);
		//console.log(RNFS.ExternalDirectoryPath);

		//unlink('trips');
	}
	handleLogout(){
		console.log("LOGEO");
	}
	render(){
		return (
			<Container>
				<Header style={styles.navBar}>
					<Button transparent onPress={this.handleLogout.bind(this)}>
						<Text style={{fontWeight:'800', color:'#FFF'}}>{'Salir'}</Text>
					</Button>
					<Title style={styles.navBarTitle}>{'Homes'}</Title>
				</Header>
				<View style={styles.container}>
					<Content>
						<Image source={require('../../imgs/logo-4.png')} style={styles.shadow}></Image>
						<View style={styles.bg}>
							<Button style={styles.btn} onPress = { () => {
										this.props.navigator.push({name: 'rutasView'})
								}}
								>
									Cargar Rutas
							</Button>
							<Button style={styles.btn} onPress = {this.handleSyncButton.bind(this)}>
								Sync
							</Button>
						</View>
					</Content>
				</View>
		</Container>
		);
	}
}
export default Home;
