
const React = require('react-native');
const { StyleSheet, Dimensions } = React;
const deviceHeight = Dimensions.get('window').height;

//FBFAFA
module.exports = StyleSheet.create({
  formInput: {
      borderWidth: 1,
      color: '#190707',
      borderColor: "#2b3b5e",
      width: 290,
      height: 40,
      top: -30,
      right:-60,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#FBFAFA',
  },
  informationUser: {
    padding: 5,
    margin: 5,
    borderWidth: 1,
    borderColor: '#2b3b5e',
    overflow: 'scroll',
    height: 265

  },
  rowFront: {
		alignItems: 'center',
		backgroundColor: 'white',
		borderBottomColor: 'black',
		borderBottomWidth: 1,
		justifyContent: 'center',
		height: 50,
    flex:1
	},
  backTextWhite: {
		color: '#FFF'
	},
  rowBack: {
		alignItems: 'center',
		backgroundColor: '#DDD',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 15,
	},
  backRightBtn: {
		alignItems: 'center',
		bottom: 0,
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		width: 75
	},
	backRightBtnRight: {
		backgroundColor: 'red',
		right: 0
	},
  text:{
    color:'black',
    marginTop: 10 ,
    paddingLeft:10,
    fontSize: 15
  },
  touchable:{
    marginTop: 20,
    paddingTop:10,
    height: 50,
    backgroundColor: 'steelblue',
    elevation: 5,
    borderRadius: 3,
  },
  touchableText:{
    color: 'white',
    alignSelf:'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  btn:{
    marginTop: 0,
    marginRight: 5,
    width: 100,
    backgroundColor: 'green',
    alignSelf: 'flex-end',
  },
  informationUserText:{
    color:'black',
    margin: 10 ,
    paddingLeft:10,
    fontSize: 15
  }
});
