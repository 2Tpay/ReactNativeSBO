// require the module
var RNFS = require('react-native-fs');

// create a path you want to write to
var my_path = RNFS.ExternalDirectoryPath;

export function write(name, content){
  RNFS.writeFile(my_path+'/'+name, content, 'utf8')
    .then((success) => {
      console.log('FILE WRITTEN!');
    })
    .catch((err) => {
      console.log(err.message);
    });
}

export function read(name){
  return RNFS.readFile(my_path+'/'+name, 'utf8')
  .then((response) => {
    return JSON.parse(response);
  })
  .catch((err) => {
    console.log(err.message);
  });
}
