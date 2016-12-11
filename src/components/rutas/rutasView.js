import React from 'react';
import Rutas from './rutas';
import{
	View,
	Text,
} from 'react-native';

class RutasView extends React.Component {
	constructor(){
		super();
		this.state ={
			rutas :[
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
			]
		}
	}

	render(){
		return (
			<View>
				<Text>
					Mis rutas
				</Text>
				<Rutas rutas={this.state.rutas}/>
			</View>
		);
	}
}

export default RutasView;
