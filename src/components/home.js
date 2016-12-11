import React from 'react';

import{
	View,
	Text,
	StyleSheet,
	TouchableOpacity
} from 'react-native';
import {
	Actions,
} from 'react-native-router-flux';
class Home extends React.Component {
	render(){
		return (
			<View>
				<Text style ={styles.title}>
					Hello Home
				</Text>
				<TouchableOpacity onPress = { () => {
							Actions.rutas();
					}}
					>
					<Text>
						Rutas
					</Text>
				</TouchableOpacity>
			</View>
		);
	}
}
var styles = StyleSheet.create({
	title:{
		marginTop:20,
		marginLeft:20,
		fontSize:20,
	}
});
export default Home;
