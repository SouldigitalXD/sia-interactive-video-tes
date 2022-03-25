const express = require('express');
const cors = require('cors');


const { dbConnection } = require('../database/config.db');
const { socketController } = require('../socket/controller.socket');



class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io     = require('socket.io')(this.server);


        this.paths = {
            auth: '/api/auth',
            usuarios: '/api/usuarios',
        }

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        // Socket
        this.socket();
    }

    async conectarDB() {
        await dbConnection();
    }


    middlewares() {

        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio Público
        this.app.use(express.static('public'));

    }

    routes() {

        this.app.use(this.paths.auth, require('../routes/auth.routes'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios.routes'));
    }

    socket() {
        this.io.on('connection', (socket) => socketController(socket, this.io) );

    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en:', this.port );
        });
    }

}


module.exports = Server;