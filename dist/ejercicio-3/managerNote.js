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
exports.ManagerNote = void 0;
const chalk_1 = __importDefault(require("chalk"));
const fs = __importStar(require("fs"));
class ManagerNote {
    /**
     * Constructor
     * @param user usuario que implementará los métodos
     */
    constructor(user) {
        this.user = user;
    }
    /**
     * GetterUser
     * @returns devuelve el usuario
     */
    getUser() {
        return this.user;
    }
    /**
     * Agrega un nueva nota al directorio de notas del usuario
     * @param addNoteToUser nota a agregar
     */
    addNote(addNoteToUser) {
        const rute = '/home/usuario/prct10/src/ejercicio-3/database/' + this.user;
        const fileRute = '/home/usuario/prct10/src/ejercicio-3/database/' + this.user + '/' + addNoteToUser.getTitle() + '.json';
        if (fs.existsSync(rute)) {
            console.log(chalk_1.default.green(`Bienvenido ${this.user}`));
            if (fs.existsSync(fileRute)) {
                console.log(chalk_1.default.red(`Lo sentimos ${this.user}, el titulo de la nota: ${addNoteToUser.getTitle()} no esta disponible, intentelo con otro titulo`));
            }
            else {
                fs.writeFileSync(fileRute, `{\n\t"title": "${addNoteToUser.getTitle()}",\n\t"body": "${addNoteToUser.getBody()}",\n\t"color": "${addNoteToUser.getColor()}"\n}`);
                console.log(chalk_1.default.green('New note added!'));
            }
        }
        else {
            console.log(chalk_1.default.green(`Creando la estructura personal para el usuario: ${this.user} para gestionar sus notas `));
            fs.mkdirSync(rute);
            fs.writeFileSync(fileRute, `{\n\t"title": "${addNoteToUser.getTitle()}",\n\t"body": "${addNoteToUser.getBody()}",\n\t"color": "${addNoteToUser.getColor()}"\n}`);
            console.log(chalk_1.default.green('New note added!'));
        }
    }
    /**
     * Edita una nota con sus nuevos parámetros
     * @param title titulo antiguo de la nota
     * @param newtitle nuevo titulo de la nota
     * @param newBody nuevo cuerpo de la nota
     * @param newColor nuevo color de la nota
     */
    editNote(title, newtitle, newBody, newColor) {
        const fileRute = './src/database/' + this.user + '/' + title + '.json';
        if (fs.existsSync(fileRute)) {
            fs.writeFileSync(fileRute, `{\n\t"title": "${newtitle}",\n\t"body": "${newBody}",\n\t"color": "${newColor}"\n}`);
            console.log(chalk_1.default.green(`Note ${title} edited`));
        }
        else {
            console.log(chalk_1.default.red(`La nota ${title} no existe en el directorio personal del ${this.user}`));
        }
    }
    /**
     * Elimina una nota del directorio del usuario a través del titulo
     * @param title titulo de la nota
     */
    removeNote(title) {
        const fileRute = './src/database/' + this.user + '/' + title + '.json';
        if (fs.existsSync(fileRute)) {
            fs.rmSync(fileRute);
            console.log(chalk_1.default.green('Note removed!'));
        }
        else {
            console.log(chalk_1.default.red('No se ha encontrado la nota, intentelo con otro titulo'));
        }
    }
    /**
     * Lista las notas del directorio del usuario
     */
    listNotes() {
        const rute = './src/database/' + this.user;
        if (fs.existsSync(rute)) {
            const notesA = [];
            fs.readdirSync(rute).forEach((notes) => {
                notesA.push(notes);
            });
            if (notesA.length == 0) {
                console.log(chalk_1.default.red("El usuario no tiene notas"));
            }
            else {
                notesA.forEach((note) => {
                    fs.readFile(`./src/database/${this.user}/${note}`, (err, data) => {
                        if (err) {
                            console.log(chalk_1.default.red('Read error'));
                        }
                        else {
                            const notesJson = JSON.parse(data.toString());
                            switch (notesJson.color) {
                                case 'Rojo':
                                    console.log(chalk_1.default.red(notesJson.title));
                                    break;
                                case 'Verde':
                                    console.log(chalk_1.default.green(notesJson.title));
                                    break;
                                case 'Azul':
                                    console.log(chalk_1.default.blue(notesJson.title));
                                    break;
                                case 'Amarillo':
                                    console.log(chalk_1.default.yellow(notesJson.title));
                                    break;
                            }
                        }
                    });
                });
            }
        }
    }
    /**
     * Lee la nota del usuario a través del titulo y lo imprime por consola
     * @param titleRead titulo de la nota
     */
    readNotes(titleRead) {
        const fileRute = './src/database/' + this.user + '/' + titleRead + '.json';
        if (fs.existsSync(fileRute)) {
            fs.readFile(fileRute, (err, data) => {
                if (err) {
                    console.log(chalk_1.default.red('Read Error'));
                }
                else {
                    const notesJson = JSON.parse(data.toString());
                    switch (notesJson.color) {
                        case 'Rojo':
                            console.log(chalk_1.default.red(`${notesJson.title}\n${notesJson.body}`));
                            break;
                        case 'Verde':
                            console.log(chalk_1.default.green(`${notesJson.title}\n${notesJson.body}`));
                            break;
                        case 'Azul':
                            console.log(chalk_1.default.blue(`${notesJson.title}\n${notesJson.body}`));
                            break;
                        case 'Amarillo':
                            console.log(chalk_1.default.yellow(`${notesJson.title}\n${notesJson.body}`));
                            break;
                    }
                }
            });
        }
        else {
            console.log(chalk_1.default.red('La nota no existe, intentelo con otro titulo'));
        }
    }
}
exports.ManagerNote = ManagerNote;
