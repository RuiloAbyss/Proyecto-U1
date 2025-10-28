const { randomUUID } = require('node:crypto')
const bcrypt = require('bcryptjs');

let users = [
    {
        id: '@sa_j5l0bY8bXUuJ8Fh',
        name: 'sa',
        password: '$2a$10$7qJ6r0vH6H9j5l0bY8bXUuJ8Fh8bXUuJ8Fh8bXUuJ8Fh8bXUuJ8Fh8bXUu', //hashed 'admin123'
        email: 'systemadmon@store.com',
        role: 'admin',
        address: 'Av. Tecnologico 777'
    },
];

function findById(id){
    return users.find((u) => u.id === id) || null;
}

function findByEmail(email){
    return users.find((u) =>  u.email === email) || null;
}

async function createUser({email, password, name, address}) {
    const exiting = users.find((u) => u.email === email)
    if(exiting) return null;
    const hashedPass = await bcrypt.hashSync(password, 10); //await hace que la función espere a complir la sentencia que engloba
    const user = {
        id: randomUUID(),
        email:email,
        password:hashedPass,
        name:name,
        role:'user',
        address:address
    };
    users.push(user);
    return{ id:user.id, email: user.email, name:user.name};
}

async function editUser(id, {email, password, name, address}){
    const user = users.find((u) => u.id === id);
    if(!user) return null;
    user.email = email || user.email;
    user.password = password ? await bcrypt.hashSync(password, 10) : user.password;
    user.name = name || user.name;
    user.address = address || user.address;
    return { id:user.id, email: user.email, name:user.name};
}

async function deleteUser(id){
    const index = users.findIndex((u) => u.id === id);
    if(index === -1) return null;
    users.splice(index, 1);
    return true;
}

module.exports = { findById, findByEmail, createUser, editUser, deleteUser};
