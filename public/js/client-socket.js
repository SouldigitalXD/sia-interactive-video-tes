
const url = (window.location.hostname.includes('localhost'))
? 'http://localhost:8080/api/auth'
: 'https://sia-interactive-video-test.herokuapp.com/api/auth/';


let usuario = null;
let socket = null;


// Referencias al HTML chat
const video = document.querySelector('video');


// Validar el token del localStorage
const validarJWT = async() => {

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

const conectarSocket = async() => {
    
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
    
    socket.on('chat-sala', (payload) => {
        console.log(payload)
        video.play();
    });
}

video.addEventListener('play', async () => {

    try {
        const mensaje = 'El video se esta reproduciendo'
        const play = await video.play();

        const payload = {
            play,
            mensaje,
            usuario,
        }

        socket.emit('enviar-mensaje', payload);

    } catch (error) {
        console.log(error);
        throw new Error(error);
    }

});


const main = async () => {
    await validarJWT();
}
main();