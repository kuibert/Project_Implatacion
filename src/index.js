const express = require ('express');

// inicializacion
const app = express();

require('dotenv').config()

// Ajustes del servidor
app.set('port', process.env.PORT || 4000);

// Configuracion de rutas
app.use(require('./routes')); // Node automaticomente busca el index.js del module

// Iniciar el servidor
app.listen(app.get('port'), () => {
     console.log('Servidor iniciado en el puerto: ', app.get('port'));
});