import Ajax from 'ajax-promise-es6';

var my_path = 'http://fiasps.unitec.edu:8060/'; 
//'http://1a4be0bd.ngrok.io/';

var ACCESS_TOKEN = '';

export function setAccessToken(id){
  ACCESS_TOKEN = id;
  console.log("token set "+ACCESS_TOKEN);
}

export function login(email, password){
    let params = {
      email: email,
      password: password
    }
    return fetch(`${my_path}api/Users/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    }).then((res) => {
      //if(res.status >=200 && res.status <=300)
        return res.json()
    })
    .then( (res) =>{
      //console.log(res);
      const returnValue = res.id? res: 'Error de autenticacion'
      //console.log(returnValue);
      return returnValue
    })
    .catch((error) => {
      alert(error.message)
      throw error
    });
}

export function logout(){
  return fetch(`${my_path}api/Users/logout?access_token=${ACCESS_TOKEN}`,{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then( (res) =>{
      console.log(res);
      return res
    }).catch((error) => {console.log(error.message)})
}

export function getRoutes(){
  return fetch(`${my_path}api/Rutas?filter={"limit": 40}`, {
  method: 'GET',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': ACCESS_TOKEN
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
      'Authorization': ACCESS_TOKEN
    }
  })
  .then((response) => {return response.json()})
  .catch((error) => {console.log(error);});
}

export function postTransaction(routeId, date, routePlate, routeDirection, passengers){
  let params = {
    idRuta: routeId,
    fecha: new Date(date).toISOString(),
    busPlaca: routePlate,
    tipoMovimiento: routeDirection,
    transacciones: passengers
  }

  // alert(JSON.stringify(params));

// export function postTransaction(routeId, date,routePlate, routeDirection, passengers){
//     let array = [];
//     passengers.forEach((passenger) =>{
//       array.push(passenger.idTarjeta);
//     });
//     let params = {
//       idRuta: routeId,
//       fecha: new Date(date).toISOString(),
//       busPlaca: routePlate,
//       tipoMovimiento: routeDirection,
//       transacciones: array
//     }
  return fetch(`${my_path}api/Viajes/postVariousTransactions`, {
    method:'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': ACCESS_TOKEN
    },
    body:  JSON.stringify(params)
  })
  .then((response) => { return response.json()})
  .catch((error) => {alert(`error: ${error}`);});
}
