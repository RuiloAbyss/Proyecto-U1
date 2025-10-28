const { randomUUID } = require('node:crypto')
const bcrypt = require('bcryptjs');
const { db } = require("../firebase");

const usersCollection = db.collection("users");

let users = [
    {//REMOVER CUANDO SE IMPLEMENTE EN FIREBASE
        id: '@sa_j5l0bY8bXUuJ8Fh',
        name: 'sa',
        password: '$2b$10$4Q/deWF2WqA1BBh6QInNmuR4foPb5tk6p2xjbotd6fc9au4H92Cba', //hashed 'admin123'
        email: 'systemadmon@store.com',
        role: 'admin',
        address: 'Av. Tecnologico 777'
    },
];

async function findById(id){
    const user = await usersCollection.doc(id).get();
    if(!user.exists) return null;
    return { id: user.id, ...user.data() };
}

async function findByEmail(email){
    const user = await usersCollection.where('email', '==', email).get();
    if(user.empty) return null;
    const doc = user.docs[0];
    return { id: doc.id, ...doc.data() };
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
    return{ id:user.id, email: user.email, name:user.name, password:user.password }; //QUITAR PASSWIRD AL FINAL
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
    const doc = await usersCollection.doc(id).get();
    if(!doc.exists) return null;
    await usersCollection.doc(id).delete();
    return true;
}

module.exports = { findById, getAllUsers, findByEmail, createUser, editUser, deleteUser };
