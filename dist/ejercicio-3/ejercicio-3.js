"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Watcher = void 0;
const fs = __importStar(require("fs"));
const chalk_1 = __importDefault(require("chalk"));
const events_1 = require("events");
/**
 * Clase que visualiza los cambios en las notas de un usuario.
 */
class Watcher extends events_1.EventEmitter {
    /**
     * Inicializa un objeto.
     * @param user Usuario a observar
     */
    constructor(user) {
        super();
        this.user = user;
    }
    /**
     * Método que se encarga de hacer la visualiación de los cambios.
     * @returns {fs.FSWatcher} Emisor de eventos simple
     */
    watch() {
        console.log(chalk_1.default.blue(`Vigilando las notas de ${this.user}:`));
        const watcher = fs.watch(`/home/usuario/prct10/src/ejercicio-3/database/${this.user}/`, (eventType, filename) => {
            if (eventType == 'rename') {
                this.emit('rename', `La nota ${filename} se ha eliminado`);
            }
            else if (eventType == 'change') {
                this.emit('change', `La nota ${filename} se ha modificado`);
            }
            else {
                this.emit('error', `Ha ocurrido un error`);
            }
        });
        return watcher;
    }
}
exports.Watcher = Watcher;
if (process.argv[2] === undefined) {
    console.log('Diga un usuario');
}
else {
    new Watcher(process.argv[2]).watch();
}
