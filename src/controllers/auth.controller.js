const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

const JWT_SECRET = process.env.JWT_SECRET || "1234";

async function register(req, res) {
    const { email, password, name, address} = req.body;
    if (!email || !password || !name || !address) {
        return res.status(400).json({message:"Los campos no pueden estar vacios"});
    }
    const created = await User.createUser({ email, password , name, address});
    if(!created) {
        return res.status(409).json({message: "Este usuario ya existe"})
    }
    res.status(201).json(created);
}

async function login(req, res) {
    const  {email, password } = req.body;
    if(!email || !password){
        return res.status(400).json({message:"Correo o contraseña no pueden estar vacios"});
    }
    const user = User.findByEmail(email); // No tenemos USER :( 
    if(!user){ 
        return res.status(401).json({message:"Credenciales Inválidas"})
    }
    const match = await bcrypt.compare(password,user.password);
    if(!match){
        return res.status(401).json({message: "Credenciales Inválidas"}) // Se corrige el orden de status().json()
    }

    const token = jwt.sign({id: user.id, email:email}, JWT_SECRET, {expiresIn:'30m'});
    res.status(200).json({ token:token });
}

module.exports = {
    login,
    register
}