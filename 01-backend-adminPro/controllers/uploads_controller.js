const path = require('path');
const fs = require('fs');

const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { actualizarIMG }  = require('../helpers/actualizar_img');

const fileUpload = (req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];
    if(!tiposValidos.includes(tipo))
    {
        return res.status(400).json({
            ok: false,
            msg: 'El tipo seleccionado no es funcional.'
        });
    }

    //validem que existeixi un archiu.
    if (!req.files || Object.keys(req.files).length === 0) 
    {
        return res.status(400).json({
            ok: false,
            msg: 'No hay archivo.'
        });
    }

    //Procesar la imagen..
    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');
    const extensionArxiu = nombreCortado[nombreCortado.length -1];

    //validar extension
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if(!extensionesValidas.includes(extensionArxiu))
    {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extensio permesa.'
        });
    }

    //generar el nom del arxiu.
    const nombreArchivo = `${uuidv4()}.${extensionArxiu}`;

    //path para guardar la imagen.
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    // Use the mv() method to place the file somewhere on your server
    file.mv(path, (err) =>{
        if (err)
        {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen.'
            });
        }

        //actualizar la db.
        actualizarIMG(tipo, id, nombreArchivo);

        res.json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        });
    });
}

const retornaImagen = (req, res = response) =>{
    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join( __dirname, `../uploads/${tipo}/${foto}`);

    //imagen por defecto
    if(fs.existsSync(pathImg))
    {
        res.sendFile(pathImg);
    }
    else
    {
        const notpathImg = path.join( __dirname, `../uploads/no-img.jpg`);
        res.sendFile(notpathImg);
        
    }
}


module.exports = {
    fileUpload,
    retornaImagen
}