# SIA Interactive

Este es el proyecto de ingreso para SIA Interactive usando Node.js Javascript(ES6+) Express Mongo Socket.io entre otros.

### Notas:
Recuerda reconstruir los modulos de Node 
```
npm install
```

Para iniciar el server, recuerda:
```
npm start 
```

Despues podes usar el link local o el de heroku:
```
-http://localhost:8080/   
-https://sia-interactive-video-test.herokuapp.com/
```

Para mas informacion no dudes en consultar el archivo package.json en donde estaran los siguientes comandos:
```
    "start": "node app",
    "dev": "nodemon app"
```

BONUS:
```
Adicionalmente se ha agregado un sistema de CRUD de usuarios y de auth usando JasonWebTokens para una mayor experiencia de uso de esta App,

* Se pueden observar mensajes en la consola del navegador para verificar quien esta reproduciendo o pausando el video.
* El boton controlador play del video esta nativo, solo se activara la conexion socket.io cuando se le de click a la pantalla del video (HTMLmediaVideo).
* Perdonen el Spanglish

Gracias por su colaboracion
```