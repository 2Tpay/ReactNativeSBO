import {
  StyleSheet
} from 'react-native';

module.exports = StyleSheet.create({
	title:{
		marginTop:20,
		marginLeft:20,
		fontSize:20,
    color: '#2b3b5e',
    textShadowColor: '#000000',
	},
	container: {
    position: 'absolute',
		justifyContent: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FBFAFA',
  },
  shadow: {
    flex: 1,
    width: 100,
    height: 100,
		alignSelf: 'center',
		marginTop: 10,
  },
  bg: {
    flex: 1,
    paddingTop: 10,
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
		elevation: 5,
		width: 200,
		backgroundColor: '#2b3b5e',
		borderRadius: 5,
  },
});
