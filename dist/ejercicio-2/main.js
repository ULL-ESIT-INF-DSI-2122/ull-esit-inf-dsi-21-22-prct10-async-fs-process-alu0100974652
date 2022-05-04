"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require("chalk");
const yargs = require("yargs");
const grepCommand_1 = require("./grepCommand");
/**
 * Yargs con tuberia
 */
yargs.command({
    command: 'pipe',
    describe: 'Leer un fichero y hacerle grep',
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
        if (typeof argv.file === 'string' &&
            typeof argv.word === 'string' &&
            process.argv.length === 5) {
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
    describe: 'Leer un fichero y hacerle grep',
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
