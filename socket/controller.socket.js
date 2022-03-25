const { Socket } = require('socket.io');
const { comprobarJWT } = require('../helpers');

const socketController = async (socket = new Socket(), io) => {
    
    // io.set("transports", ["websocket"]);

    const usuario = await comprobarJWT(socket.handshake.headers['u-token']);

    if (!usuario) {
        return socket.disconnect();
    }
    socket.on("connection", (socket) => {
        io.emit("Cliente conectado", socket.id);
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    socket.on('enviar-mensaje', ({ usuario, mensaje }) => {

        socket.broadcast.emit('chat-sala', { de: usuario.nombre, text: mensaje });
    });

}

module.exports = {
    socketController
}