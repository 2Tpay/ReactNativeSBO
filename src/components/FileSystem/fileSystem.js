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
    alert('PROBLEMA AL ESCRIBIR ARCHIVO');
  });
}

export function exist(name){
  return RNFS.exists(my_path+'/'+name)
  .then(response => { return response })
  .catch(error => {alert('ERRRO AL VERIFICAR PATH')});
}

export function unlink(name){
  RNFS.unlink(my_path+'/'+name)
  .then(response => {console.log('BORRADO');})
  .catch(error => {alert('ERRRO AL BORRAR PATH')});
}

export function mkdir(name){
  return RNFS.mkdir(my_path+'/'+name)
  .then(success => {console.log('Creado exitosamente'); return true;})
  .catch(error => {alert(`ERROR AL CREAR CARPETA\n${error}`)});
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

export function readDir(name){
  return RNFS.readDir(my_path+'/'+name)
  .then(response => {return response;})
  .catch(error => {alert('ERROR AL LEER CARPETA TRIPS')});
}
