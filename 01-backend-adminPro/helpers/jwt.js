const jwt = require('jsonwebtoken');



const generarJWT = (uid) => {
    
    return new Promise( (resolve, reject) => {

        //per poden guardar mes coses com el nom o el role.
        const payload = {
            uid
        };

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, (err, token) => {
            if(err)
            {
                console.log(err);
                reject('NO se pudo generar el JWT.');
            }
            else
            {
                resolve(token);
            }
        });

    });

}


module.exports = {
    generarJWT,
}