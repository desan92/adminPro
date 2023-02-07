const { response } = require("express")
const Medico = require('../models/medicos');

const getMedicos = async (req, res = response) => {

    const medicos = await Medico.find()
                                .populate('usuario', 'nombre img')
                                .populate('hospital', 'nombre img');
    //populate es seleccionen els camps que interesen de les db que estan asociades amb aquesta taula.

    res.json({
        ok: true,
        msg: 'getMedicos',
        medicos
    })
}

const getMedico = async (req, res = response) => {

    const id = req.params.id;

    try{
        const medico = await Medico.findById(id)
                                .populate('usuario', 'nombre img')
                                .populate('hospital', 'nombre img');
        //populate es seleccionen els camps que interesen de les db que estan asociades amb aquesta taula.

        res.json({
            ok: true,
            msg: 'getMedicos',
            medico
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador.'
        })
    }
    
}

const crearMedicos = async (req, res = response) => {
    const uid = req.uid;
    console.log(uid);
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });
    

    try{

        const medicosb = await medico.save();

        res.json({
            ok: true,
            medico: medicosb
        })

    } catch(err){
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador.'
        })
    }
}

const actualizarMedicos = async (req, res = response) => {
    
    const id = req.params.id;
    const uid = req.uid;

    try{

        const medicodb = await Medico.findById(id);

        if(!medicodb)
        {
            return res.status(400).json({
                ok: false,
                msg: 'No se encontro id.'
            });
        }

        const canviosMedico = { ...req.body, usuario: uid };

        const MedicoActualitzat = await Medico.findByIdAndUpdate(id, canviosMedico, {new: true});

        res.json({
            ok: true,
            msg: 'actualizarMedicos',
            medico: MedicoActualitzat
        });

    }catch(err){
        console.log(err);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador.'
        });
    }

}

const borrarMedicos = async(req, res = response) => {
    const id = req.params.id;

    try{

        const medicodb = await Medico.findById(id);

        if(!medicodb)
        {
            return res.status(400).json({
                ok: false,
                msg: 'No se encontro id.'
            });
        }

        await Medico.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'borrarMedicos',
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
    getMedicos,
    getMedico,
    crearMedicos,
    actualizarMedicos,
    borrarMedicos
}