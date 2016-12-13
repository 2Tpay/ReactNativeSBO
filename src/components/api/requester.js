export function searchUser(user){
  return fetch(`https://api.github.com/users/${user}`)
.then((response) => response.json())
.then((response) => {
  const returnvalue = response.name? response : [];
  return returnvalue;
})
.catch((error) => { console.error(error); });
}
