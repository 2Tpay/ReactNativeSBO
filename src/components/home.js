import React from 'react';
import styles from '../themes/styles';
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
class Home extends React.Component {
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
							<Button style={styles.btn}>
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
