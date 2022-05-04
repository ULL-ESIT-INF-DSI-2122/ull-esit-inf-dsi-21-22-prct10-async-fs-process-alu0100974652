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
Object.defineProperty(exports, "__esModule", { value: true });
const note_1 = require("./note");
const managerNote_1 = require("./managerNote");
const yargs = __importStar(require("yargs"));
const chalk = __importStar(require("chalk"));
/**
 * Yargs de Add Note
 */
yargs.command({
    command: 'add',
    describe: 'Add new note',
    builder: {
        user: {
            describe: 'User Name',
            demandOption: true,
            type: 'string',
        },
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string',
        },
        body: {
            describe: 'Note Body',
            demandOption: true,
            type: 'string',
        },
        color: {
            describe: 'Note Color',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if (typeof argv.user === 'string' && typeof argv.title === 'string' && typeof argv.body === 'string' && typeof argv.color === 'string') {
            const newNote = new note_1.Note(argv.title, argv.body, argv.color);
            const managerNote = new managerNote_1.ManagerNote(argv.user);
            managerNote.addNote(newNote);
        }
        else {
            console.log(chalk.red('Argumentos inválidos'));
        }
    }
});
/**
 * Yargs de Edit Note
 */
yargs.command({
    command: 'edit',
    describe: 'Edit note',
    builder: {
        user: {
            describe: 'User Name',
            demandOption: true,
            type: 'string',
        },
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string',
        },
        newTitle: {
            describe: 'New Title',
            demandOption: true,
            type: 'string',
        },
        body: {
            describe: 'Note Body',
            demandOption: true,
            type: 'string',
        },
        color: {
            describe: 'Note Color',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if (typeof argv.user === 'string' && typeof argv.title === 'string' && typeof argv.body === 'string' && typeof argv.color === 'string' && typeof argv.newTitle === 'string') {
            const managerNote = new managerNote_1.ManagerNote(argv.user);
            managerNote.editNote(argv.title, argv.newTitle, argv.body, argv.color);
        }
        else {
            console.log(chalk.red('Argumentos inválidos'));
        }
    }
});
/**
 * Yargs de Remove Note
 */
yargs.command({
    command: 'remove',
    describe: 'Eliminar una nota',
    builder: {
        user: {
            describe: 'Nombre de usuario',
            demandOption: true,
            type: 'string',
        },
        title: {
            describe: 'Título de la nota',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if (typeof argv.user === 'string' && typeof argv.title === 'string') {
            const managerNote = new managerNote_1.ManagerNote(argv.user);
            managerNote.removeNote(argv.title);
        }
        else {
            console.log(chalk.red('Argumentos no válidos'));
        }
    },
});
/**
 * Yargs de List Notes
 */
yargs.command({
    command: 'list',
    describe: 'List Notes of a User',
    builder: {
        user: {
            describe: 'User Name',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if (typeof argv.user === 'string') {
            const managerNote = new managerNote_1.ManagerNote(argv.user);
            managerNote.listNotes();
        }
        else {
            console.log(chalk.red('Argumentos no válidos'));
        }
    }
});
/**
 * Yargs Read Notes
 */
yargs.command({
    command: 'read',
    describe: 'Read Notes of a User',
    builder: {
        user: {
            describe: 'User Name',
            demandOption: true,
            type: 'string',
        },
        title: {
            describe: 'Título de la nota',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if (typeof argv.user === 'string' && typeof argv.title === 'string') {
            const managerNote = new managerNote_1.ManagerNote(argv.user);
            managerNote.readNotes(argv.title);
        }
        else {
            console.log(chalk.red('Argumentos no válidos'));
        }
    }
});
yargs.parse();
