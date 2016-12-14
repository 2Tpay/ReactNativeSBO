import React from 'react';
import Rutas from './rutas';
import styles from '../../themes/styles';
import mystyles from './styles';
import{
	View,
	Text,
} from 'react-native';

import {
	Container,
	Content,
} from 'native-base'

class RutasView extends React.Component {
	constructor(){
		super();
		this.state ={
			rutas :[]
		}
	}

	componentWillMount(){
		this.setState({rutas: [
				{
				id: '0',
				nombre: 'ruta 1'
				},
				{
				id: '1',
				nombre: 'ruta 2'
				},
				{
				id: '2',
				nombre: 'ruta 3'
				}
		]});
	}
	render(){
		return (
			<Container style={mystyles.container}>
					<View>
						<Text style={styles.title}>
							Mis rutas
						</Text>
						<Rutas rutas={this.state.rutas}/>
					</View>
			</Container>
		);
	}
}

export default RutasView;
