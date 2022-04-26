"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const programClass_1 = require("./programClass");
const fileRute = process.argv[2];
const campNumber = process.argv[3];
if (fs.existsSync(fileRute)) {
    const programCutPrincipal = new programClass_1.ProgramCut(fileRute);
    programCutPrincipal.watchFileProgram(campNumber);
}
else {
    console.log('La ruta del archivo no existe');
}
