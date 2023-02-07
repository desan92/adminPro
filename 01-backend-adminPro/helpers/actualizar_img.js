const fs = require('fs');//filesystem

const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medicos');

const borrarIMG = (pathViejo) => {
    if(fs.existsSync(pathViejo))
    {
        //borrar imagen anterior del medico.
        fs.unlinkSync(pathViejo);
    }
}

const actualizarIMG = async (tipo, id, nombreArchivo) => {
    
    switch(tipo){
        case 'medicos':
            const medico = await Medico.findById(id);
            if(!medico)
            {
                console.log('No es un medico.')
                return false;
            }

            const pathViejoM = `./uploads/medicos/${medico.img}`;
            borrarIMG(pathViejoM);

            medico.img = nombreArchivo;
            await medico.save();
            return true;

            break;
        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if(!hospital)
            {
                console.log('No es un hospital.')
                return false;
            }

            const pathViejoH = `./uploads/hospitales/${hospital.img}`;
            borrarIMG(pathViejoH);

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;

            break;
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if(!usuario)
            {
                console.log('No es un usuario.')
                return false;
            }

            const pathViejoU = `./uploads/usuarios/${usuario.img}`;
            borrarIMG(pathViejoU);

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
            break;
    }


}

module.exports = {
    actualizarIMG
}