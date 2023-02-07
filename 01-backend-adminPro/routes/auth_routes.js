/**
 * ruta: /api/login
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { login, loginGoogle, renewToken } = require('../controllers/auth_controller');
const { validarCampos } = require('../middlewares/validar-campo');
const { validarJWT } = require('../middlewares/validar_jwt');

const router = Router();

router.post(
    '/',
    [ 
        check('email', 'El campo es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        validarCampos
    ],
    login);

router.post(
    '/google',
    [ 
        check('token', 'El token de google es obligatorio').not().isEmpty(),
    ],
    loginGoogle);

router.get('/renew', validarJWT, renewToken);

module.exports = router;