require("@babel/core").transform("code", {
    presets: ["@babel/preset-env"],
});
require('dotenv').config();
const Server = require('./models/server');


const server = new Server();



server.listen();