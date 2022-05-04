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
const chalk = __importStar(require("chalk"));
const yargs = __importStar(require("yargs"));
const grepCommand_1 = require("./grepCommand");
/**
 * Yargs con tuberia
 */
yargs.command({
    command: 'pipe',
    describe: 'Grep de un fichero con tuperia',
    builder: {
        file: {
            describe: 'file',
            demandOption: true,
            type: 'string',
        },
        word: {
            describe: 'word',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if (typeof argv.file === 'string' && typeof argv.word === 'string' && process.argv.length === 5) {
            const pipeFunction = new grepCommand_1.GrepCommand(argv.file, argv.word);
            console.log(pipeFunction.pipe());
        }
        else {
            console.log(chalk.red('Argumentos inválidos'));
        }
    },
});
/**
 * Yargs sin tuberia
 */
yargs.command({
    command: 'nopipe',
    describe: 'Grep de un fichero sin tuberia',
    builder: {
        file: {
            describe: 'file',
            demandOption: true,
            type: 'string',
        },
        word: {
            describe: 'word',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if (typeof argv.file === 'string' && typeof argv.word === 'string' && process.argv.length === 5) {
            const nopipeFunction = new grepCommand_1.GrepCommand(argv.file, argv.word);
            console.log(nopipeFunction.nopipe());
        }
        else {
            console.log(chalk.red('Argumentos inválidos'));
        }
    },
});
yargs.parse();
