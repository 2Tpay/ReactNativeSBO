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
	Image,
	ActivityIndicator,
	NetInfo
} from 'react-native';

import {
	Button,
	Content,
	Container,
	Icon,
	Header,
	Title,
	Left,
	Body,
	Right
} from 'native-base'

import {
	Actions,
} from 'react-native-router-flux';

const deviceHeight = Dimensions.get('window').height;
//const background = require('../imgs/shadow.png');
// write the file
let RNFS = require('react-native-fs')

class Home extends React.Component {

	constructor(){
		super();
		this.state ={
			rutas :[],
			isLoading: false,
			isConnected: false
		}

		this.navigate = this.navigate.bind(this);
	}

	setIsConnected(isConnected){
		this.setState(
			{
				rutas :this.state.rutas,
				isLoading: this.state.isLoading,
				isConnected: isConnected
			}
		)
		//this.state.isConnected = isConnected;
		//console.log("is conected "+isConnected);
		if(!isConnected){
			alert("Se ha perdido la conexión del internet.");
		}
	}

	componentWillMount() {
		const dispatchConnected = isConnected => (this.setIsConnected(isConnected));

	  NetInfo.isConnected.fetch().then(
			isConnected => {
				this.setState(
					{
						rutas :[],
						isLoading: false,
						isConnected: isConnected
					}
				)
			}
		 ).done(() => {
	    NetInfo.isConnected.addEventListener('change', dispatchConnected);
	  });
	}

	navigate(name){
		this.props.navigator.push({name})
	}

	handleSyncButton(){
		if(!this.state.isConnected){
			alert("No se está conectado al internet; por lo tanto, no puede sincronizar los datos.");
			return;
		}

		/*------------GETING--------------*/
		this.state.isLoading = true;
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
			write('cardsInformation.txt',JSON.stringify(passengers.getWithClient));
		})
		.catch(error => {alert(`ERROR AL SYNC TARJETAS \n${error}`)});

		/*-----------POSTING------------*/

		exist('trips')
		.then((res) =>{
			if(res===true){
				readDir('trips')
				.then(files =>{
					files.forEach((file) =>{
						//unlink(file.name);
						read('trips/'+file.name)
						.then((trip)=>{
							  postTransaction(trip.idRuta, trip.fecha, trip.busPlaca, trip.tipoMovimiento, trip.transacciones)
								.then((response) => {
									alert("Enviando transacciones de un viaje.");
									unlink('trips/'+file.name);
								})
								.catch(error => {alert(`Error al postear viaje ${file.name}\n${error}`)})
						});
					});
					//unlink('trips');
				})
				.catch(error => {alert(error);});
			}
			alert("Se han actualizado los datos de rutas, clientes, y subido los viajes pendientes.");
		});
		//console.log(RNFS.ExternalStorageDirectoryPath);
		//console.log(RNFS.ExternalDirectoryPath);

		//unlink('trips');

		this.state.isLoading = false;
	}


	render(){
		let spinner = this.state.isLoading ?
    ( <ActivityIndicator
        size='large'/> ) :
    ( <View/>);
		let style_bar;
		if(this.state.isConnected){
			style_bar = {
				backgroundColor:'green',
				alignItems:'center'
			};
		}else{
			style_bar = {
				backgroundColor:'red',
				alignItems:'center'
			};
		}
		return (
			<Container>
				<Header style={styles.navBar}>
					<Button transparent onPress={() => this.props.logout()}>
						<Text style={{fontWeight:'800', color:'#FFF'}}>{'Salir'}</Text>
					</Button>
					<Title style={styles.navBarTitle}>{'Home'}</Title>
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
							<Button disabled={this.state.isLoading} style={styles.btn} onPress = {this.handleSyncButton.bind(this)}>
								Sync
							</Button>

						</View>
					</Content>
						<View style={style_bar }><Text style={styles.text}>{this.state.isConnected?'Online':'Offline'}</Text></View>
						{ spinner }
				</View>
			</Container>
		);
	}
}
export default Home;
