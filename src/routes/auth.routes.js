const express = require('express')
const controller = require('../controllers/auth.controller');

const router = express.Router();

router.post("/register", controller.register);
router.post("/login", controller.login);

// Rutas de administración de usuarios (DEBUG) BORRAR DESPUES
router.put("/users/:id", controller.edit);
router.delete("/users/:id", controller.remove);

module.exports = router;