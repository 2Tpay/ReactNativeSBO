
const React = require('react-native');
const { StyleSheet, Dimensions } = React;
const deviceWidth = Dimensions.get('window').width;


module.exports = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FBFAFA',
  },
  row: {
    alignItems: 'center',
    backgroundColor: '#FBFAFA',
    width: deviceWidth,
    elevation: 5,
  },
  text: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 15,
    alignSelf: 'center',
  },
  mt: {
    marginTop: 15,
  },
  myBusEntrance: {
    flex: 5,
    width: 235,
    height: 50,
    resizeMode: 'contain',
		alignSelf: 'center',
		marginTop: 10,
  },
  rowBuses:{
    alignItems: 'center',
    backgroundColor: '#FBFAFA',
    width: deviceWidth
  }
});
