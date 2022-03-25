const { Socket } = require('socket.io');
const { comprobarJWT } = require('../helpers');

const socketController = async (socket = new Socket(), io) => {

    const usuario = await comprobarJWT(socket.handshake.headers['u-token']);

    if (!usuario) {
        return socket.disconnect();
    }

    socket.on("connection", () => {
        io.emit("Cliente conectado");
    });

    // socket.on('disconnect', () => {
    //     console.log('Cliente desconectado');
    // });

    socket.on('enviar-mensaje', ( { usuario, mensaje } ) => {
        socket.broadcast.emit('mensaje-video', { de: usuario.nombre, mensaje: mensaje });
    });

}

module.exports = {
    socketController
}