"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrepCommand = void 0;
const fs = require("fs");
const chalk = require("chalk");
const child_process_1 = require("child_process");
class GrepCommand {
    constructor(filename, word) {
        this.filename = filename;
        this.word = word;
    }
    pipe() {
        if (fs.existsSync(this.filename)) {
            const cat = (0, child_process_1.spawn)('cat', [this.filename]);
            const grep = (0, child_process_1.spawn)('grep', ['-c', this.word]);
            cat.stdout.pipe(grep.stdin);
            let grepOutput = '';
            grep.stdout.on('data', (piece) => {
                grepOutput += piece;
            });
            grep.on('close', () => {
                const x = +grepOutput;
                if (x > 0) {
                    console.log(chalk.green(`${this.word} esta en ${x} lineas del fichero`));
                }
                else {
                    console.log(chalk.red(`La palabra ${this.word} no se encuentra en el fichero`));
                }
            });
        }
        else {
            console.log(chalk.red('El fichero no existe'));
        }
    }
    nopipe() {
        if (fs.existsSync(this.filename)) {
            const cat = (0, child_process_1.spawn)('cat', [this.filename]);
            const grep = (0, child_process_1.spawn)('grep', ['-c', this.word]);
            cat.stdout.on("data", (data) => {
                grep.stdin.write(data);
            });
            cat.on("close", () => {
                grep.stdin.end();
            });
            let grepOutput = '';
            grep.stdout.on('data', (piece) => {
                grepOutput += piece;
            });
            grep.on('close', () => {
                const x = +grepOutput;
                if (x > 0) {
                    console.log(chalk.green(`${this.word} esta en ${x} lineas del fichero`));
                }
                else {
                    console.log(chalk.red(`La palabra ${this.word} no se encuentra en el fichero`));
                }
            });
        }
        else {
            console.log(chalk.red('El fichero no existe'));
        }
    }
}
exports.GrepCommand = GrepCommand;
