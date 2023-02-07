/**
 * ruta: api/upload
 */

const { Router } = require('express');
const expressfileUpload = require('express-fileupload');
const { validarJWT } = require('../middlewares/validar_jwt');
const { fileUpload, retornaImagen } = require('../controllers/uploads_controller');


const router = Router();

router.use(expressfileUpload());

router.put('/:tipo/:id', validarJWT, fileUpload);
router.get('/:tipo/:foto', retornaImagen);

module.exports = router;