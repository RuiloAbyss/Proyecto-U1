const { randomUUID } = require('node:crypto')
const bcrypt = require('bcryptjs');

let users = [];

function findById(){
    const userFind = users.find((u) => u.id === id)|| null;
    if(!u) return null;
    return {id: userFind.id, username: userFind.username}
}

function findByUserName(username){
    return users.find((u) =>  u.username === username) || null;
}

async function createUser({username, password}) {
    const exiting = users.find((u) => u.username === username)
    if(exiting) return null;
    const hashedPass = await bcrypt.hashSync(password, 10); //await hace que la función espere a complir la sentencia que engloba
    const user = {
        id: randomUUID(),
        username:username,
        password:hashedPass
    };
    users.push(user);
    return{ id:user.id, username:user.username}
}

module.exports = { findById, findByUserName, createUser}

