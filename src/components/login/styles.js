const React = require('react-native');
const { StyleSheet} = React;
module.exports = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor : '#084B8A'
  },
  logoContainer:{
    alignItems:'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  logo:{
    width: 125,
    height: 125
  },
  title:{
    color: '#FFF',
    marginTop: 10,
    width: 140,
    textAlign:'center',
    opacity: 0.9
  }
});
