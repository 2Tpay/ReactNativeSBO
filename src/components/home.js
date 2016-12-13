import React from 'react';

import{
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
	Button
} from 'react-native';
import {
	Actions,
} from 'react-native-router-flux';

const deviceHeight = Dimensions.get('window').height;

class Home extends React.Component {
	render(){
		return (
			<View theme={this.props.theme} style={styles.container}>
				<Text style ={styles.title}>
					Hello Home
				</Text>
				<TouchableOpacity onPress = { () => {
							Actions.rutasView();
					}}
					>
					<Text style={styles.btn}>
						Cargar Rutas
					</Text>
				</TouchableOpacity>
			<TouchableOpacity style={styles.btn}>
				<Text>	Sync </Text>
			</TouchableOpacity>
			</View>
		);
	}
}

let styles = StyleSheet.create({
	title:{
		marginTop:20,
		marginLeft:20,
		fontSize:20,
	},
	container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FBFAFA',
  },
  shadow: {
    flex: 1,
    width: null,
    height: null,
  },
  bg: {
    flex: 1,
    marginTop: deviceHeight / 1.75,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 30,
    bottom: 0,
  },
  input: {
    marginBottom: 20,
  },
  btn: {
    marginTop: 20,
    alignSelf: 'center',
  },
});
export default Home;
