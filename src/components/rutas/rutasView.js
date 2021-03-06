import React from 'react';
import Rutas from './rutas';
import styles from '../../themes/styles';
import mystyles from './styles';
import {read} from '../FileSystem/fileSystem';
import{
	View,
	Text,
} from 'react-native';

import {
	Container,
	Content,
	Button,
	Header,
	Title
} from 'native-base'
var RNFS = require('react-native-fs');

// create a path you want to write to
var path = RNFS.ExternalDirectoryPath + '/luiscarlos.txt';
class RutasView extends React.Component {
	constructor(){
		super();
		this.state ={
			rutas :[]
		}
	}

	componentWillMount(){
		read('routes.txt')
		.then((success)=>{
			this.setState({rutas: success});
			//console.log(success);
		}).catch(error =>{alert(`Error al cargar rutas \n${error.message}`)});
	}

	render(){
		return (
			<Container>
				<Header style={styles.navBar}>
					<Button transparent onPress={() => this.props.reset(this.props.navigation.key)}>
						<Text style={{fontWeight:'800', color:'#FFF'}}>{'Salir'}</Text>
					</Button>
					<Title style={styles.navBarTitle}>{'Rutas'}</Title>
				</Header>
					<View style={mystyles.container}>
						<Text style={styles.title}>
							Mis rutas
						</Text>
						<Rutas navigator={this.props.navigator} rutas={this.state.rutas}/>
					</View>

			</Container>
		);
	}
}

export default RutasView;
