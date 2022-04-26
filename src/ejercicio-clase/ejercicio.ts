import {watchFile} from 'fs';
import * as fs from 'fs';
import {spawn} from 'child_process';
import * as child_process from 'child_process'
import { ProgramCut } from './programClass';

const fileRute = process.argv[2]
const campNumber = process.argv[3]

if(fs.existsSync(fileRute)) {
  const programCutPrincipal = new ProgramCut(fileRute)
  programCutPrincipal.watchFileProgram(campNumber)
} else {
  console.log('La ruta del archivo no existe')
}