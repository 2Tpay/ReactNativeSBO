export function searchUser(user){
  return fetch(`https://api.github.com/users/${user}`)
.then((response) => response.json())
.then((response) => {
  const returnvalue = response.name ? response : [];
  return returnvalue;
})
.catch((error) => { console.log(error); });
}

export function getRoutes(){
  return fetch(`http://97be178d.ngrok.io/api/Rutas`, {
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
  return fetch('http://97be178d.ngrok.io/api/Tarjetas/getWithClient', {
    method:'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
  .then((response) => {return response.json()})
  .catch((error) => {console.log(error);});
}

export function postTransaction(routeId, routePlate, routeDirection, passengers){
  let params = new FormData();
  params.append('idRuta', routeId);
  params.append('fecha', new Date());
  params.append('busPlaca', routePlate);
  params.append('tipoMovimiento', routeDirection);
  let array = [];
  passengers.forEach((passenger) =>{
    array.push(passenger.idTarjeta);
  });
  params.append('transacciones',array);

  return fetch(`http://97be178d.ngrok.io/api/Rutas`, {
  method: 'POST',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  body: params
})
.then((response) => {return response.json()})
.catch((error) => {console.log(error);});
}


//'multipart/form-data'
