const mysql = require('mysql2');
const { promisify } = require('util');
const { database } = require('../config/Keys');
const { CONSTANTS } = require('../utils/utils');

const pool = mysql.createPool(database); // Se crea el pool de conexiones

// Iniciando conexión con la base de datos
pool.getConnection((err, conexion) => {
    // Validar si la conexión tiene algún tipo de error
    if (err) {
        // Validando códigos de error más comunes
        switch (err.code) {
            case CONSTANTS.PROTOCOL_CONNECTION_LOST:
                // Indica que la conexión con la base de datos está perdida
                console.error('DATABASE CONNECTION WAS CLOSED');
                break;
            case CONSTANTS.ER_CON_COUNT_ERROR:
                // Indica que existen demasiadas conexiones
                console.error('DATABASE HAS TOO MANY CONNECTIONS');
                break;
            case CONSTANTS.ERCONNREFUSED:
                // Indica que la conexión fue rechazada
                console.error('DATABASE CONNECTION WAS REFUSED');
                break;
            case CONSTANTS.ER_ACCESS_DENIED_ERROR:
                // Indica que el acceso está denegado
                console.error('ACCESS DENIED FOR USER');
                break;
            default:
                console.error('Error de base de datos no encontrado');
                break;
        }
    }

    // Si la conexión es exitosa, imprimir un mensaje indicándolo
    if (conexion) {
        console.log('Conexión establecida con la base de datos');
        conexion.release();
    }

    return;
});

// Configurando PROMISIFY para permitir en cada consulta un async/await (promesas)
pool.query = promisify(pool.query);

module.exports = pool;
