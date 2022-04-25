"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const fs = require("fs");
const child_process = require("child_process");
const fileRute = process.argv[2];
const campNumber = process.argv[3];
if (fs.existsSync(fileRute)) {
    (0, fs_1.watchFile)(fileRute, (curr, prev) => {
        console.log(`File was ${prev.size} bytes before it was modified.`);
        console.log(`Now file is ${curr.size} bytes.`);
        child_process.exec(`cut -d ',' -f${campNumber} ${fileRute}`, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            const cutArrayOutput = stdout.split(/\s+/);
            console.log(`stdout: ${stdout}`);
            console.log(`En formato array quedaría: [${cutArrayOutput}]`);
        });
    });
}
else {
    console.log('La ruta del archivo no existe');
}
