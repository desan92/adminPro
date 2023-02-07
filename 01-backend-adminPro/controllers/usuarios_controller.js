const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const Usuario = require('../models/usuario');


const getUsuarios = async (req, res = response) => {

    const desde = Number(req.query.desde) || 0;
    console.log(desde);

    //amb el find et retorna tota l'informacio d'usuaris.
    //al posar {}, +nom variables que volem rebre nomes sortiran aquestes i uid que ve predefinidament.
    /*const usuario = await Usuario.find({}, 'nombre email role google')
                                  .skip(desde)//aixo es per escapar els primers resultats o sigui s'obte desde el nombre introduit fins al final
                                  .limit(5);//limit de resultats que es volen rebre.


    const total = await Usuario.count();*/

    //es el mateix que la part comentada pero es mes eficient ja que es fa tot simultaneament i no un darrera l'altre.
    const [ usuario, total ] = await Promise.all([
        Usuario
                .find({}, 'nombre email role google img')
                .skip(desde)
                .limit(5),
        
        Usuario.count()
    ]);

    res.json({
        ok: true,
        msg: 'get usuarios',
        usuario: usuario,
        total: total,
        uid: req.uid //l'usuari que fa la peticio.
    });

}

const crearUsuarios = async (req, res = response) => {

    console.log(req.body);
    const { nombre, password, email } = req.body;

    try{

        const existeEmail = await Usuario.findOne( { email } );

        if(existeEmail){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya existe'
            });
        }

        const usuario = new Usuario(req.body);

        //encriptacio password.
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        
        //generar token
        const token = await generarJWT(usuario.id);

        //gravar a la db
        //await espera a que la promesa acbi per fer el res.json
        await usuario.save();

        res.json({
            ok: true,
            msg: 'crear usuario',
            usuario: usuario, 
            token
        });

    }catch(err){
        console.log(err); 
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... revisar logs'
        });
    }

}

const actualitzarUsuario = async (req, res = response) => {

    //todo: validar token i comprovar si es el usuario correcto.

    const uid = req.params.id;

    try{

        const usuariodb = await Usuario.findById(uid);
        //const { nombre, password, email } = req.body;

        if(!usuariodb)
        {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con este id.'
            })
        }

        //actualitzacions
        //al extreure el password i google
        //ja no es necesiten els dos deletes d'abaix.
        const { password, google, email, ...campos } = req.body;

        /*if(usuariodb.email === email)
        {
            delete campos.email
        }
        else
        {
            const existeEmail = await Usuario.findOne({ email: email });

            if(existeEmail){
                return res.status(400).json({
                    ok: false,
                    msg: 'Este email ya existe.'
                })
            }
        }*/

        if(usuariodb.email !== email)
        {
            const existeEmail = await Usuario.findOne({ email: email });

            if(existeEmail){
                return res.status(400).json({
                    ok: false,
                    msg: 'Este email ya existe.'
                })
            }
        }

        //com que al principi es desestructura email, ara es torna a posar dintre de camps. Despres de la comprovacio.
        if(!usuariodb.google)
        {
            campos.email = email;
        }
        else if(usuariodb.email !== email)
        {
            return res.status(400).json({
                ok: false,
                msg: 'Usuarios de google no pueden cambiar su correo.'
            })
        }
        
        //camps que mai volem que s'actualitzin
        //delete campos.password;
        //delete campos.google;

        //{new: true} -> perque retorni el nou camp actualitzat de forma instantanea al postman.
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true});


        res.json({
            ok: true,
            usuario: usuarioActualizado,
        })
        
    }catch (err){
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}


const borrarUsuario = async (req, res = response) =>{

    const uid = req.params.id;
    //console.log(uid);

    try{

        const usuariodb = await Usuario.findById(uid);
        //const { nombre, password, email } = req.body;

        if(!usuariodb)
        {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con este id.'
            })
        }

        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Usuario eliminado'
        })
        
    }catch (err){
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

module.exports = {
    getUsuarios,
    crearUsuarios,
    actualitzarUsuario,
    borrarUsuario
}