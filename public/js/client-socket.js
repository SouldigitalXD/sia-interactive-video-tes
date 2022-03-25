
const url = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8080/api/auth'
    : 'https://sia-interactive-video-test.herokuapp.com/api/auth/';


let usuario = null;
let socket = null;
let payload = {}

// Referencias al HTML chat
const video = document.querySelector('video');
const btnSalir = document.querySelector('#btnSalir');


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
    try {
        (video.paused) ? await video.play() : video.pause();

    } catch (error) {
        console.log(error);
        throw new Error('Error al reproducir el video');
    }
}

const message = () => {

    if (!video.paused) {
        mensaje = 'Esta pausando el video';
        payload = { usuario, mensaje };
        socket.emit('enviar-mensaje', payload);

    } else {
        mensaje = 'Esta reproduciendo el video';
        payload = { usuario, mensaje };
        socket.emit('enviar-mensaje', payload);
    }
}

video.addEventListener('click', message, false);



btnSalir.addEventListener('click', ()=> {
    localStorage.removeItem('token');
    console.log('User signed out.');
    window.location.href = '/index.html';
});

const main = async () => {
    await validarJWT();
}
main();
