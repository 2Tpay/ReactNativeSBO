import Ajax from 'ajax-promise-es6';

var my_path = 'http://7c6d4eef.ngrok.io/';
var ACCESS_TOKEN = 'dt7XZBYBeLJn7kt1E0wqc7XEMoTG9ScMYBmjJyYoND1oCayX8wOA2GbV81vmQiuk'
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

export function login(email, password){
  try{
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
      console.log(res);
      let { id, userId, ttl } = res;
      console.log(`id ${id}`);
      console.log('user id '+userId);
    })
    .catch((error) => {console.log(error)});

  } catch (errors){

  }
}

export function getRoutes(){
  return fetch(`${my_path}api/Rutas`, {
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

  alert(JSON.stringify(params));

  return fetch(`${my_path}api/Viajes/postVariousTransactions`, {
    method:'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': ACCESS_TOKEN
    },
    body:  JSON.stringify(params)
  })
  .then((response) => {alert(response); return response.json()})
  .catch((error) => {console.log(`error: ${error}`);});
}


//'multipart/form-data'
