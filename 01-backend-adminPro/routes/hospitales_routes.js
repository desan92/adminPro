/**
 * ruta: /api/hospitales
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campo');
const { validarJWT } = require('../middlewares/validar_jwt');


const { getHospitales, crearHospital, actualizarHospital, borrarHospital } = require('../controllers/hospitales_controller');

const router = Router();

router.get( '/', getHospitales);

router.post( 
    '/', 
    [ 
        validarJWT,
        check("nombre", "El nombre del hospital es necesario").not().isEmpty(),
        validarCampos
    ],
    crearHospital);

router.put( 
    '/:id', 
    [
        validarJWT,
        check("nombre", "El nombre del hospital es necesario").not().isEmpty(),
        validarCampos
    ],
    actualizarHospital);

router.delete('/:id', validarJWT, borrarHospital);

module.exports = router;