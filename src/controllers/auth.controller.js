const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

const JWT_SECRET = process.env.JWT_SECRET || "1234";

async function register(req, res) {
    const { username, password} = req.body;
    if (!username || !password){
        return res.status(400).json({message:"Usuario o contraseña no pueden estar vacios"});
    }
    const created = await User.createUser({ username, password })
    if(!created) {
        return res.status(409).json({message: "Este usuario ya existe"})
    }
    res.status(201).json(created);
}

async function login(req, res) {
    const  {username, password } = req.body;
    if(!username || !password){
        return res.status(400).json({message:"Usuario o contraseña no pueden estar vacios"});
    }
    const user = User.findByUserName(username);
    if(!user){
        return res.status(401).json({message:"Credenciales Inválidas"})
    }
    const match = await bcrypt.compare(password,user.password);
    if(!match){
        return res.status.json(401).json({message: "Credenciales Inválidas"})
    }

    const token = jwt.sign({id: user.id, username:username}, JWT_SECRET, {expiresIn:'10m'});
    res.status(200).json({ token:token });
}

module.exports = {
    login,
    register
}