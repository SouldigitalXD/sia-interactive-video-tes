const createUrl = (window.location.hostname.includes('localhost'))
                  ? 'http://localhost:8080/api/usuarios/'
                  : 'https://sia-interactive-video-test.herokuapp.com/api/usuarios/';


// Referencias HTML del Formulario Register
const formularioRegister = document.querySelector('#Register');
const nombre = document.querySelector('#nombre')
const correo = document.querySelector('#correo')
const password = document.querySelector('#password')
const password2 = document.querySelector('#password2')


formularioRegister.addEventListener('submit', async(e) => {
    e.preventDefault();

    let data = {
        nombre: nombre.value,
        correo: correo.value,
        password: password.value,
        password2: password2.value,
    };

    await fetch(createUrl, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(resp => resp.json())
        .then(({ msg }) => {
            if (msg) {
                return console.error(msg);
            }
            window.location.href = '/index.html';
        })
        .catch(err => {
            console.error(err)
        });
});