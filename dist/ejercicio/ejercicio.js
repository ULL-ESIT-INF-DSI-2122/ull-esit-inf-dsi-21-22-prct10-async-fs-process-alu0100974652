"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net = require("net");
net.createServer((connection) => {
    console.log('A client has connected.');
    connection.write(`Connection established.`);
    connection.end();
    connection.write(`Second message sent.`);
    connection.on('close', () => {
        console.log('A client has disconnected.');
    });
}).listen(60300, () => {
    console.log('Waiting for clients to connect.');
});
