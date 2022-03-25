
const url = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8080/api/auth'
    : 'https://sia-interactive-video-test.herokuapp.com/api/auth/';


let usuario = null;
let socket = null;
let payload = {}


// Referencias al HTML chat
const video = document.querySelector('video');


// Validar el token del localStorage
const validarJWT = async () => {

    const token = localStorage.getItem('token') || '';

    if (!token || token.length <= 10) {
        window.location.href = '/index.html';
        throw new Error('No hay token en el servidor');
    }

    const resp = await fetch(url, {
        headers: { 'x-token': token }
    });

    const { usuario: userDB, token: tokenDB } = await resp.json();
    localStorage.setItem('token', tokenDB);

    usuario = userDB;
    document.title = usuario.nombre;

    await conectarSocket();

}

const conectarSocket = async () => {

    socket = io({
        'extraHeaders': {
            'u-token': localStorage.getItem('token')
        }
    });

    socket.on('connect', () => {
        console.log('Conectado al servidor');
    });

    socket.on('disconnect', () => {
        console.log('Desconectado del servidor');
    });

    socket.on('mensaje-video', async (payload) => {
        console.log(payload);
        await videoPlayPause();
    });

}
async function videoPlayPause() {
    if (video.paused) {
        await video.play();
    } else {
        video.pause();
    }
}

const message = () => {

    if (!video.paused) {

        mensaje = 'Esta pausando el video';
        payload = {
            usuario,
            mensaje,
        }
        socket.emit('enviar-mensaje', payload);

    } else {

        mensaje = 'Esta reproduciendo el video';
        payload = {
            usuario,
            mensaje,
        }
        socket.emit('enviar-mensaje', payload);
    }

}

video.addEventListener('click', message, false);


const main = async () => {
    await validarJWT();
}
main();