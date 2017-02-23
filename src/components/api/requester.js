import Ajax from 'ajax-promise-es6';

var my_path = 'http://bce1481b.ngrok.io/';

export function searchUser(user){
  /*return fetch(`https://api.github.com/users/${user}`)
.then((response) => response.json())
.then((response) => {
  const returnvalue = response.name ? response : [];
  return returnvalue;
})
.catch((error) => { console.log(error); });*/
return user
}

export function getRoutes(){
  return fetch(`${my_path}api/Rutas`, {
  method: 'GET',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
})
.then((response) => {return response.json()})
.catch((error) => {console.log(error);});
}

export function getCardsInformation(){
  return fetch(`${my_path}api/Tarjetas/getWithClient`, {
    method:'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
  .then((response) => {return response.json()})
  .catch((error) => {console.log(error);});
}

export function postTransaction(routeId, date,routePlate, routeDirection, passengers){
    let array = [];
    passengers.forEach((passenger) =>{
      array.push(passenger.idTarjeta);
    });
    let params = {
      idRuta: routeId,
      fecha: new Date(date).toISOString(),
      busPlaca: routePlate,
      tipoMovimiento: routeDirection,
      busConductor: 'nada',
      transacciones: array
    }
    //console.log("aqui=>", params);
    //console.log(JSON.stringify(params));
  /*Ajax.post('http://5eeba7fb.ngrok.io/api/Viajes/postVariousTransactions',params,{
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }).then(res => {
    console.log(`res: ${res}`);
    //return res.json();
  })
  .catch(error => {console.log('errodfgr: ',error);});
*/
  return fetch(`${my_path}api/Viajes/postVariousTransactions`, {
    method:'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body:  JSON.stringify(params)
  })
  .then((response) => {console.log("intento");return response.json()})
  .catch((error) => {console.log(`error: ${error}`);});
}


//'multipart/form-data'
