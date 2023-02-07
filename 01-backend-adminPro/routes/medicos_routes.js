/**
 * ruta: /api/medicos
 */


const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campo');
const { validarJWT } = require('../middlewares/validar_jwt');


const { getMedicos, getMedico, crearMedicos, actualizarMedicos, borrarMedicos } = require('../controllers/medicos.controller')

const router = Router();

router.get( '/', validarJWT, getMedicos);

router.get('/:id', validarJWT, getMedico);

router.post( 
    '/', 
    [ 
        validarJWT,
        check("nombre", "El nombre del medico es necesario").not().isEmpty(),
        check("hospital", "El hospital id tiene de ser valido").isMongoId(),
        validarCampos
    ],
    crearMedicos);

router.put( 
    '/:id', 
    [
        validarJWT,
        check("nombre", "El nombre del medico es necesario").not().isEmpty(),
        check("hospital", "El hospital id tiene de ser valido").isMongoId(),
        validarCampos
    ],
    actualizarMedicos);

router.delete('/:id', validarJWT, borrarMedicos);

module.exports = router;