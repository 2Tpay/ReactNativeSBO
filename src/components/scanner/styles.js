
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
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FBFAFA',
  },
  informationUser: {
    padding: 5,
    margin: 5,
    borderWidth: 1,
    borderColor: '#2b3b5e',
  },
  text:{
    color:'black',
    marginTop: 10 ,
    paddingLeft:10,
    fontSize: 15
  },
  touchable:{
    bottom:0,
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
