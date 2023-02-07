/*
 * RUTA: /api/usuarios
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, crearUsuarios, actualitzarUsuario, borrarUsuario } = require('../controllers/usuarios_controller');
const { validarCampos } = require('../middlewares/validar-campo');
const { validarJWT, validarAdminRole, validarAdminRole_o_Usuario } = require('../middlewares/validar_jwt');


const router = Router();

router.get( '/', validarJWT, getUsuarios);

router.post( 
    '/', 
    [ 
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos //validar els camps anteriors amb el custom middleware.
    ],
    crearUsuarios);

router.put( 
    '/:id', 
    [
        validarJWT,
        validarAdminRole_o_Usuario,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('role', 'El rol es obligatorio'),
        validarCampos
    ],
    actualitzarUsuario);

router.delete('/:id', [validarJWT, validarAdminRole], borrarUsuario);

module.exports = router;