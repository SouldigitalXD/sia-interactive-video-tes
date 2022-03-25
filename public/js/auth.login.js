const url = (window.location.hostname.includes('localhost'))
            ? 'http://localhost:8080/api/auth/'
            : 'https://sia-interactive-video-test.herokuapp.com/api/auth/';


// Referencias HTML del Formulario Login
const formularioLogin = document.querySelector('#Login');

formularioLogin.addEventListener('submit', async(e) => {
    e.preventDefault();
    const formData = {};

    // leer todos los campos que esten en el formulario
    for( let el of formularioLogin.elements) {
        if(el.name.length > 0) {
            formData[el.name] = el.value;
        }
    }

    await fetch(url + 'login', {
        method: 'POST',
        body: JSON.stringify( formData ),
        headers: {'Content-Type': 'application/json'}
    })
    .then( resp => resp.json() )
    .then( ({ msg, token }) => {
        if ( msg ){
            return console.error(msg);
        }

        localStorage.setItem('token', token);
        window.location.href = '/video.html';
    })
    .catch( err => {
        console.error(err)
    });
    
});

function onSignIn(googleUser) {

        var id_token = googleUser.getAuthResponse().id_token;
        const data = { id_token };

        fetch(url + 'google', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(resp => resp.json())
            .then(({ token }) => {
                localStorage.setItem('token', token);
                window.location.href = '/video.html';
            })
            .catch(console.log);

    }

function signOut() {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            console.log('User signed out.');
        });
    }

