"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgramCut = void 0;
const fs_1 = require("fs");
const child_process = require("child_process");
class ProgramCut {
    constructor(fileRute) {
        this.fileRute = fileRute;
    }
    watchFileProgram(campNumber) {
        (0, fs_1.watchFile)(this.fileRute, () => {
            child_process.exec(`cut -s -d ',' -f${campNumber} ${this.fileRute}`, (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    return;
                }
                const cutArrayOutput = stdout.split(`\n`);
                console.log(`stdout:\n${stdout}`);
                console.log(`En formato array quedaría: [${cutArrayOutput}]`);
            });
            //const cut = child_process.spawn('cut', [`-d ',' -f${campNumber} ${this.fileRute}`])
            //let cutOutPut = '';
            //cut.stdout.on('data', (piece) => cutOutPut += piece);
            //
            //cut.on('close', () => {
            //  const cutOutputAsArray = cutOutPut.split(`\n`);
            //  console.log(`En formato array: ${cutOutputAsArray}`);
            //});
        });
    }
}
exports.ProgramCut = ProgramCut;
