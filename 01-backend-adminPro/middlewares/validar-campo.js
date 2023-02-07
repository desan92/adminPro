const { response } = require('express');
const { validationResult } = require('express-validator');

const validarCampos = (req, res = response, next) => {

    //array d'errors que hi han en aquet punt.
    const errores = validationResult(req);
    if(!errores.isEmpty())
    {
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        });
    }

    next(); //perque es puguin fer les seguents pases.

}


module.exports = {
    validarCampos
}