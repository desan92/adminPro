const { response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = (req, res = response, next) => {

    //leer el token.
    const token = req.header('x-token');
    console.log('x-token: ', token);

    if(!token)
    {
        return res.status(401).json({
            ok: false,
            msg: 'NO hi ha token'
        })
    }

    try{

        //verifica el token amb la secret key
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        
        //si pasa es pot posar nova informacio a la request i 
        //es posa l'uid i aquet sera al que es lleguexi del token.
        req.uid = uid;

        console.log('uid: ', uid);
        next();
        
    } catch (err){
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }
}

const validarAdminRole = async (req, resp, next) => {

const uid = req.uid;

try{

    const usuariodb = await Usuario.findById(uid);

    if(!usuariodb)
    {
        return resp.status(404).json({
            ok: false,
            msg: 'Usuario no existe'
        })
    }

    if(usuariodb.role !== 'ADMIN_ROLE')
    {
        return resp.status(403).json({
            ok: false,
            msg: 'No tiene suficientes privilegios'
        })
    }

    next();


} catch(err){
    console.log(err);
    return res.status(401).json({
        ok: false,
        msg: 'Hable con el administrador.'
    });
}

}

const validarAdminRole_o_Usuario = async (req, resp, next) => {

    const uid = req.uid;
    const id = req.params.id;
    
    try{
    
        const usuariodb = await Usuario.findById(uid);
    
        if(!usuariodb)
        {
            return resp.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            })
        }
    
        if(usuariodb.role === 'ADMIN_ROLE' || uid === id)
        {
            next();
        }
        else
        {
            return resp.status(403).json({
                ok: false,
                msg: 'No tiene suficientes privilegios'
            })
        }
    
    
    } catch(err){
        console.log(err);
        return res.status(401).json({
            ok: false,
            msg: 'Hable con el administrador.'
        });
    }
    
    }

module.exports = {
    validarJWT,
    validarAdminRole,
    validarAdminRole_o_Usuario
}