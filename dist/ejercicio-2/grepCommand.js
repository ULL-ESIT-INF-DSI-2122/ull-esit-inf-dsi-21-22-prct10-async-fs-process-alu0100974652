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
exports.GrepCommand = void 0;
const fs = __importStar(require("fs"));
const chalk = __importStar(require("chalk"));
const child_process_1 = require("child_process");
/**
 * clase GrepCommand con el comando grep y cat
 */
class GrepCommand {
    /**
     *
     * @param filename nombre del archivo
     * @param word palabra a encontrar
     */
    constructor(filename, word) {
        this.filename = filename;
        this.word = word;
    }
    /**
     * Método pipe con tuberia
     */
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
    /**
     * Método nopipe sin tubería
     */
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
