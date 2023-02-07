const { response } = require("express");
const Hospital = require('../models/hospital');

const getHospitales = async (req, res = response) => {

    const hospitales = await Hospital.find()
                                .populate('usuario', 'nombre img');

    res.json({
        ok: true,
        msg: 'getHospitales',
        hospitales
    })
}

const crearHospital = async (req, res = response) => {

    const uid = req.uid;
    console.log(uid);
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });
    

    try{

        const hospitalsb = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalsb
        })

    } catch(err){
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador.'
        })
    }
}

const actualizarHospital = async (req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try{

        const hospitaldb = await Hospital.findById(id);

        if(!hospitaldb)
        {
            return res.status(400).json({
                ok: false,
                msg: 'No se encontro id.'
            });
        }

        const canviosHospital = { ...req.body, usuario: uid };

        const hospitalActualitzat = await Hospital.findByIdAndUpdate(id, canviosHospital, {new: true});

        res.json({
            ok: true,
            msg: 'actualizarHospital',
            hospital: hospitalActualitzat
        });

    }catch(err){
        console.log(err);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador.'
        });
    }

}

const borrarHospital = async (req, res = response) => {
    const id = req.params.id;

    try{

        const hospitaldb = await Hospital.findById(id);

        if(!hospitaldb)
        {
            return res.status(400).json({
                ok: false,
                msg: 'No se encontro id.'
            });
        }

        await Hospital.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'borrarHospital',
        });

    }catch(err){
        console.log(err);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador.'
        });
    }
}


module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}