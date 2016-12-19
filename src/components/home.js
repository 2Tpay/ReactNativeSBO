import React from 'react';
import styles from '../themes/styles';
import {getRoutes, getCardsInformation} from './api/requester';
import {write} from './FileSystem/fileSystem';
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
} from 'native-base'

import {
	Actions,
} from 'react-native-router-flux';


const deviceHeight = Dimensions.get('window').height;
//const background = require('../imgs/shadow.png');
// write the file
class Home extends React.Component {
	getRoutes
	constructor(){
		super();
		this.state ={
			rutas :[]
		}
	}

	handleSyncButton(){
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

	}
	render(){
		return (
			<Container>
				<View style={styles.container}>
					<Content>
						<Image source={require('../imgs/logo-4.png')} style={styles.shadow}></Image>
						<View style={styles.bg}>
							<Text style ={styles.title}>
								Hello
							</Text>
							<Button style={styles.btn} onPress = { () => {
										Actions.rutasView();
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
