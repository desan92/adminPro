const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google_verify');
const { getMenuFront } = require('../helpers/menu_front');


const login =  async (req, res = response) =>{

    const { email, password } = req.body;

    try{

        //verificar email.
        const usuariodb = await Usuario.findOne({email});


        if(!usuariodb)
        {
            return res.status(500).json({
                ok: false,
                msg: 'email no valido'
            });
        }

        //verificar contrasenya.
        const validPassword = bcrypt.compareSync(password, usuariodb.password);
        if(!validPassword)
        {
            return res.status(400).json({
                ok: false,
                msg: 'contrasenya no valido'
            });
        }

        //generar token
        const token = await generarJWT(usuariodb.id);

        res.json({
            ok: true,
            token,
            menu: getMenuFront(usuariodb.role)
        })

    } catch (err){
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador.'
        });
    }

}

const loginGoogle = async (req, res = response) => {

    try{

        const { email, name, picture } = await googleVerify(req.body.token);

        const usuariodb = await Usuario.findOne({email});
        let usuario;

        if(!usuariodb)
        {
            //password: '@@@' --> es posa perque es un camp obligatori pero no s'utilitzara.
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            })
        }
        else
        {
            usuario = usuariodb;
            usuario.google = true;
        }

        //guardar usuario
        await usuario.save();

        //generar token
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            email, 
            name, 
            picture, 
            token,
            menu: getMenuFront(usuariodb.role)
        });

    }catch (err){
        console.log(err);
        res.status(400).json({
            ok: false,
            msg: 'Token no valido.'
        });
    }

}

const renewToken = async (req, res = response) => {

    const uid = req.uid

    //generar token
    const token = await generarJWT(uid);

    //obtener usuario
    const usuario = await Usuario.findById(uid);

    res.json({
        ok: true,
        uid, 
        token,
        usuario,
        menu: getMenuFront(usuario.role)
    });
}


module.exports = {
    login,
    loginGoogle,
    renewToken
}