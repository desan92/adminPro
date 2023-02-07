//installations

//1- npm init -y
//2- npm install express
//3- npm install -g nodemon
//4- npm i mongoose 
//5- npm i dotenv
//6- npm i cors
//7- npm i express-validator per validar els camps de les consultes
//8- npm i bcryptjs //per encriptar la password.
//9- npm i jsonwebtoken //per generar un jwt
//10- npm i express-fileupload //per poder cargar les imatges.
//11- npm install uuid //per generar un id a les imatges.
//12- npm install google-auth-library --save per fer funcionar al google sign in.

//per iniciar al terminal amb npm run start:dev
//package.json "start:dev": "nodemon index.js"

//Google Sign in:
//https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid
//seguir els passos.
//https://console.cloud.google.com/apis/dashboard?project=angular-374309
//crear un nou projecte.
//pantalla de consentimiento emplenar-la
//crear una credencial de id de clients oauth 2.0
//este de crear una credencial per dispositiu desti.
//posan en aquet cas app web el nom que es vulgui i posant 
//a origenes de js http://localhost i http://localhost:3000 el port on funciona.



require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./db/config');

// Crear el servidor de express
const app = express();


// Configurar CORS
app.use( cors() );

//Carpeta publica amb aixo es mostra la pantalla en html de index.html
app.use(express.static('public'));

//Lectura y parseo del body
app.use( express.json() ); //aixo te d'anar abans de les rutes.

// Base de datos
dbConnection();


// Rutas
app.get( '/', (req, res) => {

    res.json({
        ok: true,
        msg: 'Hola Mundo'
    });

});

app.use( '/api/usuarios', require('./routes/usuarios_routes'));
app.use( '/api/login', require('./routes/auth_routes'));

app.use( '/api/hospitales', require('./routes/hospitales_routes'));

app.use( '/api/medicos', require('./routes/medicos_routes'));

app.use( '/api/todo', require('./routes/busquedas_routes'));

app.use( '/api/upload', require('./routes/uploads_routes'));


app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT );
});

