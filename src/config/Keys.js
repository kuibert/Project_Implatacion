require('dotenv').config();

const config = {
    // configurando objeto para inyectar en el pool de conexiones
    database: {
        host: process.env.HOST,
        user: process.env.USER,
        port: process.env.PORT_DATABASE,
        password: process.env.PASSWORD,
        database: process.env.DATABASE_NAME
    }
};

module.exports = config;
